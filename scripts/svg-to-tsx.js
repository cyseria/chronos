/**
 * 对 svg 生成 tsx 文件
 */
const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const _ = require('lodash');
const svgr = require('@svgr/core').default;

function template(
    { template },
    opts,
    { imports, componentName, props, jsx, exports }
) {
    const typeScriptTpl = template.smart({ plugins: ['typescript'] });
    return typeScriptTpl.ast`
    import * as React from 'react'
    export const ${componentName} = (props: React.SVGProps<SVGSVGElement>): React.PropsWithoutRef<React.ReactSVGElement> => ${jsx}
  `;
}

const baseDir = path.resolve(__dirname, '../src');
const svgDir = path.join(baseDir, 'images/svg');
const distDir = path.join(baseDir, 'images/icon');
const iconSetList = glob.sync(path.join(svgDir, '*'));

const svgrOptions = {
    icon: true,
    plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
    svgProps: {
        fill: 'currentColor'
    },
    svgoConfig: {
        plugins: [
            {
                removeAttrs: {
                    attrs: ['fill']
                }
            }
        ]
    },
    prettierConfig: {
        semi: false,
        singleQuote: true
    },
    template
};

fs.ensureDirSync(distDir);
let indexContent = '';

iconSetList.forEach((iconSetPath, iconSetIndex) => {
    const iconSetName = path.basename(iconSetPath);
    const iconSetDistDir = path.join(distDir, iconSetName);
    const iconSetGroupImportContentList = [];

    let iconSetIndexContent = '';
    fs.ensureDirSync(iconSetDistDir);

    const groupSvgrOptions = {
        ...svgrOptions,
        svgProps: {},
        svgoConfig: {}
    };
    const svgPath = iconSetPath;

    const svgCode = fs.readFileSync(svgPath).toString();
    const iconName = path.basename(svgPath).replace('.svg', '');
    const tsxFileName = `${iconName}.tsx`;
    const iconCompName = `Svg${_.upperFirst(_.camelCase(iconName))}`;
    const iconCompFilePath = `./${iconName}`;

    const tsx = svgr.sync(svgCode, groupSvgrOptions, {
        componentName: iconCompName
    });

    fs.writeFileSync(path.join(iconSetDistDir, tsxFileName), tsx);

    iconSetIndexContent += `export * from '${iconCompFilePath}'\n`;

    iconSetGroupImportContentList.push(
        `import {${iconCompName}} from '${iconCompFilePath}'`
    );


    fs.writeFileSync(
        path.join(iconSetDistDir, 'index.ts'),
        iconSetIndexContent
    );
    indexContent += `export * from './${iconSetName}/index'\n`;
});
fs.writeFileSync(path.join(distDir, 'index.ts'), indexContent);

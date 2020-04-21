// // 先不用

// import React, { forwardRef, useCallback, useMemo } from 'react';
// import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
// import './index.scss';
// import { Editor, Transforms, Range, Point, createEditor, Node } from 'slate';
// import { withHistory } from 'slate-history';

// type SHORTCUTSMap = {
//     [key: string]: string;
// };
// const SHORTCUTS: SHORTCUTSMap = {
//     '*': 'list-item',
//     '-': 'list-item',
//     '+': 'list-item',
//     '>': 'block-quote',
//     '#': 'heading-one',
//     '##': 'heading-two',
//     '###': 'heading-three',
//     '####': 'heading-four',
//     '#####': 'heading-five',
//     '######': 'heading-six'
// };

// interface MarkdownShortcutsProps {
//     value: Node[]
//     onChange: (value: Node[]) => void
//     onRenderHtml: (html: JSX.Element) => void
// }
// const MarkdownShortcuts = (props: MarkdownShortcutsProps) => {
//     const renderElement = useCallback(prop => {
//         const ele = <Element {...prop} />;
//         props.onRenderHtml(ele)
//         return ele;
//     }, []);
//     const editor = useMemo(
//         () => withShortcuts(withReact(withHistory(createEditor()))),
//         []
//     );
//     return (
//         <Slate
//             className="time-editor-content"
//             editor={editor}
//             value={props.value}
//             onChange={value => props.onChange(value)}
//         >
//             <Editable
//                 renderElement={renderElement}
//                 placeholder="Write some markdown..."
//                 spellCheck
//                 autoFocus
//             />
//         </Slate>
//     );
// };

// const withShortcuts = (editor: ReactEditor) => {
//     const { deleteBackward, insertText } = editor;

//     editor.insertText = text => {
//         const { selection } = editor;

//         if (text === ' ' && selection && Range.isCollapsed(selection)) {
//             const { anchor } = selection;
//             const block = Editor.above(editor, {
//                 match: n => Editor.isBlock(editor, n)
//             });
//             const path = block ? block[1] : [];
//             const start = Editor.start(editor, path);
//             const range = { anchor, focus: start };
//             const beforeText = Editor.string(editor, range);
//             const type = SHORTCUTS[beforeText];

//             if (type) {
//                 Transforms.select(editor, range);
//                 Transforms.delete(editor);
//                 Transforms.setNodes(
//                     editor,
//                     { type },
//                     { match: n => Editor.isBlock(editor, n) }
//                 );

//                 if (type === 'list-item') {
//                     const list = { type: 'bulleted-list', children: [] };
//                     Transforms.wrapNodes(editor, list, {
//                         match: n => n.type === 'list-item'
//                     });
//                 }

//                 return;
//             }
//         }

//         insertText(text);
//     };

//     editor.deleteBackward = (...args) => {
//         const { selection } = editor;

//         if (selection && Range.isCollapsed(selection)) {
//             const match = Editor.above(editor, {
//                 match: n => Editor.isBlock(editor, n)
//             });

//             if (match) {
//                 const [block, path] = match;
//                 const start = Editor.start(editor, path);

//                 if (
//                     block.type !== 'paragraph' &&
//                     Point.equals(selection.anchor, start)
//                 ) {
//                     Transforms.setNodes(editor, { type: 'paragraph' });

//                     if (block.type === 'list-item') {
//                         Transforms.unwrapNodes(editor, {
//                             match: n => n.type === 'bulleted-list',
//                             split: true
//                         });
//                     }

//                     return;
//                 }
//             }

//             deleteBackward(...args);
//         }
//     };

//     return editor;
// };

// export const Element = (props: any) => {
//     const { attributes, children, element } = props;
//     switch (element.type) {
//         case 'block-quote':
//             return <blockquote {...attributes}>{children}</blockquote>;
//         case 'bulleted-list':
//             return <ul {...attributes}>{children}</ul>;
//         case 'heading-one':
//             return <h1 {...attributes}>{children}</h1>;
//         case 'heading-two':
//             return <h2 {...attributes}>{children}</h2>;
//         case 'heading-three':
//             return <h3 {...attributes}>{children}</h3>;
//         case 'heading-four':
//             return <h4 {...attributes}>{children}</h4>;
//         case 'heading-five':
//             return <h5 {...attributes}>{children}</h5>;
//         case 'heading-six':
//             return <h6 {...attributes}>{children}</h6>;
//         case 'list-item':
//             return <li {...attributes}>{children}</li>;
//         default:
//             return <p {...attributes}>{children}</p>;
//     }
// };

// const initialValue = [
//     {
//         type: 'paragraph',
//         children: [
//             {
//                 text: ''
//             }
//         ]
//     }
// ];

// export default MarkdownShortcuts;

import * as React from 'react';
import './index.scss';
import { Icon } from '@befe/brick-hi';
import { SvgWaixingren } from '../../images/icon';
interface ProgressProps {
    /**
     * 标题
     */
    title: string;
    /**
     * 起点文字
     */
    beginText: string;
    /**
     * 终点文字
     */
    endText: string;
    /**
     * 提示文字
     */
    notes: string;
    /**
     * 当前进度
     */
    progress: string;
}

export const Progress: React.FC<ProgressProps> = props => {
    return (
        <div className="progress">
            <h3 className="progress-title">
                <span>{props.title}</span>
                <span>{props.progress}%</span>
            </h3>
            <div className="progress-content">
                <span className="progress-begin-text">{props.beginText}</span>
                <div className="progress-line">
                    <div
                        className="progress-line-content"
                        style={{ width: props.progress + '%' }}
                    >
                        <div className="progress-current">
                            <div className="tool-tips">{props.notes}</div>
                            <Icon svg={SvgWaixingren} className="person-icon" />
                        </div>
                        <div className="progress-line-range" />
                    </div>
                </div>
                <span className="progress-end-text">{props.endText}</span>
            </div>
        </div>
    );
};

import * as React from 'react';
import './index.scss';
import { Icon } from '@befe/brick-hi';
import { SvgWaixingren } from '../../images/icon';
interface ProgressProps {
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
    isDefaultTiming?: boolean;
}

export const Progress: React.FC<ProgressProps> = props => {
    return (
        <div className="progress">
            <h3 className="progress-percents">
                <span className="progress-percents-1">{props.progress}%</span>
                <span className="progress-percents-2">{props.progress}%</span>
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
            {props.isDefaultTiming ? <div className="progress-tips">时光流逝中，找点事开始做吧...</div>: ''}
        </div>
    );
};

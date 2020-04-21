/**
 * @file
 * @date 2020/03/25
 * @author cyseria
 */

import * as React from 'react';
import './index.scss';
import dayjs from 'dayjs';
import {useLocalStore, Observer} from 'mobx-react-lite';

export interface TimeItem extends React.HTMLAttributes<HTMLDivElement> {
    beginTime: Date;
    endTime: Date;
    content: string | React.ReactNode;
    tags: string[];
    /**
     * 是否展示开始时间，当上一个结束时间跟开始时间相同的时候，则不展示
     */
    showStartTime?: boolean;
}

interface TimelineProps {
    items: TimeItem[];
}

const TimelineItem: React.FC<TimeItem> = (props: TimeItem) => {
    
    return (
        <li className="timeline-item" style={props.style}>
            <div className="time">
                <span className="time-begin">
                    {props.showStartTime
                        ? dayjs(props.beginTime).format('HH:mm')
                        : ''}
                </span>
                <span className="time-end">
                    {dayjs(props.endTime).format('HH:mm')}
                </span>
            </div>
            <span className="line"></span>
            <div className="content">
                {props.content}
                <div>
                    {props.tags.map((tag, index) => {
                        return (
                            <span className="tag" key={index}>
                                {tag}
                            </span>
                        );
                    })}
                </div>
            </div>
        </li>
    );
};

const getMarginTop = (prev: Date, curr: Date) => {
    if (!prev || !curr) {
        return 10;
    }
    const MAX_MARGIN = 80;
    const beginTime = dayjs(curr);
    const diffMs = beginTime.diff(dayjs(prev)) / 1000 / 60;
    if (diffMs > MAX_MARGIN) {
        return MAX_MARGIN;
    }
    return diffMs;
};
const getMinHeight = (start: Date, end: Date) => {
    const diffMs = dayjs(end).diff(dayjs(start));
    return diffMs / 1000 / 60;
};
const Timeline: React.FunctionComponent<TimelineProps> = props => {
    let prevEndTime: Date;

    return (
        <ul className="timeline">
            {/* <TimeRuler /> */}
            {props.items.map((item, index) => {
                const marginTop = getMarginTop(prevEndTime, item.beginTime);
                const minHeight = getMinHeight(item.beginTime, item.endTime);
                prevEndTime = item.endTime;

                return (
                    <TimelineItem
                        {...item}
                        style={{
                            marginTop,
                            minHeight,
                        }}
                        showStartTime={marginTop !== 0}
                        key={index}
                    />
                );
            })}
        </ul>
    );
};

export default Timeline;

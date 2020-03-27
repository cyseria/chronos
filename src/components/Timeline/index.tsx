/**
 * @file
 * @date 2020/03/25
 * @author cyseria
 */

import * as React from 'react';
import './index.scss';

interface TimeItem {
    beginTime: string;
    endTime: string;
    content: string | React.ReactNode;
    tags: string[];
}

interface TimelineProps {
    items: TimeItem[]
}

const mockItem =  {
    beginTime: '09:43',
    endTime: '10:20',
    content: (<>
        <div className="title">comment #01</div>
    <div className="info">
        the best animation , the best toturials you would ever see .
    </div>
    <div className="name">- dr. mohamed -</div>
    </>),
    tags: ['aaaa', 'bbb']
}
const mockData = [
    {
        beginTime: '10:10',
        endTime: '10:30',
        content: 'CR - captcha 和  validation code 的区别',
        tags: ['CR']
    },
    {
        beginTime: '10:30',
        endTime: '11:05',
        content: '小程序交互方案review&梳理',
        tags: []
    },
    {
        beginTime: '11:05',
        endTime: '11:18',
        content: 'HITV 联动站会',
        tags: []
    },
    {
        beginTime: '12:30',
        endTime: '13:00',
        content: '讨论 jsbridge 的模式，前端工具面板',
        tags: []
    },
    {
        beginTime: '13:00',
        endTime: '14:14',
        content: '小程序交互',
        tags: []
    },
    {
        beginTime: '15:50',
        endTime: '16:38',
        content: 'Tabs 开发  - props 关键词 key 问题，children ts 书写方式',
        tags: []
    },
    {
        beginTime: '16:38',
        endTime: '17:00',
        content: '企业平台延期问题讨论',
        tags: []
    },
    {
        beginTime: '19:00',
        endTime: '19:46',
        content: 'hitv 联动视觉还原',
        tags: []
    }
];

const TimelineItem: React.FC<TimeItem> = (props: TimeItem) => {
    return (
        <li className="timeline-item">
             <div className="time">
                <span className="time-begin">
                    {props.beginTime}
                </span>
                <span className="time-end">{props.endTime}</span>
            </div>
            <span className="line"></span>
            <div className="content">
                {props.content}
                <div>
                    {props.tags.map(tag => {
                        return <span className="tag">{tag}</span>
                    })}
                </div>
            </div>
        </li>
    );
};
const Timeline: React.FunctionComponent<TimelineProps> = props => {
    return <ul className="timeline">
        {/* {} */}
        <TimelineItem {...mockItem}/>
        <TimelineItem {...mockItem}/>
    </ul>;
};

export default Timeline;

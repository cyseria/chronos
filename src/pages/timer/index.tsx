import * as React from 'react';
import { Progress } from '../../components/Progress';
import Timeline from '../../components/Timeline';

interface TimerProps {}

const getMockDate = (hour: number, min: number) => {
    return new Date(2020, 3, 29, hour, min);
};
const mockData = [
    {
        beginTime: getMockDate(10, 10),
        endTime: getMockDate(10, 30),
        content: 'CR - captcha 和  validation code 的区别',
        tags: ['CR']
    },
    {
        beginTime: getMockDate(10, 30),
        endTime: getMockDate(11, 5),
        content: '小程序交互方案review&梳理',
        tags: []
    },
    {
        beginTime: getMockDate(11, 5),
        endTime: getMockDate(11, 18),
        content: 'HITV 联动站会',
        tags: []
    },
    {
        beginTime: getMockDate(12, 30),
        endTime: getMockDate(13, 0),
        content: '讨论 jsbridge 的模式，前端工具面板',
        tags: []
    },
    {
        beginTime: getMockDate(13, 0),
        endTime: getMockDate(14, 14),
        content: '小程序交互',
        tags: []
    },
    {
        beginTime: getMockDate(15, 50),
        endTime: getMockDate(16, 38),
        content: 'Tabs 开发  - props 关键词 key 问题，children ts 书写方式',
        tags: []
    },
    {
        beginTime: getMockDate(16, 38),
        endTime: getMockDate(17, 0),
        content: '企业平台延期问题讨论',
        tags: []
    },
    {
        beginTime: getMockDate(19, 0),
        endTime: getMockDate(19, 46),
        content: 'hitv 联动视觉还原',
        tags: []
    }
];

export const Timer: React.FC<TimerProps> = (props: TimerProps) => {
    return (
        <div>
            <Progress
                title="2020-03-19"
                beginText="00:00"
                endText="24:00"
                notes="13:34:24"
                progress={50}
            />
            <Timeline items={mockData} />
            {/* <textarea /> */}
        </div>
    );
};

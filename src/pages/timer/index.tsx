import * as React from 'react';
import { Progress } from '../../components/Progress';
import Timeline from '../../components/Timeline';
import './index.scss';
import { Button } from '@befe/brick-hi';
import { useInterval } from '../../utils/time';
import dayjs from 'dayjs';
import { mockData } from './mock';

interface TimerProps {}

/**
 * 根据过的秒格式化时间
 */
const formatTime = (sec: number, type: string = 'h:m:s') => {
    const hour = Math.floor(sec / 3600);
    const mins = Math.floor(sec / 60) % 60;
    const second = sec % 60;
    const format = (num: number) => {
        if (num < 10) {
            return '0' + num;
        }
        return String(num);
    };
    const result = type
        .replace('h', () => format(hour))
        .replace('m', () => format(mins))
        .replace('s', () => format(second));
    return result;
};

const praseDateToSeconds = (date: Date) => {
    return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
};

const defaultBeginTime = 0;
const defaultEndTime = 24 * 60 * 60; // 默认一天时间的秒数

export const Timer: React.FC<TimerProps> = (props: TimerProps) => {
    // 计算当前过了多少秒
    const [second, setSecond] = React.useState(0);
    const [totalTime, setTotalTime] = React.useState(defaultEndTime);

    useInterval(() => {
        if (totalTime === defaultEndTime) {
            setSecond(praseDateToSeconds(new Date()));
        } else {
            setSecond(second + 1);
        }
        if (second === totalTime) {
            // 完成了一个时间，可以重新开始
            setSecond(praseDateToSeconds(new Date()));
            setTotalTime(defaultEndTime)
        }
    }, 1000);

    const totalHour = Math.floor(totalTime / 3600);
    const curTime =
        totalHour === 0 ? formatTime(second, 'm:s') : formatTime(second);

    const today = dayjs().format('YYYY-MM-DD');

    const progress = ((second / totalTime) * 100).toFixed(1);

    const handleResetTime = (time: number) => {
        setTotalTime(time);
        setSecond(0);
    };
    return (
        <div>
            <div className="countdown">
            <Button
                    type="important"
                    onClick={() => {
                        handleResetTime(1 * 60);
                    }}
                >
                    1
                </Button>
            <Button
                    type="important"
                    onClick={() => {
                        handleResetTime(5 * 60);
                    }}
                >
                    5
                </Button>
                <Button
                    type="important"
                    onClick={() => {
                        handleResetTime(15 * 60);
                    }}
                >
                    15
                </Button>
                <Button
                    type="important"
                    onClick={() => {
                        handleResetTime(30 * 60);
                    }}
                >
                    30
                </Button>
                <Button
                    type="important"
                    onClick={() => {
                        handleResetTime(45 * 60);
                    }}
                >
                    45
                </Button>
                <Button
                    type="important"
                    onClick={() => {
                        handleResetTime(60 * 60);
                    }}
                >
                    60
                </Button>
            </div>
            <Progress
                title={today}
                beginText={formatTime(defaultBeginTime, 'h:m')}
                endText={formatTime(totalTime, 'h:m')}
                notes={curTime}
                progress={progress}
            />
            <Timeline items={mockData} />
            {/* <textarea /> */}
        </div>
    );
};

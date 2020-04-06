import * as React from 'react';
import {Progress} from '../../components/Progress';
import Timeline from '../../components/Timeline';
import './index.scss';
import {
    Button,
    InputNumber,
    Icon,
} from '@befe/brick-hi';
import {useInterval} from '../../utils/time';
import dayjs from 'dayjs';
import {mockData} from './mock';
import Editor from '../../components/Editor';
import {
    SvgScaleUp,
    SvgHiFace,
} from '@befe/brick-icon';
import {SvgTaiyang} from '../../images/icon';
import {useLocalStore} from 'mobx-react-lite';
import {
    chronosAppState,
    ChronosAppState,
} from '../../state/singleton-chronos-app-state';

interface TimerProps {
}

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

const parseDateToSecond = (date: Date) => {
    return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
};

const defaultBeginTime = 0;
const defaultEndTime = 24 * 60 * 60; // 默认一天时间的秒数

export const Timer: React.FC<TimerProps> = (props: TimerProps) => {
    // 计算当前过了多少秒
    const [second, setSecond] = React.useState(0);
    const [totalTime, setTotalTime] = React.useState(defaultEndTime);

    const isDefaultTiming = (time: number) => time === defaultEndTime;

    useInterval(() => {
        if (isDefaultTiming(totalTime)) {
            setSecond(parseDateToSecond(new Date()));
        } else {
            setSecond(second + 1);
        }
        if (second === totalTime) {
            // 完成了一个时间，可以重新开始
            setSecond(parseDateToSecond(new Date()));
            setTotalTime(defaultEndTime);
        }
    }, 1000);

    const totalHour = Math.floor(totalTime / 3600);
    const curTime =
        totalHour === 0 ? formatTime(second, 'm:s') : formatTime(second);

    const progress = ((second / totalTime) * 100).toFixed(1);

    const handleResetTime = (time: number) => {
        setTotalTime(time);
        setSecond(0);
    };

    const InitButton = (props: { num: number }) => {
        // @todo:demo
        const app = useLocalStore<ChronosAppState>(
            () => chronosAppState,
        );

        const local = useLocalStore(
            source => {
                return {
                    add() {
                        app.total += source.num;
                    },
                };
            },
            props,
        );

        return (
            <Button
                size="xs"
                onClick={() => {
                    handleResetTime(props.num * 60);
                    local.add();
                }}
            >
                {props.num}
            </Button>
        );
    };
    return (
        <>
            <header className="time-header">
            <h1>
                <Icon svg={SvgTaiyang}/>
                {dayjs().format('YYYY-MM-DD')}
            </h1>
            <div className="countdown">
                <InitButton num={5}/>
                <InitButton num={15}/>
                <InitButton num={30}/>
                <InitButton num={45}/>
                <InitButton num={60}/>
                    <Button size="xs" icon={SvgHiFace}>
                        自定义
                    </Button>
                </div>
            </header>

            <Progress
                isDefaultTiming={isDefaultTiming(totalTime)}
                beginText={formatTime(defaultBeginTime, 'h:m')}
                endText={formatTime(totalTime, 'h:m')}
                notes={curTime}
                progress={progress}
            />
            <div className="timeline-wrap">
                <Timeline items={mockData}/>
            </div>

            <div className="editor">
                <Icon className="editor-scale-icon" svg={SvgScaleUp}/>
                <Editor/>
            </div>
            <div className="time-footer">
                <Button type="important">提交</Button>
            </div>
        </>
    );
};

import * as React from 'react';
import './index.scss';
import { Button, InputNumber, Icon, } from '@befe/brick-hi';
import dayjs from 'dayjs';
import { SvgHiFace } from '@befe/brick-icon';
import { SvgTaiyang } from '../../images/icon';


import { useLocalStore } from 'mobx-react-lite';
import { TimerStore, timerStore } from '../../store/timer';

interface TimerHeaderProps {

}
export const TimerHeader = (props: TimerHeaderProps) => {
    const store = useLocalStore<TimerStore>(() => timerStore);

    const handleResetTime = (time: number) => {
        store.resetTime(time);
    };
    const handleCustom = () => {

    }
    const InitButton = (props: { num: number }) => {
        return (
            <Button
                size="xs"
                onClick={() => {
                    handleResetTime(props.num * 60);
                }}
            >
                {props.num}
            </Button>
        );
    };

    return <header className="time-header">
        <h1>
            <Icon svg={SvgTaiyang} />
            {dayjs().format('YYYY-MM-DD')}
        </h1>
        <div className="countdown">
            <InitButton num={5} />
            <InitButton num={15} />
            <InitButton num={30} />
            <InitButton num={45} />
            <InitButton num={60} />
            <Button size="xs" icon={SvgHiFace} onClick={handleCustom}>
                自定义
        </Button>
        </div>
    </header>
}
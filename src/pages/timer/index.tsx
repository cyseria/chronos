import * as React from 'react';
import { Progress } from '../../components/Progress';
import Timeline, { TimeItem } from '../../components/Timeline';
import './index.scss';
import { Button, Icon, Textarea } from '@befe/brick-hi';
import { useInterval } from '../../utils/time';
import { mockData } from './mock';
import { SvgScaleUp, SvgHiFace } from '@befe/brick-icon';

import { useLocalStore, useObserver } from 'mobx-react-lite';
import { formatTime, isDefaultTiming } from '../utils';
import { timerStore, TimerStore } from '../../store/timer';
import { TimerHeader } from './Header';

const { dialog } = require('electron').remote;

interface TimerProps { }


const defaultBeginTime = 0;

export const Timer: React.FC<TimerProps> = (props: TimerProps) => {
    const store = useLocalStore<TimerStore>(() => timerStore);

    const [list, setList] = React.useState<TimeItem[]>(mockData);

    const [editorValue, setEditorValue] = React.useState('');



    useInterval(() => {

        store.update()
    }, 1000);



    const handleResetTime = (total: number) => {
        store.resetTime(total);
    };


    const handleFinished = () => {
        const options = {
            buttons: ['是', '否'],
            message: '倒计时已结束，是否要开启下一个计时？'
        };
        const response = dialog.showMessageBox(options);
    };

    const handleCancel = () => { };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditorValue(e.target.value);
    };
    const handleSubmit = () => {
        list.push({
            beginTime: new Date(),
            endTime: new Date(),
            content: editorValue,
            tags: []
        });
        setList(list);
    };

    return useObserver(() => (
        <>
            <TimerHeader />
            <Progress
                onCancel={handleCancel}
                isDefaultTiming={isDefaultTiming(store.totalTime)}
                beginText={formatTime(defaultBeginTime, 'h:m')}
                endText={formatTime(store.totalTime, 'h:m')}
                notes={store.curPassedTime}
                progress={store.progress}
            />
            <div className="timeline-wrap">
                <Timeline items={list} />
            </div>

            <div className="editor">
                <Icon className="editor-scale-icon" svg={SvgScaleUp} />
                <Textarea value={editorValue} onChange={handleTextareaChange} />
            </div>
            <div className="time-footer">
                <Button type="important" onClick={handleSubmit}>
                    提交
                </Button>
            </div>
        </>
    ));
};

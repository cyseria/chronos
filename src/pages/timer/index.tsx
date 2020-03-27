import * as React from 'react';
import { Progress } from '../../components/Progress';
import Timeline from '../../components/Timeline';

interface TimerProps {

};

export const Timer: React.FC<TimerProps> = (props: TimerProps) => {
    return <div>
        <Progress title="2020-03-19" beginText="00:00" endText="24:00" notes="13:34:24" progress={50}/>
        <Timeline />
        {/* <textarea /> */}
    </div>
}

/**
 * @file
 * @author
 * @date
 */

import * as React from 'react';

interface TimeRulerProps {}

const TimeRuler: React.FC<TimeRulerProps> = props => {
    const start = 8;
    const end = 24;
    const arr = [];
    for (let i = start; i < end; i++) {
        arr.push(i)
    };
    const renderItem = (time: number) => {
        return (
            <div className="time-ruler-item">
                <div >{time}:00</div>
                <div className="ruler-line line1" />
                <div className="ruler-line line2" />
                <div className="ruler-line line3" />
            </div>
        );
    };
    return (
        <div className="time-ruler">
            {
                arr.map((time, index) => {
                    return index < end ? renderItem(time): time + ':00';
                })
            }

            {/* <div>01:00</div> */}
        </div>
    );
};

export { TimeRuler };

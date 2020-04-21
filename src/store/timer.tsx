import { observable, action, toJS, computed } from 'mobx';
import { formatTime, parseDateToSecond } from '../pages/utils';

const defaultBeginTime = 0;
const defaultEndTime = 24 * 60 * 60; // 默认一天时间的秒数

export class TimerStore {
    // 过了多少秒
    @observable passedSecond = 0;

    // 总共倒计时时间
    @observable totalTime = defaultEndTime;

    @computed
    get progress() {
        return ((this.passedSecond / this.totalTime) * 100).toFixed(1);
    }
    @computed
    get curPassedTime() {
        const totalHour = Math.floor(this.totalTime / 3600);

        const curPassedTime = totalHour === 0 ? formatTime(this.passedSecond, 'm:s') : formatTime(this.passedSecond);
        console.log(curPassedTime)
        return curPassedTime;
    }

    @action
    updateTotalTime(num: number) {
        this.totalTime = num;
    }

    @action
    resetTime(total: number) {
        this.passedSecond = 0;
        this.totalTime = total;
    }

    @action update() {
        // 是否为没有开始倒计时的面板
        const isDefaultTiming = (time: number) => time === defaultEndTime;

        if (isDefaultTiming(this.totalTime)) {
            this.passedSecond = parseDateToSecond(new Date());
        } else {
            this.passedSecond = this.passedSecond + 1;
        }

        if (this.passedSecond === this.totalTime) {
            // 完成了一个时间，可以重新开始
            this.passedSecond = parseDateToSecond(new Date());
            this.totalTime = defaultEndTime;
        }
    }
}

export const timerStore = new TimerStore();

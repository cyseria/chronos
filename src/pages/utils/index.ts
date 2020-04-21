

const defaultBeginTime = 0;
const defaultEndTime = 24 * 60 * 60; // 默认一天时间的秒数

export  const isDefaultTiming = (time: number) => time === defaultEndTime;

/**
 * 根据过的秒格式化时间
 */
export const formatTime = (sec: number, type: string = 'h:m:s') => {
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

export const parseDateToSecond = (date: Date) => {
    return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
};
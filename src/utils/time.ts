/**
 * @file
 * @author chenmanqing
 * @date 2020/03/29
 */

import React, { useState, useEffect, useRef } from 'react';

type CB = () => void;
export function useInterval(callback: CB, delay: number) {
    const ref = useRef<CB>();

    // 保存新回调
    useEffect(() => {
        ref.current = callback;
    });

    // 建立 interval
    useEffect(() => {
        function cb() {
            ref.current && ref.current();
        }
        if (delay !== null) {
            let timer = setInterval(cb, delay);
            return () => clearInterval(timer);
        }
    }, [delay]);
}

// import { useState, useCallback } from 'react';

export default function useInitialWindowSize({ margin }: { margin?: number }) {
    let m = margin || 0;

    // Fall back to the classic 1248x960 screen when the viewport reports 0
    // (e.g. embedded/hidden frames measuring before layout)
    const winW = window.innerWidth || 1248;
    const winH = window.innerHeight || 960;

    let initWidth = Math.max(winW - m, 520);
    let initHeight = Math.max(winH - m, 400);

    return { initWidth, initHeight };
}

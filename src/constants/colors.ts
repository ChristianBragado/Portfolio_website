const colors = {
    white: '#FFFFFF',
    black: '#000000',
    // System 7 palette
    desktop: '#7f7f7f', // 50% gray desktop
    titleInactive: '#999999', // inactive title text
    scrollThumb: '#9999cc', // 7.5 lavender scrollbar thumb
    menuHighlight: '#000000', // menu selection (black, white text)
    selectBlue: '#333399', // icon/text selection accent
    // legacy keys (remapped so untouched call sites go Mac automatically)
    turquoise: '#7f7f7f', // old desktop teal -> System 7 gray
    lightGray: '#dddddd',
    darkGray: '#888888',
    blue: '#333399',
    darkBlue: '#000000',
    red: '#ff0000',
} as const;

export type ColorName = keyof typeof colors;
export type ThemeColor = typeof colors[ColorName];

export default colors;

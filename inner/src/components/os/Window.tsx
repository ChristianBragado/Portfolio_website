import React, { useEffect, useRef, useState } from 'react';
import { IconName } from '../../assets/icons';
import Colors from '../../constants/colors';
import EMBED_INSET from '../../constants/layout';
import DragIndicator from './DragIndicator';
import ResizeIndicator from './ResizeIndicator';

export interface WindowProps {
    closeWindow: () => void;
    minimizeWindow: () => void;
    onInteract: () => void;
    width: number;
    height: number;
    top: number;
    left: number;
    windowTitle?: string;
    bottomLeftText?: string;
    rainbow?: boolean;
    windowBarColor?: string;
    windowBarIcon?: IconName;
    onWidthChange?: (width: number) => void;
    onHeightChange?: (height: number) => void;
}

const Window: React.FC<WindowProps> = (props) => {
    const windowRef = useRef<any>(null);
    const dragRef = useRef<any>(null);
    const contentRef = useRef<any>(null);

    const dragProps = useRef<{
        dragStartX: any;
        dragStartY: any;
    }>();

    const resizeRef = useRef<any>(null);

    const [top, setTop] = useState(props.top);
    const [left, setLeft] = useState(props.left);

    const lastClickInside = useRef(false);

    const [width, setWidth] = useState(props.width);
    const [height, setHeight] = useState(props.height);

    const [contentWidth, setContentWidth] = useState(props.width);
    const [contentHeight, setContentHeight] = useState(props.height);

    const [windowActive, setWindowActive] = useState(true);

    const [isMaximized, setIsMaximized] = useState(false);
    const [preMaxSize, setPreMaxSize] = useState({
        width,
        height,
        top,
        left,
    });

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);

    const startResize = (event: any) => {
        event.preventDefault();
        setIsResizing(true);
        window.addEventListener('mousemove', onResize, false);
        window.addEventListener('mouseup', stopResize, false);
    };

    const onResize = ({ clientX, clientY }: any) => {
        const curWidth = clientX - left;
        const curHeight = clientY - top;
        if (curWidth > 520) resizeRef.current.style.width = `${curWidth}px`;
        if (curHeight > 220) resizeRef.current.style.height = `${curHeight}px`;
        resizeRef.current.style.opacity = 1;
    };

    const stopResize = () => {
        setIsResizing(false);
        setWidth(resizeRef.current.style.width);
        setHeight(resizeRef.current.style.height);
        resizeRef.current.style.opacity = 0;
        window.removeEventListener('mousemove', onResize, false);
        window.removeEventListener('mouseup', stopResize, false);
    };

    const startDrag = (event: any) => {
        const { clientX, clientY } = event;
        setIsDragging(true);
        event.preventDefault();
        dragProps.current = {
            dragStartX: clientX,
            dragStartY: clientY,
        };
        window.addEventListener('mousemove', onDrag, false);
        window.addEventListener('mouseup', stopDrag, false);
    };

    const onDrag = ({ clientX, clientY }: any) => {
        let { x, y } = getXYFromDragProps(clientX, clientY);
        dragRef.current.style.transform = `translate(${x}px, ${y}px)`;
        dragRef.current.style.opacity = 1;
    };

    const stopDrag = ({ clientX, clientY }: any) => {
        setIsDragging(false);
        // dragRef.current.style.opacity = 0;
        const { x, y } = getXYFromDragProps(clientX, clientY);
        setTop(y);
        setLeft(x);
        window.removeEventListener('mousemove', onDrag, false);
        window.removeEventListener('mouseup', stopDrag, false);
    };

    const getXYFromDragProps = (
        clientX: number,
        clientY: number
    ): { x: number; y: number } => {
        if (!dragProps.current) return { x: 0, y: 0 };
        const { dragStartX, dragStartY } = dragProps.current;

        const x = clientX - dragStartX + left;
        const y = clientY - dragStartY + top;

        return { x, y };
    };

    useEffect(() => {
        dragRef.current.style.transform = `translate(${left}px, ${top}px)`;
    });

    useEffect(() => {
        props.onWidthChange && props.onWidthChange(contentWidth);
    }, [props.onWidthChange, contentWidth]); // eslint-disable-line

    useEffect(() => {
        props.onHeightChange && props.onHeightChange(contentHeight);
    }, [props.onHeightChange, contentHeight]); // eslint-disable-line

    useEffect(() => {
        setContentWidth(contentRef.current.getBoundingClientRect().width);
    }, [width]);

    useEffect(() => {
        setContentHeight(contentRef.current.getBoundingClientRect().height);
    }, [height]);

    const maximize = () => {
        if (isMaximized) {
            setWidth(preMaxSize.width);
            setHeight(preMaxSize.height);
            setTop(preMaxSize.top);
            setLeft(preMaxSize.left);
            setIsMaximized(false);
        } else {
            setPreMaxSize({
                width,
                height,
                top,
                left,
            });
            setWidth(window.innerWidth);
            // 20 = System 7 menu bar height at the top of the screen
            setHeight(
                window.innerHeight - 20 - EMBED_INSET.top - EMBED_INSET.bottom
            );
            setTop(20 + EMBED_INSET.top);
            setLeft(0);
            setIsMaximized(true);
        }
    };

    const onCheckClick = () => {
        if (lastClickInside.current) {
            setWindowActive(true);
        } else {
            setWindowActive(false);
        }
        lastClickInside.current = false;
    };

    useEffect(() => {
        window.addEventListener('mousedown', onCheckClick, false);
        return () => {
            window.removeEventListener('mousedown', onCheckClick, false);
        };
    }, []);

    const onWindowInteract = () => {
        props.onInteract();
        setWindowActive(true);
        lastClickInside.current = true;
    };

    return (
        <div onMouseDown={onWindowInteract} style={styles.container}>
            <div
                style={Object.assign({}, styles.window, {
                    width,
                    height,
                    top,
                    left,
                })}
                ref={windowRef}
            >
                <div style={styles.dragHitbox} onMouseDown={startDrag}></div>
                <div
                    className={props.rainbow ? 'rainbow-wrapper' : ''}
                    style={styles.titleBar}
                >
                    {windowActive && <div style={styles.titleStripes} />}
                    {windowActive && (
                        <div
                            style={styles.closeBox}
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={props.closeWindow}
                        />
                    )}
                    <p
                        className="showcase-header"
                        style={Object.assign(
                            {},
                            styles.titleText,
                            !windowActive && { color: Colors.titleInactive }
                        )}
                    >
                        {props.windowTitle}
                    </p>
                    {windowActive && (
                        <div style={styles.titleRightBoxes}>
                            <div
                                style={styles.zoomBox}
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={maximize}
                            >
                                <div style={styles.zoomBoxInner} />
                            </div>
                            <div
                                style={styles.collapseBox}
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={props.minimizeWindow}
                            >
                                <div style={styles.collapseLine} />
                            </div>
                        </div>
                    )}
                </div>
                <div style={styles.content} ref={contentRef}>
                    {props.children}
                </div>
                {props.bottomLeftText && (
                    <div style={styles.statusBar}>
                        <p style={styles.statusText}>{props.bottomLeftText}</p>
                    </div>
                )}
                <div
                    onMouseDown={startResize}
                    style={styles.resizeHitbox}
                ></div>
                <div style={styles.growBox}>
                    <div style={styles.growSquareBack} />
                    <div style={styles.growSquareFront} />
                </div>
            </div>

            <div
                style={
                    !isResizing
                        ? {
                              zIndex: -10000,
                              pointerEvents: 'none',
                          }
                        : {
                              zIndex: 1000,
                              cursor: 'nwse-resize',
                              mixBlendMode: 'difference',
                          }
                }
            >
                <ResizeIndicator
                    top={top}
                    left={left}
                    width={width}
                    height={height}
                    resizeRef={resizeRef}
                />
            </div>
            <div
                style={
                    !isDragging
                        ? {
                              zIndex: -10000,
                              pointerEvents: 'none',
                          }
                        : {
                              zIndex: 1000,
                              cursor: 'move',
                              mixBlendMode: 'difference',
                          }
                }
            >
                <DragIndicator
                    width={width}
                    height={height}
                    dragRef={dragRef}
                />
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    window: {
        backgroundColor: Colors.white,
        position: 'absolute',
        border: `1px solid ${Colors.black}`,
        boxShadow: `1px 1px 0 ${Colors.black}`,
        flexDirection: 'column',
        boxSizing: 'border-box',
    },
    dragHitbox: {
        position: 'absolute',
        left: 26,
        width: 'calc(100% - 78px)',
        height: 22,
        zIndex: 10000,
        top: -2,
        cursor: 'move',
    },
    resizeHitbox: {
        position: 'absolute',
        width: 44,
        height: 44,
        bottom: -14,
        right: -14,
        cursor: 'nwse-resize',
    },
    // System 7 title bar: white, 19px, horizontal pinstripes when active
    titleBar: {
        position: 'relative',
        width: '100%',
        height: 19,
        flexShrink: 0,
        backgroundColor: Colors.white,
        borderBottom: `1px solid ${Colors.black}`,
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
    },
    titleStripes: {
        position: 'absolute',
        top: 3,
        bottom: 3,
        left: 2,
        right: 2,
        backgroundImage: `repeating-linear-gradient(
            to bottom,
            ${Colors.black} 0px,
            ${Colors.black} 1px,
            transparent 1px,
            transparent 3px
        )`,
    },
    titleText: {
        position: 'relative',
        backgroundColor: Colors.white,
        paddingLeft: 8,
        paddingRight: 8,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: 'calc(100% - 96px)',
    },
    closeBox: {
        position: 'absolute',
        left: 9,
        top: 3,
        width: 11,
        height: 11,
        backgroundColor: Colors.white,
        border: `1px solid ${Colors.black}`,
        boxShadow: `0 0 0 2px ${Colors.white}`,
        cursor: 'pointer',
        zIndex: 10001,
    },
    titleRightBoxes: {
        position: 'absolute',
        right: 9,
        top: 3,
        flexDirection: 'row-reverse',
        zIndex: 10001,
    },
    zoomBox: {
        width: 11,
        height: 11,
        backgroundColor: Colors.white,
        border: `1px solid ${Colors.black}`,
        boxShadow: `0 0 0 2px ${Colors.white}`,
        cursor: 'pointer',
        position: 'relative',
    },
    zoomBoxInner: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 6,
        height: 6,
        borderRight: `1px solid ${Colors.black}`,
        borderBottom: `1px solid ${Colors.black}`,
    },
    collapseBox: {
        width: 11,
        height: 11,
        backgroundColor: Colors.white,
        border: `1px solid ${Colors.black}`,
        boxShadow: `0 0 0 2px ${Colors.white}`,
        cursor: 'pointer',
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    collapseLine: {
        width: 11,
        height: 1,
        backgroundColor: Colors.black,
    },
    content: {
        flex: 1,
        minWidth: 0,
        position: 'relative',
        overflowX: 'hidden',
        backgroundColor: Colors.white,
    },
    statusBar: {
        flexShrink: 0,
        width: '100%',
        height: 17,
        borderTop: `1px solid ${Colors.black}`,
        backgroundColor: Colors.white,
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    statusText: {
        fontSize: 11,
        marginLeft: 6,
        fontFamily: 'MSSerif',
        color: '#333333',
    },
    // System 7 grow box (two overlapping squares, bottom-right)
    growBox: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 15,
        height: 15,
        backgroundColor: Colors.white,
        borderLeft: `1px solid ${Colors.black}`,
        borderTop: `1px solid ${Colors.black}`,
        pointerEvents: 'none',
    },
    growSquareBack: {
        position: 'absolute',
        left: 5,
        top: 5,
        width: 7,
        height: 7,
        border: `1px solid ${Colors.darkGray}`,
        backgroundColor: Colors.white,
    },
    growSquareFront: {
        position: 'absolute',
        left: 2,
        top: 2,
        width: 6,
        height: 6,
        border: `1px solid ${Colors.black}`,
        backgroundColor: Colors.white,
    },
};

export default Window;

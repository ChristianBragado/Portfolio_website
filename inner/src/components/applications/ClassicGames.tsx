import React, { useState } from 'react';
import Window from '../os/Window';

interface MacEmulatorConfig {
    title: string;
    src: string;
    credit: string;
    startWidth?: number;
    startHeight?: number;
}

/**
 * Generic window hosting an in-browser classic Mac emulator (iframe).
 * Used for the emulated games in the lineup.
 */
const makeEmulatorApp = (config: MacEmulatorConfig): React.FC<WindowAppProps> => {
    const EmulatorApp: React.FC<WindowAppProps> = (props) => {
        const [width, setWidth] = useState(config.startWidth || 700);
        const [height, setHeight] = useState(config.startHeight || 590);

        return (
            <Window
                top={30}
                left={90}
                width={width}
                height={height}
                windowTitle={config.title}
                bottomLeftText={config.credit}
                closeWindow={props.onClose}
                onInteract={props.onInteract}
                minimizeWindow={props.onMinimize}
                onWidthChange={setWidth}
                onHeightChange={setHeight}
            >
                <iframe
                    src={config.src}
                    title={config.title}
                    frameBorder="0"
                    allow="autoplay; fullscreen; cross-origin-isolated"
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        backgroundColor: 'black',
                    }}
                />
            </Window>
        );
    };
    return EmulatorApp;
};

export const ShufflepuckApp = makeEmulatorApp({
    title: 'Shufflepuck Café',
    src: 'https://archive.org/embed/moofaday_Shufflepuck_Cafe',
    credit: 'Broderbund, 1988 — emulated by the Internet Archive',
});

export const DarkCastleApp = makeEmulatorApp({
    title: 'Dark Castle',
    src: 'https://archive.org/embed/mac_DarkCastle_1_2',
    credit: 'Silicon Beach Software, 1986 — emulated by the Internet Archive',
});

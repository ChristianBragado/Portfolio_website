import React, { useState } from 'react';
import Window from '../os/Window';
import mystIcon from '../../assets/icons/mystIcon.png';

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

// Myst needs a color 68k Mac (Basilisk II / Quadra class). Infinite Mac's
// iframe embed mode currently fails to paint in Chrome (emulator boots but
// never blits), so Myst launches as its own full-tab machine instead: a
// Quadra 650 running System 7.5.3 with the Myst CD streamed from the
// Internet Archive — verified booting with the CD mounted and open.
const MYST_MACHINE_URL =
    'https://infinitemac.org/embed?disk=System%207.5.3&machine=Quadra%20650' +
    '&infinite_hd=true' +
    '&cdrom=https%3A%2F%2Farchive.org%2Fdownload%2Fmyst_20210621%2FMyst.toast';

export const MystApp: React.FC<WindowAppProps> = (props) => {
    return (
        <Window
            top={70}
            left={140}
            width={470}
            height={400}
            windowTitle="Myst"
            bottomLeftText="Cyan, 1993 — needs its own machine to run"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
        >
            <div style={mystStyles.content}>
                <img src={mystIcon} alt="" style={mystStyles.icon} />
                <p style={mystStyles.title}>Myst</p>
                <p style={mystStyles.body}>
                    Myst needs a color Macintosh — a Quadra 650 running
                    System 7.5.3 will be started with the Myst CD inserted.
                </p>
                <p style={mystStyles.hint}>
                    Once it boots, drag “Myst” and “Myst Files” from the CD
                    onto the hard disk and double-click Myst — just like 1993.
                </p>
                <div className="mac-default-ring" style={mystStyles.buttonRing}>
                    <button
                        className="site-button"
                        onMouseDown={() =>
                            window.open(MYST_MACHINE_URL, '_blank')
                        }
                    >
                        Insert Myst CD
                    </button>
                </div>
            </div>
        </Window>
    );
};

const mystStyles: StyleSheetCSS = {
    content: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 20,
        textAlign: 'center',
    },
    icon: {
        width: 48,
        imageRendering: 'pixelated',
        marginBottom: 8,
    },
    title: {
        fontFamily: 'Chicago, Geneva, sans-serif',
        fontSize: 20,
        marginBottom: 10,
    },
    body: {
        fontSize: 15,
        marginBottom: 8,
        maxWidth: 360,
    },
    hint: {
        fontSize: 13,
        color: '#444444',
        marginBottom: 16,
        maxWidth: 360,
    },
    buttonRing: {
        borderRadius: 12,
    },
};

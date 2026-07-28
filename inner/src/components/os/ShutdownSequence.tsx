import React, { useState, useEffect, useRef } from 'react';
import neverGiveUp from '../../assets/pictures/neverGiveUp.jpg';
import eePic from '../../assets/pictures/ee.jpg';
import happyMac from '../../assets/icons/happyMac.png';
import alertSound from '../../assets/audio/alert.mp3';
import macbootSound from '../../assets/audio/macboot.mp3';
export interface ShutdownSequenceProps {
    numShutdowns: number;
    setShutdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const SPEED_MULTIPLIER = 1;

const _F = `>${200 * SPEED_MULTIPLIER}<`;
const _X = `>${500 * SPEED_MULTIPLIER}<`;
const _S = `>${1000 * SPEED_MULTIPLIER}<`;
const _M = `>${2000 * SPEED_MULTIPLIER}<`;
const _L = `>${5000 * SPEED_MULTIPLIER}<`;

function delay(time: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

const ShutdownSequence: React.FC<ShutdownSequenceProps> = ({
    numShutdowns,
    setShutdown,
}) => {
    const [text, setText] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [rebooting, setRebooting] = useState(false);
    const [ee, setEE] = useState(false);

    // System 7 'Simple Beep' on failure lines, Mac boot pair on reboot.
    // Lazily constructed: useRef(new Audio(...)) would re-instantiate on
    // every keystroke render of the typed sequence.
    const alertRef = useRef<HTMLAudioElement>();
    const bootRef = useRef<HTMLAudioElement>();
    if (!alertRef.current) alertRef.current = new Audio(alertSound);
    if (!bootRef.current) bootRef.current = new Audio(macbootSound);
    const beepedRef = useRef<{ [key: string]: boolean }>({});

    const playAlert = (marker: string) => {
        if (beepedRef.current[marker] || !alertRef.current) return;
        beepedRef.current[marker] = true;
        alertRef.current.volume = 0.5;
        alertRef.current.currentTime = 0;
        alertRef.current.play().catch(() => {});
    };

    useEffect(() => {
        if (text.includes('Transfer Failed')) playAlert('transfer');
        if (text.includes('FATAL ERROR')) playAlert('fatal');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text]);

    useEffect(() => {
        if (rebooting && bootRef.current) {
            bootRef.current.volume = 0.55;
            bootRef.current.play().catch(() => {});
        }
    }, [rebooting]);

    const getTime = () => {
        const date = new Date();
        const h = date.getHours();
        const m = date.getMinutes();
        const s = date.getSeconds();
        const time =
            h + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
        return time;
    };

    const NORMAL_SHUTDOWN = `Beginning Pre-Shutdown Sequence... ${_F}
    Connecting to HHOS01/13:2000.${_F}.${_F}.${_F}
    |
    Established connection to HH0S01/13:2000, attempting data transfer.
    |
    ${_F}
    |Analyzing data... Done.| ${_F}
    |Packing Transfer... Done.| ${_F}
    |Beginning Transfer...| ${_F}
    |[${getTime()} START]| .${_F}.....${_X}.|............|.${_S}.|......|.${_S}...........${_M} |[Transfer Failed.]|


    |(HHOS01/13:200:60099) [DEP_ANALYTICS_SERVER_ON_AFTER_SETUP_MIDDLEWARE] InvalidFormatting: 'onAnalyticsConversion' option received invalid parameters. Please contact a server administrator to resolve the issue.|
    ${_F}
    |(HHOS01/13:200:60099) [SOCKET_FAILED_TO_RESPOND] Connection Refused: Reconnecting... [${getTime()}:00]|
    |(HHOS01/13:200:60099) [SOCKET_FAILED_TO_RESPOND] Connection Refused: Reconnecting... [${getTime()}:01]
    (HHOS01/13:200:60099) [SOCKET_FAILED_TO_RESPOND] Connection Refused: Reconnecting... [${getTime()}:03]
    (HHOS01/13:200:60099) [SOCKET_FAILED_TO_RESPOND] Connection Refused: Reconnecting... [${getTime()}:05]
    (HHOS01/13:200:60099) [SOCKET_FAILED_TO_RESPOND] Connection Refused: Reconnecting... [${getTime()}:08]
    (HHOS01/13:200:60099) [SOCKET_FAILED_TO_RESPOND] Connection Refused: Reconnecting... [${getTime()}:12]
    (HHOS01/13:200:60099) [SOCKET_FAILED_TO_RESPOND] Connection Refused: Reconnecting... [${getTime()}:14]
    FATAL ERROR: (HHOS01/13:200:60099) Server became unresponsive and the transfer failed. Unable to shutdown computer. 
    |
    Aborting shutdown sequence and rebooting.




    Rebooting${_S}.${_S}.${_S}.
    `;

    const SHUTDOWN_3 = `
    Damn${_S}.${_S}.${_S}. ${_M} You really wanna shutdown this computer huh?${_L}
    Well, I hate to break it to you,${_S} but its impossible to shutdown...${_S} It will always reboot.
    ${_L}
    |Goodbye!|
    ${_M}


    Rebooting${_S}.${_S}.${_S}.
    `;

    const SHUTDOWN_4 = `
    Did you not read the last message?${_S} This computer will A${_F}L${_F}W${_F}A${_F}Y${_F}S${_F} reboot, the shutdown sequence is just here for show. It's not actually doing anything.
    ${_M}
    I literally spent months on this website to give you other things to do.
    You can play DOOM, Oregon Trail, Scrabble... but all you wanna do is shut the computer down.
    ${_L}
    |Goodbye Again!|
    ${_M}

    Rebooting${_S}.${_S}.${_S}.
    `;

    const SHUTDOWN_5 = `
    Really${_X}?${_X}?${_X}?
    ${_M}
    What did I do to deserve this? ${_M}What do you want from me????
    ${_L}
    
    Rebooting${_F}.${_F}.${_F}.
    `;

    const SHUTDOWN_6 = `
    ${_M}>${_M}:${_M}(${_M}


    Rebooting${_F}.${_F}.${_F}.
    `;

    const SHUTDOWN_7 = `
    7th shutdown... lucky number 7! ${_M}

    In light of this HUGE milestone, let me try to provide some entertainment! ${_M}Counting one by one to my all time favorite number:
    ${_L}
    7${_M},212${_M},313
    ${_M} Strap in! ${_S} | [Time remaining: Approximately 4,000 hours (0.5 numbers/second)]|

    1${_M},2${_M},3${_M},4${_M},5${_M},6${_M},7${_M},8${_M},9${_M},10${_M},11${_M},12${_M},13${_S}.${_S}.${_S}.

    Alright I'm bored...
    ${_M}
    
    
    Rebooting${_F}.${_F}.${_F}.
    `;

    const SHUTDOWN_8 = `
    Your commitment is admirable,${_S} truly. ${_M}And even though I don't want you to turn off my really cool and epic computer, ${_M} I think I'm ready to concede. ${_M}

    ${_L}
    |SIKE!!!|


    Rebooting${_F}.${_F}.${_F}.
    `;

    const SHUTDOWN_10 = `
    Alright fine, the message is clear${_M}. You want to turn off the computer. ${_M}

    You win${_S}.${_S}.${_S}.${_S} fair and square ${_M}

    Truthfully I can't keep on spending time writing out these messages...${_M} and if the world you want to live in is a world without me (or my epic really cool and sick computer), ${_M}so be it.

    ${_L}
    I won't forget you...
    ${_L}


    Shutting${_M} Down${_M}.${_M}.${_M}.
    `;

    const SHUTDOWN_MAP = [
        NORMAL_SHUTDOWN,
        NORMAL_SHUTDOWN,
        NORMAL_SHUTDOWN,
        SHUTDOWN_3,
        SHUTDOWN_4,
        SHUTDOWN_5,
        SHUTDOWN_6,
        SHUTDOWN_7,
        SHUTDOWN_8,
        '',
        SHUTDOWN_10,
    ];

    const typeText = (
        i: number,
        curText: string,
        text: string,
        setText: React.Dispatch<React.SetStateAction<string>>,
        callback: () => void,
        refOverride?: React.MutableRefObject<string>
    ) => {
        if (refOverride) {
            text = refOverride.current;
        }
        let delayExtra = 0;
        if (i < text.length) {
            if (text[i] === '|') {
                let dumpText = '';
                for (let j = i + 1; j < text.length; j++) {
                    if (text[j] === '|') {
                        i = j + 1;
                        break;
                    }
                    dumpText += text[j];
                }
                setText(curText + dumpText);
                typeText(
                    i,
                    curText + dumpText,
                    text,
                    setText,
                    callback,
                    refOverride
                );
                return;
            }
            if (text[i] === '>') {
                let delayTime = '';
                for (let j = i + 1; j < text.length; j++) {
                    if (text[j] === '<') {
                        i = j + 1;
                        break;
                    }
                    delayTime += text[j];
                }
                delayExtra = parseInt(delayTime);
            }

            setTimeout(() => {
                setText(curText + text[i]);
                typeText(
                    i + 1,
                    curText + text[i],
                    text,
                    setText,
                    callback,
                    refOverride
                );
            }, 20 + delayExtra);
        } else {
            callback();
        }
    };

    useEffect(() => {
        delay(2000).then(() => {
            setLoading(false);
            delay(1000).then(() => {
                const shutdown = SHUTDOWN_MAP[numShutdowns];
                if (numShutdowns === 9) {
                    delay(10000).then(() => {
                        setLoading(true);
                        setRebooting(true);
                        delay(6000).then(() => {
                            setShutdown(false);
                        });
                    });
                } else if (numShutdowns === 10) {
                    // Final shutdown: stay dark, no Welcome splash
                    typeText(0, '', shutdown, setText, () => {
                        setLoading(true);
                        delay(6000).then(() => {
                            setLoading(false);
                            setEE(true);
                        });
                    });
                } else {
                    typeText(0, '', shutdown, setText, () => {
                        setLoading(true);
                        setRebooting(true);
                        delay(6000).then(() => {
                            setShutdown(false);
                        });
                    });
                }
            });
        });
        // eslint-disable-next-line
    }, []);

    return ee ? (
        <div style={styles.imageContainer}>
            <img src={eePic} style={styles.img} alt="" />
        </div>
    ) : loading && rebooting ? (
        <div style={styles.welcomeScreen}>
            <div style={styles.welcomeDialog}>
                <img
                    src={happyMac}
                    style={styles.happyMac}
                    alt="happy Macintosh"
                />
                <p style={styles.welcomeText}>Welcome to Macintosh.</p>
            </div>
        </div>
    ) : loading ? (
        <div style={styles.shutdown}>
            <div className="blinking-cursor" />
        </div>
    ) : numShutdowns === 10 ? (
        <div style={styles.imageContainer}>
            <img src={neverGiveUp} style={styles.img} alt="" />
        </div>
    ) : (
        <div style={styles.shutdown}>
            <p style={styles.text}>{text}</p>
        </div>
    );
};

const styles: StyleSheetCSS = {
    shutdown: {
        minHeight: '100%',
        flex: 1,
        backgroundColor: '#111111',
        padding: 64,
    },
    text: {
        color: 'white',
        fontFamily: 'MonacoWeb, monospace',
        whiteSpace: 'pre-line',
    },
    // Classic Mac boot: light gray screen, centered rounded dialog
    welcomeScreen: {
        minHeight: '100%',
        flex: 1,
        backgroundColor: '#b6b6b6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeDialog: {
        backgroundColor: 'white',
        border: '2px solid black',
        borderRadius: 14,
        boxShadow: '2px 2px 0 black',
        paddingTop: 28,
        paddingBottom: 28,
        paddingLeft: 48,
        paddingRight: 48,
        alignItems: 'center',
        flexDirection: 'row',
    },
    happyMac: {
        width: 64,
        imageRendering: 'pixelated',
        marginRight: 32,
    },
    welcomeText: {
        fontFamily: 'Chicago, Geneva, sans-serif',
        fontSize: 28,
        color: 'black',
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#111111',
        padding: 64,
    },
    img: {
        width: 1000,
        height: 700,
    },
};

export default ShutdownSequence;

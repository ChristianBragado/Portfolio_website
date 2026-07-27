import React, { useEffect, useRef, useState } from 'react';
import Colors from '../../constants/colors';
import EMBED_INSET from '../../constants/layout';
import { Icon } from '../general';
import { IconName } from '../../assets/icons';

export interface MenuBarProps {
    windows: DesktopWindows;
    toggleMinimize: (key: string) => void;
    shutdown: () => void;
    openApp: (key: string) => void;
    apps: { key: string; name: string; icon: IconName }[];
}

type MenuName = 'apple' | 'file' | 'edit' | 'special' | 'application' | '';

const MenuBar: React.FC<MenuBarProps> = ({
    windows,
    toggleMinimize,
    shutdown,
    openApp,
    apps,
}) => {
    const getTime = () => {
        const date = new Date();
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const mins = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + mins + ' ' + amPm;
    };

    const [openMenu, setOpenMenu] = useState<MenuName>('');
    const [time, setTime] = useState(getTime());
    const barRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const interval = setInterval(() => setTime(getTime()), 5000);
        return () => clearInterval(interval);
    }, []);

    // Close any open menu when clicking outside the bar
    useEffect(() => {
        const onDown = (e: MouseEvent) => {
            if (barRef.current && !barRef.current.contains(e.target as Node)) {
                setOpenMenu('');
            }
        };
        window.addEventListener('mousedown', onDown, false);
        return () => window.removeEventListener('mousedown', onDown, false);
    }, []);

    const toggle = (menu: MenuName) =>
        setOpenMenu((cur) => (cur === menu ? '' : menu));

    const hoverOpen = (menu: MenuName) =>
        setOpenMenu((cur) => (cur !== '' && cur !== menu ? menu : cur));

    const closeAnd = (fn: () => void) => () => {
        setOpenMenu('');
        fn();
    };

    const frontKey = Object.keys(windows).reduce(
        (best, key) =>
            !windows[key].minimized &&
            (best === '' || windows[key].zIndex > windows[best].zIndex)
                ? key
                : best,
        ''
    );

    const label = (menu: MenuName, content: React.ReactNode) => (
        <div
            className={`sys-menu-label${openMenu === menu ? ' open' : ''}`}
            onMouseDown={(e) => {
                e.stopPropagation();
                toggle(menu);
            }}
            onMouseEnter={() => hoverOpen(menu)}
        >
            {content}
        </div>
    );

    return (
        <div style={styles.menuBar} ref={barRef}>
            <div style={styles.left}>
                {/* Apple menu */}
                <div style={styles.menuAnchor}>
                    {label(
                        'apple',
                        <Icon icon="appleLogo" style={styles.appleIcon} />
                    )}
                    {openMenu === 'apple' && (
                        <div className="sys-menu" style={{ left: 0 }}>
                            <div
                                className="sys-menu-item"
                                onMouseDown={closeAnd(() =>
                                    openApp('credits')
                                )}
                            >
                                About This Macintosh…
                            </div>
                            <div className="sys-menu-sep" />
                            {apps.map((app) => (
                                <div
                                    key={app.key}
                                    className="sys-menu-item"
                                    onMouseDown={closeAnd(() =>
                                        openApp(app.key)
                                    )}
                                >
                                    <span style={styles.menuItemWithIcon}>
                                        <Icon
                                            icon={app.icon}
                                            size={16}
                                            style={styles.menuItemIcon}
                                        />
                                        {app.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/* File */}
                <div style={styles.menuAnchor}>
                    {label('file', 'File')}
                    {openMenu === 'file' && (
                        <div className="sys-menu" style={{ left: 0 }}>
                            <div
                                className="sys-menu-item"
                                onMouseDown={closeAnd(() =>
                                    openApp('showcase')
                                )}
                            >
                                <span>Open My Showcase</span>
                                <span style={styles.menuShortcut}>⌘O</span>
                            </div>
                            <div className="sys-menu-sep" />
                            <div className="sys-menu-item disabled">
                                <span>Close Window</span>
                                <span style={styles.menuShortcut}>⌘W</span>
                            </div>
                            <div className="sys-menu-item disabled">
                                Get Info
                            </div>
                        </div>
                    )}
                </div>
                {/* Edit (authentically decorative) */}
                <div style={styles.menuAnchor}>
                    {label('edit', 'Edit')}
                    {openMenu === 'edit' && (
                        <div className="sys-menu" style={{ left: 0 }}>
                            <div className="sys-menu-item disabled">
                                <span>Undo</span>
                                <span style={styles.menuShortcut}>⌘Z</span>
                            </div>
                            <div className="sys-menu-sep" />
                            <div className="sys-menu-item disabled">
                                <span>Cut</span>
                                <span style={styles.menuShortcut}>⌘X</span>
                            </div>
                            <div className="sys-menu-item disabled">
                                <span>Copy</span>
                                <span style={styles.menuShortcut}>⌘C</span>
                            </div>
                            <div className="sys-menu-item disabled">
                                <span>Paste</span>
                                <span style={styles.menuShortcut}>⌘V</span>
                            </div>
                        </div>
                    )}
                </div>
                {/* Special */}
                <div style={styles.menuAnchor}>
                    {label('special', 'Special')}
                    {openMenu === 'special' && (
                        <div className="sys-menu" style={{ left: 0 }}>
                            <div className="sys-menu-item disabled">
                                Empty Trash…
                            </div>
                            <div className="sys-menu-sep" />
                            <div
                                className="sys-menu-item"
                                onMouseDown={closeAnd(shutdown)}
                            >
                                Restart
                            </div>
                            <div
                                className="sys-menu-item"
                                onMouseDown={closeAnd(shutdown)}
                            >
                                Shut Down
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div style={styles.right}>
                <p className="toolbar-text" style={styles.clock}>
                    {time}
                </p>
                {/* Application menu (frontmost app + open windows) */}
                <div style={styles.menuAnchor}>
                    {label(
                        'application',
                        <span style={styles.appMenuLabel}>
                            <Icon
                                icon={
                                    frontKey
                                        ? windows[frontKey].icon
                                        : 'appMenuGeneric'
                                }
                                size={16}
                            />
                        </span>
                    )}
                    {openMenu === 'application' && (
                        <div
                            className="sys-menu"
                            style={{ right: 0, minWidth: 200 }}
                        >
                            {Object.keys(windows).length === 0 && (
                                <div className="sys-menu-item disabled">
                                    No Open Applications
                                </div>
                            )}
                            {Object.keys(windows).map((key) => (
                                <div
                                    key={key}
                                    className="sys-menu-item"
                                    onMouseDown={closeAnd(() =>
                                        toggleMinimize(key)
                                    )}
                                >
                                    <span style={styles.menuItemWithIcon}>
                                        <Icon
                                            icon={windows[key].icon}
                                            size={16}
                                            style={styles.menuItemIcon}
                                        />
                                        <span
                                            style={
                                                windows[key].minimized
                                                    ? styles.minimizedName
                                                    : {}
                                            }
                                        >
                                            {windows[key].name}
                                        </span>
                                    </span>
                                    {key === frontKey && <span>✓</span>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    menuBar: {
        boxSizing: 'border-box',
        position: 'absolute',
        top: EMBED_INSET.top,
        width: '100%',
        height: 20,
        background: Colors.white,
        borderBottom: `1px solid ${Colors.black}`,
        zIndex: 100000,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 4,
    },
    left: {
        alignItems: 'center',
        height: '100%',
    },
    right: {
        alignItems: 'center',
        height: '100%',
    },
    menuAnchor: {
        position: 'relative',
        height: '100%',
        alignItems: 'center',
    },
    appleIcon: {
        width: 14,
        height: 14,
        imageRendering: 'pixelated',
    },
    appMenuLabel: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 4,
        paddingRight: 4,
    },
    clock: {
        marginRight: 14,
        fontSize: 13,
    },
    menuShortcut: {
        marginLeft: 24,
        opacity: 0.75,
    },
    menuItemWithIcon: {
        display: 'flex',
        alignItems: 'center',
    },
    menuItemIcon: {
        width: 16,
        height: 16,
        marginRight: 8,
        imageRendering: 'pixelated',
    },
    minimizedName: {
        opacity: 0.55,
    },
};

export default MenuBar;

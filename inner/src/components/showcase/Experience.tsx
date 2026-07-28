import React from 'react';
import ResumeDownload from './ResumeDownload';

export interface ExperienceProps {}

const Experience: React.FC<ExperienceProps> = (props) => {
    return (
        <div className="site-page-content">
            <ResumeDownload />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Apple</h1>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={'https://www.apple.com/'}
                        >
                            <h4>www.apple.com</h4>
                        </a>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Senior Technician</h3>
                        <b>
                            <p>March 2014 - Fall 2021</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    more info coming soon more info coming soon more
                    info coming soon more more info coming soon more
                    info coming soon more info coming soon more info
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            more info coming soon more info coming soon more
                            info coming soon more more info coming soon more
                            info coming soon more info coming soon more info
                        </p>
                    </li>
                    <li>
                        <p>
                            more info coming soon more info coming soon more
                            info coming soon more more info coming soon more
                            info coming soon more info coming soon more info
                        </p>
                    </li>
                    <li>
                        <p>
                            more info coming soon more info coming soon more
                            info coming soon more more info coming soon more
                            info coming soon more info coming soon more info
                        </p>
                    </li>
                    <li>
                        <p>
                            more info coming soon more info coming soon more
                            info coming soon more more info coming soon more
                            info coming soon more info coming soon more info
                        </p>
                    </li>
                    <li>
                        <p>
                            more info coming soon more info coming soon more
                            info coming soon more more info coming soon more
                            info coming soon more info coming soon more info
                        </p>
                    </li>
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>CapitolBri</h1>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={'https://www.capitolbri.com'}
                        >
                            <h4>www.capitolbri.com</h4>
                        </a>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Lead Engineer</h3>
                        <b>
                            <p>Fall 2022 - Spring 2023  </p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    Supervised and developed the front end of capitol bri,
                    Written in Typescript using React and
                    deployed using AWS Elastic Beanstalk.
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            Managed the project and team members by conducting
                            bi-weekly stand-ups.
                        </p>
                    </li>
                    <li>
                        <p>
                            Architected bracket view UI using React Flow and
                            custom bracket data types built from binary trees.
                        </p>
                    </li>
                    <li>
                        <p>
                            Created conversion algorithms to serialize bracket
                            tree data to allow for saving in the cloud.
                        </p>
                    </li>
                    <li>
                        <p>
                            Implemented bracket generation utilities which
                            employ gray code for proper team seeding and
                            placement.
                        </p>
                    </li>
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>K-F/X</h1>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href={'more info coming soon'}
                        >
                            <h4>more info coming soon.com</h4>
                        </a>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>more info soon</h3>
                        <b>
                            <p>Fall 2019, Summer 2021</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                            more info coming soon more info coming soon more
                            info coming soon more more info coming soon more
                            info coming soon more info coming soon more info
                </p>
                <br />
                <h3 style={styles.indent}>Screen Credits:</h3>
                <ul>
                    <li style={styles.row}>
                        <p>• Ray Donovan</p>
                        <p>
                            [{' '}
                            <a
                                href="https://www.sho.com/ray-donovan"
                                target="_blank"
                                rel="noreferrer"
                            >
                                SHOWTIME
                            </a>{' '}
                            ]
                        </p>
                    </li>
                    <li style={styles.row}>
                        <p>• Ray Donovan: The Movie</p>
                        <p>
                            [{' '}
                            <a
                                href="https://www.sho.com/titles/3508117/ray-donovan-the-movie"
                                target="_blank"
                                rel="noreferrer"
                            >
                                SHOWTIME
                            </a>{' '}
                            ]
                        </p>
                    </li>
                    <li style={styles.row}>
                        <p>• Hightown</p>
                        <p>
                            [{' '}
                            <a
                                href="https://www.starz.com/us/en/series/hightown/57463"
                                target="_blank"
                                rel="noreferrer"
                            >
                                STARZ
                            </a>{' '}
                            ]
                        </p>
                    </li>
                    <li style={styles.row}>
                        <p>• Bull</p>
                        <p>
                            [{' '}
                            <a
                                href="https://www.cbs.com/shows/bull/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                CBS
                            </a>{' '}
                            ]
                        </p>
                    </li>
                    <li style={styles.row}>
                        <p>• At Home with Amy Sedaris</p>
                        <p>
                            [{' '}
                            <a
                                href="https://www.trutv.com/shows/at-home-with-amy-sedaris"
                                target="_blank"
                                rel="noreferrer"
                            >
                                truTV
                            </a>{' '}
                            ]
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    skillRow: {
        flex: 1,
        justifyContent: 'space-between',
    },
    skillName: {
        minWidth: 56,
    },
    skill: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
    },
    progressBar: {
        flex: 1,
        background: 'red',
        marginLeft: 8,
        height: 8,
    },
    hoverLogo: {
        height: 32,
        marginBottom: 16,
    },
    headerContainer: {
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'center',
    },
    hoverText: {
        marginBottom: 8,
    },
    indent: {
        marginLeft: 24,
    },
    headerRow: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

export default Experience;

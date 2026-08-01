import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import me from '../../assets/pictures/workingAtComputer.jpg';
import ResumeDownload from './ResumeDownload';

export interface AboutProps {}

const About: React.FC<AboutProps> = () => {
    return (
        <main className="site-page-content showcase-about">
            <header className="page-intro">
                <p className="showcase-kicker">About</p>
                <h1>Built from curiosity.</h1>
                <p className="page-lede">
                    I am Christian Bragado, a Los Angeles-based full-stack software
                    developer with a long-running habit of taking things apart to
                    understand how they work.
                </p>
            </header>

            <section className="about-feature" aria-labelledby="about-feature-title">
                <div className="about-feature-copy">
                    <h2 id="about-feature-title">A developer with a support engineer's instincts.</h2>
                    <p>
                        I bring more than a decade of customer-facing technical work into
                        software development. That means I care about the person on the
                        other side of the interface, the edge case hiding in the logs, and
                        the fix that still makes sense six months later.
                    </p>
                    <p>
                        In 2022, I completed Thinkful's Engineering Immersion Program and
                        focused that curiosity on full-stack JavaScript. Since then, I have
                        kept building projects that make the technical idea visible and fun
                        to use.
                    </p>
                    <div className="inline-links">
                        <RouterLink to="/projects">See selected projects</RouterLink>
                        <RouterLink to="/experience">View experience</RouterLink>
                    </div>
                </div>
                <figure className="about-photo">
                    <img src={me} alt="Christian Bragado working at a computer" />
                    <figcaption>Where the tinkering started</figcaption>
                </figure>
            </section>

            <section className="about-columns" aria-label="What I bring">
                <div className="about-column">
                    <h3>How I work</h3>
                    <ul className="plain-list">
                        <li>Start with the user's problem, then trace it to the code.</li>
                        <li>Make the first version clear enough to learn from.</li>
                        <li>Leave systems easier to understand than I found them.</li>
                    </ul>
                </div>
                <div className="about-column">
                    <h3>Outside the stack</h3>
                    <p>
                        I like projects with a physical feeling: small games, interactive
                        tools, 3D spaces, music, and visual experiments. The common thread
                        is turning a question into something another person can pick up and
                        use.
                    </p>
                </div>
            </section>

            <ResumeDownload />
        </main>
    );
};

export default About;

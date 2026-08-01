import React from 'react';
import ResumeDownload from './ResumeDownload';

export interface ExperienceProps {}

const Experience: React.FC<ExperienceProps> = () => {
    return (
        <main className="site-page-content showcase-experience">
            <header className="page-intro experience-intro">
                <p className="showcase-kicker">Experience</p>
                <h1>Technical depth, human context.</h1>
                <p className="page-lede">
                    My background combines full-stack development with years of solving
                    complex technical problems directly with customers.
                </p>
            </header>

            <section className="experience-timeline" aria-label="Work and education">
                <article className="experience-item">
                    <div className="experience-date">01/2018<br />Present</div>
                    <div className="experience-details">
                        <div className="experience-heading">
                            <div>
                                <h2>Apple</h2>
                                <p className="experience-role">Senior Technician</p>
                            </div>
                            <a href="https://www.apple.com/" target="_blank" rel="noreferrer">
                                apple.com
                            </a>
                        </div>
                        <ul>
                            <li>Deliver Level II and Level III technical support with a customer-first approach.</li>
                            <li>Maintain a same-unit repair rate below 5% while consistently delivering an NPS score above 80.</li>
                            <li>Replicate, document, and collaborate on novel hardware, software, and environmental issues.</li>
                            <li>Build clear repair paths for difficult problems and resolve issues in an average of under 12 minutes.</li>
                        </ul>
                    </div>
                </article>

                <article className="experience-item">
                    <div className="experience-date">01/2014<br />01/2018</div>
                    <div className="experience-details">
                        <div className="experience-heading">
                            <div>
                                <h2>Apple</h2>
                                <p className="experience-role">Technical Specialist</p>
                            </div>
                            <a href="https://www.apple.com/retail/" target="_blank" rel="noreferrer">
                                apple retail
                            </a>
                        </div>
                        <ul>
                            <li>Diagnosed customer hardware and software issues and found the right path to resolution.</li>
                            <li>Translated technical decisions into clear, useful guidance for people at every skill level.</li>
                            <li>Helped customers build confidence with their products through patient, practical training.</li>
                        </ul>
                    </div>
                </article>

                <article className="experience-item education-item">
                    <div className="experience-date">02/2022<br />07/2022</div>
                    <div className="experience-details">
                        <div className="experience-heading">
                            <div>
                                <h2>Thinkful</h2>
                                <p className="experience-role">Engineering Immersion Program</p>
                            </div>
                            <span>Certificate</span>
                        </div>
                        <ul>
                            <li>Built mobile-first applications with JavaScript, React, Node.js, PostgreSQL, and RESTful APIs.</li>
                            <li>Practiced algorithms, data structures, testing, deployment, and software development standards.</li>
                            <li>Collaborated with senior developers in a mentor-student environment while shipping weekly work.</li>
                        </ul>
                    </div>
                </article>
            </section>

            <section className="experience-toolkit" aria-labelledby="toolkit-title">
                <div>
                    <p className="showcase-kicker">Toolkit</p>
                    <h2 id="toolkit-title">The stack I reach for.</h2>
                </div>
                <div className="skill-groups">
                    <div>
                        <h3>Frontend</h3>
                        <p>JavaScript, React, HTML, CSS, jQuery</p>
                    </div>
                    <div>
                        <h3>Backend</h3>
                        <p>Node.js, Express, RESTful APIs, PostgreSQL</p>
                    </div>
                    <div>
                        <h3>Workflow</h3>
                        <p>Git, GitHub, Mocha, Chai, Knex, VS Code</p>
                    </div>
                </div>
            </section>

            <ResumeDownload />
        </main>
    );
};

export default Experience;

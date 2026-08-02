import React from 'react';
import { Link } from '../general';
import me from '../../assets/pictures/currentme.jpg';

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    return (
        <main className="site-page-content showcase-home">
            <section className="home-hero" aria-labelledby="home-title">
                <div className="home-copy">
                    <p className="showcase-kicker">Full-stack software developer</p>
                    <h1 id="home-title">Christian Bragado</h1>
                    <p className="home-lede">
                        I build useful web experiences with JavaScript, React, Node.js,
                        and a support engineer's eye for the details.
                    </p>
                    <div className="home-actions">
                        <Link to="projects" text="VIEW PROJECTS" className="primary-link" />
                        <Link to="contact" text="CONTACT ME" className="secondary-link" />
                    </div>
                    <div className="home-facts" aria-label="Profile facts">
                        <span>Los Angeles</span>
                        <span>Open to full-stack work</span>
                        <span>JavaScript / React / Node</span>
                    </div>
                </div>
                <figure className="home-portrait-wrap">
                    <div className="home-portrait-frame">
                        <img
                            className="home-portrait"
                            src={me}
                            alt="Christian Bragado working at a computer"
                        />
                    </div>
                    <figcaption>Christian Bragado, Los Angeles</figcaption>
                </figure>
            </section>

            <section className="home-intro" aria-labelledby="home-intro-title">
                <div>
                    <p className="showcase-kicker">A working portfolio</p>
                    <h2 id="home-intro-title">Curious by default. Practical by design.</h2>
                </div>
                <p>
                    From a 3D desktop portfolio to island planning tools and full-stack
                    capstones, these are the projects that show how I think, build, and
                    keep going when the interesting part starts.
                </p>
            </section>
        </main>
    );
};

export default Home;

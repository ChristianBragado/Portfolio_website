import React from 'react';
import portfolioPreview from '../../assets/pictures/projects/software.gif';

export interface ProjectsProps {}

interface Project {
    title: string;
    type: string;
    year: string;
    image: string;
    imageAlt: string;
    description: string;
    howItWorks: string;
    whyBuilt: string;
    tags: string[];
    repo: string;
    live?: string;
    liveLabel?: string;
}

const projects: Project[] = [
    {
        title: 'Christian Bragado Portfolio',
        type: 'Personal project',
        year: '2022-2026',
        image: portfolioPreview,
        imageAlt: 'Preview of the 3D portfolio computer scene',
        description: 'A portfolio that boots into its own operating system instead of asking for attention with another landing page.',
        howItWorks: 'A Three.js scene renders a modeled computer, while a React System 7 interface runs inside the screen as a standalone app.',
        whyBuilt: 'I wanted the portfolio itself to be a piece of software: something with a point of view, an interface, and a little room to explore.',
        tags: ['Three.js', 'React', 'TypeScript', 'Webpack'],
        repo: 'https://github.com/ChristianBragado/Portfolio_website',
        live: 'https://portfolio-website-five-zeta.vercel.app/',
        liveLabel: 'Live site',
    },
    {
        title: "Tom Nook's Island Designer",
        type: 'Interactive tool',
        year: '2020-2026',
        image: 'https://raw.githubusercontent.com/ChristianBragado/TomNookIslandDesigner/master/thumbnail.png',
        imageAlt: "A colorful Animal Crossing island map created with Tom Nook's Island Designer",
        description: 'A tiny map editor for big island plans, built for the moment when a good idea needs a grid, a brush, and a way back.',
        howItWorks: 'The editor combines paint tools, zooming, panning, undo and redo, autosave, and image-based map export so plans can be shared and recovered.',
        whyBuilt: 'Animal Crossing made planning feel like a real design problem. I built the tool I wanted before laying out an island of my own.',
        tags: ['JavaScript', 'Canvas', 'Interaction design'],
        repo: 'https://github.com/ChristianBragado/TomNookIslandDesigner',
        live: 'https://christianhugo.github.io/TomNookIslandDesigner/',
        liveLabel: 'Live demo',
    },
    {
        title: 'Papi Bird',
        type: 'Post-graduation project',
        year: '2022',
        image: 'https://raw.githubusercontent.com/ChristianBragado/papi_bird/main/images/background.jpg',
        imageAlt: 'Papi Bird game scene with pipes, hills, and a blue sky',
        description: 'Flappy Bird rebuilt as a small, complete game loop with a little more personality and a lot of attention to feel.',
        howItWorks: 'Vanilla JavaScript drives the game state, movement, collision checks, scoring, sound, and restart flow on top of a custom HTML and CSS scene.',
        whyBuilt: 'After Thinkful, I wanted to practice shipping something with no framework to hide behind. The result was a playful way to sharpen timing, state, and polish.',
        tags: ['JavaScript', 'HTML', 'CSS', 'Game logic'],
        repo: 'https://github.com/ChristianBragado/papi_bird',
    },
    {
        title: 'WeLoveMovies',
        type: 'Thinkful project',
        year: '2022',
        image: 'https://opengraph.githubassets.com/1/ChristianBragado/thinkful-we-love-movies-frontend',
        imageAlt: 'GitHub preview for the WeLoveMovies frontend project',
        description: 'A movie catalog that turns a pile of titles into a reason to choose what to watch next.',
        howItWorks: 'A React frontend queries a REST API to browse movies, reviews, and theaters, keeping the interface focused on useful details instead of noise.',
        whyBuilt: 'This project was where the client-server relationship became tangible. I built it to practice composing a friendly interface on top of real API data.',
        tags: ['React', 'REST API', 'JavaScript', 'CSS'],
        repo: 'https://github.com/ChristianBragado/thinkful-we-love-movies-frontend',
        live: 'https://github.com/ChristianBragado/thinkful-we-love-movies-project-backend',
        liveLabel: 'Backend',
    },
    {
        title: 'Restaurant Reservation System',
        type: 'Thinkful final capstone',
        year: '2022',
        image: 'https://opengraph.githubassets.com/1/ChristianBragado/restaurant-reservation-app',
        imageAlt: 'GitHub preview for the Restaurant Reservation System capstone',
        description: 'The back-of-house console for a fully booked Friday, where every table and time slot has to line up.',
        howItWorks: 'A React dashboard talks to a Node and Express API backed by PostgreSQL and Knex so restaurant staff can manage reservations and table availability.',
        whyBuilt: 'As a final capstone, it pulled the whole stack together: routing, database queries, API design, forms, deployment thinking, and the small decisions that keep a busy workflow usable.',
        tags: ['React', 'Node.js', 'PostgreSQL', 'Knex'],
        repo: 'https://github.com/ChristianBragado/restaurant-reservation-app',
    },
];

const Projects: React.FC<ProjectsProps> = () => {
    return (
        <main className="site-page-content showcase-projects">
            <header className="page-intro projects-intro">
                <p className="showcase-kicker">Projects</p>
                <h1>Selected work with a pulse.</h1>
                <p className="page-lede">
                    Five projects from the portfolio, the Thinkful course, and the side quests
                    that kept me building after graduation.
                </p>
            </header>

            <section className="project-grid" aria-label="Selected projects">
                {projects.map((project, index) => (
                    <article
                        className={`project-card ${index === 0 ? 'project-card-featured' : ''}`}
                        key={project.title}
                    >
                        <figure className="project-visual">
                            <img src={project.image} alt={project.imageAlt} loading={index === 0 ? 'eager' : 'lazy'} />
                        </figure>
                        <div className="project-card-body">
                            <div className="project-meta">
                                <span>{project.type}</span>
                                <span>{project.year}</span>
                            </div>
                            <h2>{project.title}</h2>
                            <p className="project-description">{project.description}</p>
                            <div className="project-explanation">
                                <div>
                                    <h3>How it works</h3>
                                    <p>{project.howItWorks}</p>
                                </div>
                                <div>
                                    <h3>Why I built it</h3>
                                    <p>{project.whyBuilt}</p>
                                </div>
                            </div>
                            <div className="project-footer">
                                <div className="project-tags" aria-label="Technologies used">
                                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                                </div>
                                <div className="project-links">
                                    <a href={project.repo} target="_blank" rel="noreferrer">GitHub</a>
                                    {project.live && <a href={project.live} target="_blank" rel="noreferrer">{project.liveLabel || 'Open link'}</a>}
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default Projects;

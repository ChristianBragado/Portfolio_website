import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../showcase/Home';
import About from '../showcase/About';
import Window from '../os/Window';
import Experience from '../showcase/Experience';
import Projects from '../showcase/Projects';
import Contact from '../showcase/Contact';
import VerticalNavbar from '../showcase/VerticalNavbar';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';
import EMBED_INSET from '../../constants/layout';

export interface ShowcaseExplorerProps extends WindowAppProps {}

const ShowcaseExplorer: React.FC<ShowcaseExplorerProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 100 });
    const isCompactViewport = window.innerWidth < 720;

    return (
        <Window
            top={32 + EMBED_INSET.top}
            left={isCompactViewport ? 0 : 56}
            width={isCompactViewport ? window.innerWidth : initWidth}
            height={isCompactViewport ? Math.max(window.innerHeight - 44, 400) : initHeight}
            windowTitle="Christian Bragado - Portfolio"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'© 2026 Christian Bragado'}
        >
            <Router
                basename={
                    window.location.pathname.startsWith('/os') ? '/os' : ''
                }
            >
                <div className="site-page">
                    <VerticalNavbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/experience" element={<Experience />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/projects/software" element={<Navigate to="/projects" replace />} />
                    </Routes>
                </div>
            </Router>
        </Window>
    );
};

export default ShowcaseExplorer;

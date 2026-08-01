import React from 'react';
import { Link } from '../general';
import { useLocation } from 'react-router';

export interface VerticalNavbarProps {}

const VerticalNavbar: React.FC<VerticalNavbarProps> = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    if (isHome) return null;

    return (
        <aside className="showcase-navbar" aria-label="Portfolio navigation">
            <div className="showcase-nav-brand">
                <Link to="" text="Christian" className="brand-name" />
                <Link to="" text="Bragado" className="brand-name" />
                <p>Portfolio 2026</p>
            </div>
            <nav className="showcase-nav-links">
                <Link to="" text="HOME" />
                <Link to="about" text="ABOUT" />
                <Link to="experience" text="EXPERIENCE" />
                <Link to="projects" text="PROJECTS" />
                <Link to="contact" text="CONTACT" />
            </nav>
            <div className="showcase-nav-footer">
                <span>Available for</span>
                <strong>full-stack work</strong>
            </div>
        </aside>
    );
};

export default VerticalNavbar;

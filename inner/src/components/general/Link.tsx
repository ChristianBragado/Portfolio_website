import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export interface LinkProps {
    text: string;
    to: string;
    containerStyle?: React.CSSProperties;
    outsideTo?: string;
    className?: string;
}

const Link: React.FC<LinkProps> = (props) => {
    const location = useLocation();
    const route = props.to ? `/${props.to}` : '/';
    const isHere = location.pathname === route;

    return (
        <RouterLink
            to={route}
            className={props.className}
            aria-current={isHere ? 'page' : undefined}
            style={Object.assign({}, { display: 'flex' }, props.containerStyle)}
        >
            <span className="link-indicator" aria-hidden="true" />
            <span className="router-link">{props.text}</span>
        </RouterLink>
    );
};

export default Link;

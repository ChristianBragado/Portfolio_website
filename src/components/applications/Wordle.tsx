import React from 'react';
import Window from '../os/Window';
import Wordle from '../wordle/Wordle';

export interface HenordleAppProps extends WindowAppProps {}

const Henordle: React.FC<HenordleAppProps> = (props) => {
    return (
        <Window
            top={20}
            left={300}
            width={600}
            height={860}
            windowBarIcon="windowGameIcon"
            windowTitle="Wordle"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'© Copyright 2022 Christian Hugo'}
        >
            <div className="site-page">
                <Wordle />
            </div>
        </Window>
    );
};

export default Henordle;

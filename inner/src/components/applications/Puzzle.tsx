import React, { useCallback, useRef, useState } from 'react';
import Window from '../os/Window';
import alertSound from '../../assets/audio/alert.mp3';

export interface PuzzleAppProps extends WindowAppProps {}

const SIZE = 4;
const TILE = 56;
const GAP = 2;
const BOARD = SIZE * TILE + (SIZE + 1) * GAP;

// Board is a 16-slot array; value 0 is the blank. Shuffling applies random
// legal moves from the solved state so every deal stays solvable.
const solvedBoard = () =>
    Array.from({ length: SIZE * SIZE }, (_, i) => (i + 1) % (SIZE * SIZE));

const shuffleBoard = () => {
    const board = solvedBoard();
    let blank = board.indexOf(0);
    let prev = -1;
    for (let i = 0; i < 250; i++) {
        const r = Math.floor(blank / SIZE);
        const c = blank % SIZE;
        const options: number[] = [];
        if (r > 0) options.push(blank - SIZE);
        if (r < SIZE - 1) options.push(blank + SIZE);
        if (c > 0) options.push(blank - 1);
        if (c < SIZE - 1) options.push(blank + 1);
        const candidates: number[] = [];
        for (const o of options) {
            if (o !== prev) candidates.push(o);
        }
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        board[blank] = board[pick];
        board[pick] = 0;
        prev = blank;
        blank = pick;
    }
    return board;
};

const isSolved = (board: number[]) =>
    board.every((v, i) => v === (i + 1) % (SIZE * SIZE));

const PuzzleApp: React.FC<PuzzleAppProps> = (props) => {
    const [board, setBoard] = useState<number[]>(shuffleBoard);
    const [moves, setMoves] = useState(0);
    const [solved, setSolved] = useState(false);
    const beepRef = useRef<HTMLAudioElement>();
    if (!beepRef.current) beepRef.current = new Audio(alertSound);

    const slide = useCallback(
        (index: number) => {
            if (solved) return;
            setBoard((prev) => {
                const blank = prev.indexOf(0);
                const r = Math.floor(index / SIZE);
                const c = index % SIZE;
                const br = Math.floor(blank / SIZE);
                const bc = blank % SIZE;
                const adjacent =
                    (r === br && Math.abs(c - bc) === 1) ||
                    (c === bc && Math.abs(r - br) === 1);
                if (!adjacent) return prev;
                const next = [...prev];
                next[blank] = next[index];
                next[index] = 0;
                setMoves((m) => m + 1);
                if (isSolved(next)) {
                    setSolved(true);
                    if (beepRef.current) {
                        beepRef.current.volume = 0.5;
                        beepRef.current.play().catch(() => {});
                    }
                }
                return next;
            });
        },
        [solved]
    );

    const newGame = useCallback(() => {
        setBoard(shuffleBoard());
        setMoves(0);
        setSolved(false);
    }, []);

    return (
        <Window
            top={60}
            left={120}
            width={BOARD + 36}
            height={BOARD + 132}
            windowTitle="Puzzle"
            bottomLeftText={
                solved
                    ? `Solved in ${moves} moves!`
                    : `${moves} move${moves === 1 ? '' : 's'}`
            }
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
        >
            <div style={styles.content}>
                <div style={styles.boardFrame}>
                    <div style={styles.board}>
                        {board.map((value, index) => {
                            if (value === 0) return null;
                            const r = Math.floor(index / SIZE);
                            const c = index % SIZE;
                            return (
                                <div
                                    key={value}
                                    onMouseDown={() => slide(index)}
                                    style={Object.assign({}, styles.tile, {
                                        top: GAP + r * (TILE + GAP),
                                        left: GAP + c * (TILE + GAP),
                                        backgroundColor: solved
                                            ? '#c8e6c9'
                                            : 'white',
                                    })}
                                >
                                    <p style={styles.tileText}>{value}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div style={styles.buttonRow}>
                    <button className="site-button" onMouseDown={newGame}>
                        New Game
                    </button>
                </div>
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    content: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingTop: 12,
        paddingBottom: 10,
    },
    boardFrame: {
        border: '2px solid black',
        borderRadius: 3,
        backgroundColor: '#9e9e9e',
    },
    board: {
        position: 'relative',
        width: BOARD,
        height: BOARD,
    },
    tile: {
        position: 'absolute',
        width: TILE,
        height: TILE,
        border: '1px solid black',
        boxSizing: 'border-box',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'top 0.08s ease-out, left 0.08s ease-out',
    },
    tileText: {
        fontFamily: 'Chicago, Geneva, sans-serif',
        fontSize: 20,
        color: 'black',
    },
    buttonRow: {
        marginTop: 12,
    },
};

export default PuzzleApp;

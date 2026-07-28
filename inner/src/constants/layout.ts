// When embedded in the 3D Mac's CRT (an iframe), the tube bezel crops the
// outer edges of the screen (~24px top/bottom, ~22px sides). Inset the OS
// chrome so the menu bar, icons and Trash stay fully visible on the tube.
const embedded = (() => {
    try {
        return window.self !== window.top;
    } catch {
        return true;
    }
})();

export const EMBED_INSET = {
    top: embedded ? 24 : 0,
    right: embedded ? 22 : 0,
    bottom: embedded ? 24 : 0,
};

export default EMBED_INSET;

import React, {useEffect, useRef} from "react";
import {Terminal} from "xterm";
import {FitAddon} from "xterm-addon-fit";
import {AttachAddon} from "xterm-addon-attach";
import "xterm/css/xterm.css";

const TerminalComponent = () => {
    const termRef = useRef(null);
    const socketRef = useRef(null);
    const fitAddon = useRef(new FitAddon());
    const terminalRef = useRef(null);

    useEffect(() => {
        const terminal = new Terminal();
        terminal.open(termRef.current);
        terminal.loadAddon(fitAddon.current);

        socketRef.current = new WebSocket("ws://localhost:8000/api/ssh");

        socketRef.current.onopen = () => {
            console.log("Connected to SSH");
            const attachAddon = new AttachAddon(socketRef.current);
            terminal.loadAddon(attachAddon);
            resizeTerminal(50, 200)
        };

        terminalRef.current = terminal;

        return () => {
            terminal.dispose();
            socketRef.current.close();
        };
    }, []);

    const handleKeydown = (event) => {
        if (socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({type: "input", data: event.key}));
        }
    };

    const resizeTerminal = (rows, cols) => {
        if (terminalRef.current) {
            terminalRef.current.resize(cols, rows);
        }
    };

    return (
        <div>
            <div ref={termRef}></div>
            <div tabIndex={0} onKeyDown={handleKeydown}></div>
        </div>
    );
};

export default TerminalComponent;
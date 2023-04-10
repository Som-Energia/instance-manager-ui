import React, {useEffect, useRef} from "react";
import {Terminal} from "xterm";
import {FitAddon} from "xterm-addon-fit";
import {AttachAddon} from "xterm-addon-attach";
import "xterm/css/xterm.css";

export default function TerminalComponent({instanceName}: { instanceName: string }) {
    const termRef = useRef<HTMLDivElement>(null);
    const socketRef = useRef<WebSocket | null>(null);
    const fitAddon = useRef<FitAddon>(new FitAddon());
    const terminalRef = useRef<Terminal | null>(null);

    useEffect(() => {
        const handleResize = () => {
            fitAddon.current.fit();
            sendResizeInfo();
        };
        const terminal = new Terminal();

        terminal.open(termRef.current!);
        terminal.loadAddon(fitAddon.current);

        socketRef.current = new WebSocket(`${process.env.websocketApi}/instances/${instanceName}/ssh`);

        socketRef.current.onopen = () => {
            console.log("Connected to SSH");
            const attachAddon = new AttachAddon(socketRef.current!);
            terminal.loadAddon(attachAddon);
            fitAddon.current.fit();
            sendResizeInfo();
            window.addEventListener("resize", handleResize);
        };

        terminalRef.current = terminal;

        return () => {
            terminal.dispose();
            socketRef.current?.close();
            window.removeEventListener("resize", handleResize);
        };
    }, [instanceName]);

    const sendResizeInfo = () => {
        const rows = Math.floor(window.innerHeight / 17);
        const cols = terminalRef.current!.cols;
        terminalRef.current!.resize(cols, rows);
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current?.send(JSON.stringify({type: "resize", rows, cols}));
        }
    };

    const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current?.send(JSON.stringify({type: "input", data: event.key}));
        }
    };

    return (
        <div className="terminal-container">
            <div className="terminal" ref={termRef}></div>
            <div tabIndex={0} onKeyDown={handleKeydown}></div>
        </div>
    );
};

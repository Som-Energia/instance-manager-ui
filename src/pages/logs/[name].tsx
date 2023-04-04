import Head from 'next/head'
import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {InstanceApiRepository} from "@/infrastructure/InstanceApiRepository";
import ansiToHtml from 'ansi-to-html';

export default function Home() {
    const router = useRouter()

    const [logs, setLogs] = useState('');
    const [html, setHtml] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bottomElement = bottomRef.current;
        if (bottomElement) {
            bottomElement.scrollIntoView({block: 'end'});
        }
    }, [html]);

    useEffect(() => {
        const {name} = router.query
        if (name) {
            new InstanceApiRepository().logsByName(name.toString())
                .then(response => {
                    setLogs(response.replace(/\r\n/g, '<br/>'))
                });
        }
    }, [router.query]);

    useEffect(() => {
        const convert = new ansiToHtml();
        setHtml(convert.toHtml(logs));
    }, [logs]);

    return (
        <>
            <Head>
                <title>Instance-Manager UI</title>
                <meta name="description" content="OpenERP server instance manager"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.png"/>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700&display=swap"
                />
            </Head>
            <main>
                <div dangerouslySetInnerHTML={{__html: html}}/>
                <div ref={bottomRef}/>
            </main>
        </>
    )
}

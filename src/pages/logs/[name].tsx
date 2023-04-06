import Head from 'next/head'
import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import ansiToHtml from 'ansi-to-html';
import {readInstanceLogs} from "@/services/api";
import useSWR from "swr";
import {Alert, Snackbar} from "@mui/material";

export default function Home() {
    const router = useRouter()

    const {name} = router.query;
    const {data, error} = useSWR(`${name}`, readInstanceLogs, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    const [html, setHtml] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bottomElement = bottomRef.current;
        if (bottomElement) {
            bottomElement.scrollIntoView({block: 'end'});
        }
    }, [html]);

    useEffect(() => {
        if (data) {
            const convert = new ansiToHtml();
            setHtml(convert.toHtml(data.replace(/\r\n/g, '<br/>')));
        }
    }, [data]);

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

                {/* Error getting logs message */}
                {error &&
                    <Snackbar open={error}>
                        <Alert variant="filled" severity="error" sx={{width: '100%'}}>
                            Cannot get instance logs: {error.message}
                        </Alert>
                    </Snackbar>
                }
            </main>
        </>
    )
}

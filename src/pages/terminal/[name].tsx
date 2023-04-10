import dynamic from 'next/dynamic'
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Head from "next/head";

const TerminalComponent = dynamic(() => import('@/components/TerminalComponent'), {
    ssr: false
})

export default function Home() {
    const router = useRouter()
    const {name} = router.query
    const [instanceName, setInstanceName] = useState('');
    useEffect(() => {
        if (name) {
            setInstanceName(name.toString())
        }
    }, [name]);
    return (
        <>
            <Head>
                <title>Terminal{name && ' - ' + name}</title>
                <meta name="description" content="OpenERP server instance manager"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.png"/>
            </Head>
            <TerminalComponent instanceName={instanceName}/>
        </>
    )
}

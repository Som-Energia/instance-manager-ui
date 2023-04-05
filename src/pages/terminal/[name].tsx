import dynamic from 'next/dynamic'
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const TerminalComponent = dynamic(() => import('@/components/TerminalComponent'), {
    ssr: false
})

export default function Home() {
    const router = useRouter()
    const [instanceName, setInstanceName] = useState('');
    useEffect(() => {
        const {name} = router.query
        if (name) {
            setInstanceName(name.toString())
        }
    }, [router.query]);
    return (
        <TerminalComponent instanceName={instanceName}/>
    )
}

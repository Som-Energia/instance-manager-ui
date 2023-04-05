import dynamic from 'next/dynamic'

const TerminalComponent = dynamic(() => import('@/components/ssh'), {
    ssr: false
})

export default function Home() {
    return (
        <>
            <TerminalComponent></TerminalComponent>
        </>
    )
}
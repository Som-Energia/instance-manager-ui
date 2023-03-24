import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {defaultTheme} from '@/styles/themes';

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline/>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}

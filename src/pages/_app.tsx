import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {createTheme, ThemeOptions, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#97D700',
        },
        secondary: {
            main: '#7c51af',
        },
        error: {
            main: '#d32f2f',
        },
        warning: {
            main: '#f99f00',
        },
        info: {
            main: '#446bc1',
        },
        success: {
            main: '#2c8942',
        },
    },
    typography: {
        fontFamily: 'Montserrat',
        fontWeightBold: 600,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
    },
};

const theme = createTheme(themeOptions);

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}

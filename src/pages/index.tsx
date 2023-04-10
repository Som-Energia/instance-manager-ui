import Head from 'next/head'
import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {ThemeProvider} from '@mui/material/styles';
import {styled} from "@mui/system";
import InstanceDashboard from "@/components/InstanceDashboard";
import {lightTheme} from "@/styles/themes"

const Logo = styled("img")({
    height: "30px",
    marginRight: "10px",
});

export default function Home() {
    return (
        <>
            <Head>
                <title>Instance-Manager UI</title>
                <meta name="description" content="OpenERP server instance manager"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.png"/>
            </Head>
            <header>
                <ThemeProvider theme={lightTheme}>
                    <AppBar position="static">
                        <Toolbar>
                            <Box display="flex" alignItems="center">
                                <Logo src="/som-logo.webp" alt="Logo"/>
                                <Typography variant="h6">Instance-Manager UI</Typography>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </header>
            <main>
                <InstanceDashboard/>
            </main>
        </>
    )
}

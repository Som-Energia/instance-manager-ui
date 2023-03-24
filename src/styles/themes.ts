import {createTheme, ThemeOptions} from "@mui/material/styles";

const darkThemeOptions: ThemeOptions = {
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

const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
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

export const defaultTheme = createTheme(darkThemeOptions);
export const lightTheme = createTheme(lightThemeOptions);


import { createTheme } from '@mui/material';
const AppLayoutTheme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1440,
            xl: 1536,
        },
    },
})
export default AppLayoutTheme;

import { createTheme } from '@mui/material';

const trendingTheme = createTheme({
    components: {
        MuiImageList: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    flexWrap: 'nowrap',
                    overflowX: 'scroll',
                    padding: '10px 0',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none', // Hide scrollbar for IE and Edge
                },
            },
        },
        MuiImageListItem: {
        	styleOverrides: {
        		root: {
        			margin: '0 10px'
        		}
        	}
        }
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        marginTop: '10px'
    },
    imageList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
});

export default trendingTheme;

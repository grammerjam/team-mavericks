import { styled } from "@mui/material";

export const MediaContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #1e1e1e;
    background: url(${(props) => props.backdrop}) no-repeat center center;
    background-size: cover;
    
`

export const NoVideoMsg = styled("div")`
    padding: 10px;
    text-align: center;
    margin-top: 2rem;
    color: #bbb;
    font-size: 1.25rem;
    background-color: #0a0a0a78;
    border-radius: 9px;
`

export const MediaInfoContainer = styled("div")`
    max-width: 700px;
    height: auto;
    background-color: rgba(10, 10, 10, 0.75);
    padding: 40px;
    align-self: flex-start;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
`

export const Title = styled("h1")`
    color: white;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 40px;
    font-family: 'Outfit';
`

export const ReleaseDate = styled("p")`
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    margin-bottom: 15px;
    font-family: 'Outfit';
`

export const Overview = styled("p")`
    color: rgba(255, 255, 255, 0.9);
    font-size: 1rem;
    line-height: 1.9;
    margin-bottom: 20px;
    font-family: 'Outfit';
`

export const Genres = styled("p")`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`

export const Genre = styled("p")`
    color: rgba(255, 255, 255, 0.9);
    background-color: rgba(255, 255, 255, 0.1);
    padding: 5px 10px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: capitalize;
    font-family: 'Outfit';
`
import styled from 'styled-components';

export const Container = styled.div`
    background-color: #28292f;
    color: #fff;
    min-height: 100vh;
`

export const Area = styled.div`
    margin: auto;
    max-width: 980px;
    padding: 2rem 0;
`

export const Header = styled.h1`
    margin: 0;
    padding: 0;
    text-align: center;
    margin-bottom: 2rem;
`

export const ScreenWarning = styled.div`
    text-align: center;
    
    .emoji{
        font-size: 3rem;
        margin-bottom: 1rem;
    }
`

export const PhotoList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
`

export const UploadForm = styled.form`
    background-color: #3d3f43;
    padding: 1rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    border: 1px solid #888;

    input[type=submit]{
        background-color: #756df4;
        border: 0;
        color: #fff;
        padding: 8px 1rem;
        font-size: 1rem;
        border-radius: 1rem;
        margin: 0 1.4rem;
        cursor: pointer;

        &:hover{
            opacity: 0.7;
        }
    }
`
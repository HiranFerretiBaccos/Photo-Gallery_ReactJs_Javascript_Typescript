import styled from 'styled-components';

export const Container = styled.div`
    background-color: #3d3f43;
    border-radius: 1rem;
    border: 5px double #888;
    padding: 1rem;

    img{
        max-width: 100%;
        border-radius: 2rem;
        border: 2px dotted #888;
        display: block;
        margin-bottom: 1rem;
    }

    button{
        background-color: #ddd;
        color: #222;
        padding: 6px 10px;
        border-radius: 8px;
        border: 2px solid #222;

        &:hover{
            background-color: #756df4;
            color: #fff;
        }
    }
`
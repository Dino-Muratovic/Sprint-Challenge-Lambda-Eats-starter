import React from "react";
import { Route, Link } from "react-router-dom";
import styled from 'styled-components';


const HeaderSection = styled.section`
    background-color:salmon;
    text-align:center;
`;



const Home = () => {

    return (
        <HeaderSection>  
            <Link to={'/'}>Home</Link>   
            <Link to={'/form'}>Form</Link> 

            <h1>Lambda Eats</h1>
            <h2>Ready to place your order?</h2>                  
           
        </HeaderSection>
    )

}

export default Home;
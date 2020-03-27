import React from "react";
import Home from "./Home";
import Form from "./Form";
import { Link, Route } from 'react-router-dom';





const App = () => {
  return (
    <>  
       <Link to={'/'}>Home</Link>   
       <Link to={'/form'}>Form</Link> 
             
        <Route exact path={'/'}><Home /></Route>
        <Route path={'/form'}><Form /></Route>      
    </>
  );
};
export default App;

import React from "react";
import Home from "./Home";
import Form from "./Form";
import { BrowserRouter, Route, Link} from 'react-router-dom';




const App = () => {
  return (
    <>  
       <Link to={'/'}>Home</Link>   
       <Link to={'/form'}>Form</Link>       
        <Home />
        <Form />      
    </>
  );
};
export default App;

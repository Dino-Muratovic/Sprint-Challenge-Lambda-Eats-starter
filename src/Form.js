import React, { useState, useEffect } from 'react';
import * as yup from 'yup'; // import all of the YUP
import axios from 'axios';
import { Route } from 'react-router-dom';
import styled from 'styled-components';



//Set up Schema
//Set up what the user is required to input
const formSchema = yup.object().shape({
    name: yup.string().required("Full name is required"),
    size: yup.string(),
    toppings: yup.boolean().oneOf([true], "Please select your toppings"),
    instructions: yup.string()
})




const Form = () => {

    //Set state for the form itself -- for all the inputs    
    const [formState, setFormState] = useState({
        name: "",
        size: "",
        toppings: "", 
        instructions: ""
    })
    //Set state for errors
    const [errors, setErrors] = useState({
        name: "",
        size: "",
        toppings: "", 
        instructions: ""
    })
    //Set State for the button
    const [button, setButton] = useState(true);
    //Set state for our post request
    const [post, setPost] = useState([]);



    //useEffect here
    useEffect (() => {
        formSchema.isValid(formState)
    .then (valid => {
        setButton(!valid);
    }) 
    }, [formState]) // Dependancy array here

    //validate Change
    const validateChange = event => {
        yup

        .reach(formSchema, event.target.name)
        .validate(event.target.name === "toppings" ? event.target.checked : event.target.value)
        .then(valid => {
            setErrors({
                ...errors, [event.target.name]:""
            });
        }).catch (err => {
            setErrors({
                errors, [event.target.name]: err.errors
            });
        });
    };

    //input change here
    const inputChange = event => {
        event.persist();
        // console.log(`event ===>`, event)

        const newFormData = {
            ...formState,
            [event.target.name]:
            event.target.type === "checkbox" ? event.target.checked : event.target.value            
        };
        validateChange(event);
        setFormState(newFormData);

    }

    //FORM submit here

    const formSubmit = event => {
        event.preventDefault();
        console.log(`event here`, event)

        axios
        .post('https://reqres.in/api/users', formState)

        .then (res => {
            setPost(res.data);
            console.log("success", post)

            setFormState({
                name: "",
                size: "",
                toppings: "", 
                instructions: ""
            })
        })

        .catch(err => {
            console.log(err.res);
        }) 
       
    }



    return (
        <form onSubmit={formSubmit}>    
                       

            {/* Put your name in here */}
            <label htmlFor="name">Name<br/>
                <input
                id="name"
                type="text"
                name="name"
                value={formState.name}// to be changed
                onChange={inputChange}                
                />                       
             </label>
             {console.log(`errors => `, errors)}
             <br/> 


            {/* Select your pizza size here */}
             <label htmlFor="size">Please select your size:<br/>
                <select id="size" name="size" onChange={inputChange}>
                    <option value="Small Pizza">Small Pizza: 8-10 inches with 6 slices.</option>
                    <option value="Medium Pizza">Medium Pizza: 12 inches with 8 slices.</option>
                    <option value="Large Pizza">Large Pizza: 14 inch with 10 slices.</option>
                    <option value="Extra-large Pizza">Extra-large Pizza: 16-18 inch with 12 slices.</option>
                </select>       
             </label>
             <br/> 



            {/* Toppings here */}

            <h3>Select the desired toppings:</h3>
            <p>Choose up to 4.</p>

             <label htmlFor="toppings">Peperoni
                <input
                id="toppings"
                type="checkbox"
                name="toppings"
                value={formState.toppings}// to be changed   
                onChange={inputChange}            
                />                       
             </label>
             <br/>

             <label htmlFor="toppings"> Sausage
                <input
                id="toppings"
                type="checkbox"
                name="toppings"
                value={formState.toppings} // to be changed     
                onChange={inputChange}           
                />                       
             </label>
             <br/>

             <label htmlFor="toppings"> Onions
                <input
                id="toppings"
                type="checkbox"
                name="toppings"
                value={formState.toppings}// to be changed  
                onChange={inputChange}              
                />                       
             </label>
             <br/>

             <label htmlFor="toppings"> Pineapple
                <input
                id="toppings"
                type="checkbox"
                name="toppings"
                value={formState.toppings} // to be changed  
                onChange={inputChange}              
                />                       
             </label>
             <br/>

             {/* Special instructions here */}
             <label htmlFor="instructions">Special Instructions<br/>
                <input
                id="name"
                type="text"
                name="instructions"
                value={formState.instructions} // to be changed 
                onChange={inputChange}               
                />                       
             </label>
             <br/> 

             {/* Add submit button here */}
             <pre>{JSON.stringify(post, null, 2)}</pre>
             <button disabled={button}>Submit Order</button>

        </form>
    )

}

export default Form;
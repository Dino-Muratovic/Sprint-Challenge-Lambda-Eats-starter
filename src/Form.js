import React, { useState, useEffect } from 'react';
import * as yup from 'yup'; // import all of the YUP
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.form`
    border:1px solid red;
    background-color:#F0F8FF;
    width:80%;
    margin:0 auto;
    display:flex;
    flex-direction:column;
    align-items:center;  
    border-radius:15px; 
`;





//Set up Schema
//Set up what the user is required to input
const formSchema = yup.object().shape({
    name: yup.string().required("Full name is required").min(2),
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


    /* Each time the form value state is updated, check to see if it is valid per our schema. 
--For an example check if name is a string and make sure some value is entered because it's required.
  This will allow us to enable/disable the submit button.*/

    //useEffect here
    useEffect (() => {
        /* We pass the entire state into the entire schema, no need to use reach here. 
    We want to make sure it is all valid before we allow a user to submit
    isValid comes from Yup directly */  


    //make sure that formState is following all the rules coming the formSchema
        formSchema.isValid(formState)
    .then (valid => {
        setButton(!valid);
    }) 
    }, [formState]) // Dependancy array here

    //validate Change
    const validateChange = event => {
        // Reach will allow us to "reach" into the schema and test only one part.
        yup

        .reach(formSchema, event.target.name) // .name come from inputs
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
        /* event.persist allows us to use the synthetic event in an async manner.
    We need to be able to use it after the form validation */
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

            setFormState({  // this sets the state back to blanks when the form is submitted
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
        <FormContainer onSubmit={formSubmit}>    
                       

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

        </FormContainer>
    )

}

export default Form;
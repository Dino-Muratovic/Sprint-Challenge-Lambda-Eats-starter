import React, { useState} from 'react';
import * as yup from 'yup'; // import all of the YUP


//Set up Schema
//Set up what the user is required to input
const formSchema = yup.object().shape({
    name: yup.string().required("Full name is required"),
    size: yup.string().required("Please select your pizza size"),
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

    const [errors, setErrors] = useState({
        name: "",
        size: "",
        toppings: "", 
        instructions: ""
    })









    return (
        <form>

            {/* Put your name in here */}
            <label htmlFor="name">Name<br/>
                <input
                id="name"
                type="text"
                name="name"
                value="name" // to be changed
                
                />                       
             </label>
             <br/> 


            {/* Select your pizza size here */}
             <label htmlFor="size">Please select your size:<br/>
                <select id="size" name="size">
                    <option>Small Pizza: 8-10 inches with 6 slices.</option>
                    <option>Medium Pizza: 12 inches with 8 slices.</option>
                    <option>Large Pizza: 14 inch with 10 slices.</option>
                    <option>Extra-large Pizza: 16-18 inch with 12 slices.</option>
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
                value="name" // to be changed                
                />                       
             </label>
             <br/>

             <label htmlFor="toppings"> Sausage
                <input
                id="toppings"
                type="checkbox"
                name="toppings"
                value="name" // to be changed                
                />                       
             </label>
             <br/>

             <label htmlFor="toppings"> Onions
                <input
                id="toppings"
                type="checkbox"
                name="toppings"
                value="name" // to be changed                
                />                       
             </label>
             <br/>

             <label htmlFor="toppings"> Pineapple
                <input
                id="toppings"
                type="checkbox"
                name="toppings"
                value="name" // to be changed                
                />                       
             </label>
             <br/>

             {/* Special instructions here */}
             <label htmlFor="instructions">Special Instructions<br/>
                <input
                placeholder="Anything else you'd like to add?"
                id="name"
                type="text"
                name="instructions"
                value="instructions" // to be changed                
                />                       
             </label>
             <br/> 



        </form>
    )

}

export default Form;
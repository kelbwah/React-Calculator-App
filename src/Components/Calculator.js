import React from "react"
import Box from "./Box.js"

export default function Calculator(props){

    // const [buttonsPressed, setButtonsPressed] = React.useState([]);
    const [currNumber, setCurrNumber] = React.useState('0');
    const [prevNumber, setPrevNumber] = React.useState('0');
    const [currExpression, setCurrExpression] = React.useState("");


    const handleClick = (button) => {
        // Using regex to figure out if button that is clicked is one of the integers from 0-9
        let regex = /[0-9]/;

        // Appending the clicked number to the current number
        if (regex.test(button.id) === true && currNumber.length < 9 && currNumber.length >= 1  && currNumber !== '0' && currExpression === "") {
            setCurrNumber(currNumber => `${currNumber}${button.id}`);
            props.changeToC();

        /* 
            Handling edge case if we were to have 0 be the starting number, but we press another number,
            we don't want the calculator to output 08 for example, so we just change the current number to the clicked number
        */ 
        } else if (regex.test(button.id) === true && currNumber.length === 1 && currNumber === '0'  && currExpression === ""){
            setCurrNumber(currNumber => `${button.id}`);
            props.changeToC();

        /* 
            Handling case where when user has chosen an arithmetic operator and they choose 
            decide on another number, the previous number they had chosen, would be set to the previous
            number and then the new one they choose with be output to the screen
        */
        } else if (regex.test(button.id) === true && currExpression !== "" && prevNumber === "0" ){
            setPrevNumber(prevNumber => currNumber);
            setCurrNumber(currNumber => `${button.id}`);

        /* 
            This if block works the same as the one above, but it allows the calculator to append numbers
            to the new number the user has chosen.
        */    
        }  else if (regex.test(button.id) === true && currExpression !== "" && prevNumber !== "0"  && currNumber.length < 9){
            setCurrNumber(currNumber => `${currNumber}${button.id}`);
        }

        // Clearing out both the current and previous number if the user presses the clear button
        else if (button.id === "AC" || button.id === "C"){
            setPrevNumber(prevNumber => "0");
            setCurrNumber(currNumber => "0");
            setCurrExpression(currExpression => "");
            props.changeToAC();

        // Keeping track of the arithmetic operator that the user chooses
        } else if (button.id === "+" || button.id === "-" || button.id === "x" || button.id === "÷"){
            setCurrExpression(prevExpression => button.id);
        
        // currNumber !== "0" && prevNumber !== "0"
        // Handling arithmetic only if there is a current number and a previous number
        } else if (button.id === "=" && currExpression !== ""){
            let prevFloatOrNot = (prevNumber.includes(".") || prevNumber.includes("e")) ? parseFloat(prevNumber) : parseInt(prevNumber);
            let currFloatOrNot = (currNumber.includes(".") || currNumber.includes("e")) ? parseFloat(currNumber) : parseInt(currNumber);
            setPrevNumber(prevNumber => "0");
            setCurrExpression(currExpression => "");

            // Using switch cases to handle all arithmetic
            switch (currExpression){
                    case("+"):
                        let sum = prevFloatOrNot + currFloatOrNot;
                        let realSum = Number.isInteger(sum) ? sum : sum.toFixed(2);

                        if (realSum.toString().length <= 9){
                            setCurrNumber(prevNumber => realSum.toString());
                        } else {
    
                            let newSum = parseFloat(realSum).toExponential(2);
                            setCurrNumber(prevNumber => newSum.toString());
                        }

                        break;

                    case("-"):
                        let difference = prevFloatOrNot - currFloatOrNot;
                        let realDifference = Number.isInteger(difference) ? difference : difference.toFixed(2);

                        if (realDifference.toString().length <= 9){
                            setCurrNumber(prevNumber => realDifference.toString());
                        } else {
                            let newDifference = parseFloat(realDifference).toExponential(2);
                            setCurrNumber(prevNumber => newDifference.toString());
                        }
                        break;

                    case("x"):
                        let product = prevFloatOrNot * currFloatOrNot;
                        let realProduct = Number.isInteger(product) ? product : product.toFixed(2);

                        if (realProduct.toString().length <= 9){
                            setCurrNumber(prevNumber => realProduct.toString());
                        } else {
                            let newProduct = parseFloat(realProduct).toExponential(2);
                            setCurrNumber(prevNumber => newProduct.toString());
                        }
                        break;

                    case("÷"):
                        let quotient = prevFloatOrNot / currFloatOrNot;

                        if (quotient.toString().length <= 9){
                            setCurrNumber(prevNumber => quotient.toString());
                        } else {
                            let newQuotient = quotient.toExponential(2);
                            setCurrNumber(prevNumber => newQuotient.toString());
                        }
                        break;
            }
        }

        // Adding the ability to add decimals, but only allowing for decimals to be added when the number on screen is less than or equal to 7
        else if (button.id === "." && currNumber.indexOf(".") === -1 ){
            if (currNumber.length >= 1 && currNumber.length <= 7){
                setCurrNumber(currNumber => `${currNumber}${button.id}`);
            }
        }

        // Adding the ability to change a number to negative or not
        else if (button.id === "+/-"){
            let realNumber = currNumber.indexOf(".") !== -1 ? (parseFloat(currNumber) * -1).toString() : (parseInt(currNumber) * -1).toString()
            setCurrNumber(currNumber => realNumber.toString());
        }

        // Changing the number to its percentage
        else if (button.id === "%" && currNumber !== "0"){
            let percentage = (parseFloat(currNumber) / 100).toFixed(2);
            setCurrNumber(currNumber => percentage.toString());
        }
        
    };

    // Mapping all the buttons and giving each button their own Box component
    const buttonElements = props.buttons.map(button => (
        <Box
            id={button.id}
            color={button.color}
            on={button.on}
            handleClick={() => handleClick(button)}
        />
    ));
    
    // Finally returning a calculator div with each of the unique buttons from buttonElements to be created
    return (
        <div className="calculator" >
            <nav className="nav">
                <h1 className="currNumber">{currNumber}</h1>
            </nav>
            <div className="buttons">
                {buttonElements}
            </div>
        </div>
    )
}

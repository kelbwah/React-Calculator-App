import './App.css';
import Calculator from  './Components/Calculator.js'
import Buttons from './Components/Buttons.js'
import React from "react"

function App() {
  
  const [buttons, setButtons] = React.useState(Buttons)
  
  function changeToC(){
    const C = {
      id: 'C',
      on: false,
      color: "rgb(45, 45, 45)"
    }
    const AC = {
      id: 'AC',
      on: false,
      color: "rgb(45, 45, 45)"
    }

    setButtons(prevButtons => {
       const newButtons = prevButtons.slice(1);
       newButtons.unshift(C);
       return newButtons;
    });

  }

  function changeToAC(){
    const AC = {
      id: 'AC',
      on: false,
      color: "rgb(45, 45, 45)"
    }

    setButtons(prevButtons => {
       const newButtons = prevButtons.slice(1);
       newButtons.unshift(AC);
       return newButtons;
    });
  }



  return (
    <Calculator 
      buttons={buttons}
      changeToC={changeToC}
      changeToAC={changeToAC}
    />
  );

}

export default App;

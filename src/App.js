import "./App.css"
import { act, useReducer } from "react"
import DigitButton from "./DigitButton"
import OperationButton from "./operationButton"


export const actions = {
  ADD_DIGIT: 'add-digit',
  DELETE_DIGIT: 'delete-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  EVALUATE: 'evaluate'
}

function reducer(state, {type, payload}){
  switch(type){
    case actions.ADD_DIGIT:
      if(payload.digit === "0" && state.currentOperand === "0"){
        return state
      }

      if(state.overwrite){
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }

      if(payload.digit === "." && state.currentOperand.includes(".")){
        return state
      }
      
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    
    case actions.CLEAR:
      return {

      }

    case actions.CHOOSE_OPERATION:
      if(state.previousOperand == null && state.currentOperand == null){
        return state
      }

      if(state.currentOperand == null){
        return {
          ...state,
          operation: payload.operation
        }
      }

      if(state.previousOperand == null){
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: null,
        operation: payload.operation
      }

    case actions.EVALUATE:
      if(state.previousOperand == null || state.currentOperand == null || state.operation == null){
        return state
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state)
      }

    case actions.DELETE_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          currentOperand: null,
          overwrite: false
        }
      }

      if(state.currentOperand == null) return state

      if(state.currentOperand.length == 1){
        return {
          ...state,
          currentOperand: null
        }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
  }
}

function evaluate({previousOperand, currentOperand, operation}){
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  let ans = ""

  if(isNaN(prev) || isNaN(current)){return ""}

  switch(operation){
    case "+":
      ans = prev + current
      break
    
    case "-":
      ans = prev - current
      break
    
    case "*":
      ans = prev * current
      break

    case "/":
      ans = prev / current
      break
  }

  return ans.toString()

}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0, 
})

function formatOperand(operand){
  if(operand == null) return 

  const [integer, decimal] = operand.split(".");

  if(decimal == null)
    return INTEGER_FORMATTER.format(integer);

  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App(){

  const [{previousOperand, currentOperand, operation}, dispatch] = useReducer(reducer, {})


  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{formatOperand(previousOperand)}{operation}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>

      <button className="span-two" onClick={() => dispatch({type: actions.CLEAR})}>AC</button>
      <button onClick={() => dispatch({type: actions.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation = "/" dispatch = {dispatch}/>
      <DigitButton digit = "1" dispatch = {dispatch}/>
      <DigitButton digit = "2" dispatch = {dispatch}/>
      <DigitButton digit = "3" dispatch = {dispatch}/>
      <OperationButton operation = "*" dispatch = {dispatch}/>
      <DigitButton digit = "4" dispatch = {dispatch}/>
      <DigitButton digit = "5" dispatch = {dispatch}/>
      <DigitButton digit = "6" dispatch = {dispatch}/>
      <OperationButton operation = "+" dispatch = {dispatch}/>
      <DigitButton digit = "7" dispatch = {dispatch}/>
      <DigitButton digit = "8" dispatch = {dispatch}/>
      <DigitButton digit = "9" dispatch = {dispatch}/>
      <OperationButton operation = "-" dispatch = {dispatch}/>
      <DigitButton digit = "." dispatch = {dispatch}/>
      <DigitButton digit = "0" dispatch = {dispatch}/>
      <button className="span-two" onClick={() => dispatch({type: actions.EVALUATE})}>=</button>



    </div>
  )
}

export default App
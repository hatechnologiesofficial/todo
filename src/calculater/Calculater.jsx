import React, { useState, useEffect } from 'react';
import { Button, Input, Col, Row, Card } from 'antd';

// Main App component for the calculator
const Calculater = () => {
  // State to store the current input/result displayed on the screen
  const [input, setInput] = useState('0');
  // State to store the previous number entered before an operator
  const [previousInput, setPreviousInput] = useState(null);
  // State to store the selected operator (+, -, *, /)
  const [operator, setOperator] = useState(null);
  // State to determine if a new number should start after an operation or equals
  const [waitingForNewNumber, setWaitingForNewNumber] = useState(false);

  // Function to handle number button clicks
  const handleNumberClick = (num) => {
    if (waitingForNewNumber) {
      // If waiting for a new number, replace current input with the new number
      setInput(String(num));
      setWaitingForNewNumber(false);
    } else {
      // If not waiting, append the number to the current input
      // Avoid leading zeros unless the input is just '0'
      setInput(input === '0' ? String(num) : input + String(num));
    }
  };

  // Function to handle operator button clicks
  const handleOperatorClick = (nextOperator) => {
    const inputValue = parseFloat(input);

    if (previousInput === null) {
      // If no previous input, set current input as previous and store the operator
      setPreviousInput(inputValue);
    } else if (operator) {
      // If there's a previous input and an operator, perform the calculation
      const result = calculate(previousInput, inputValue, operator);
      setInput(String(result));
      setPreviousInput(result); // Set the result as the new previous input
    }
    // Set the new operator and indicate waiting for the next number
    setOperator(nextOperator);
    setWaitingForNewNumber(true);
  };

  // Function to perform the actual calculation
  const calculate = (num1, num2, op) => {
    switch (op) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        // Handle division by zero
        if (num2 === 0) {
          return 'Error'; // Or handle as an actual error state
        }
        return num1 / num2;
      default:
        return num2; // Should not happen
    }
  };

  // Function to handle the equals button click
  const handleEqualsClick = () => {
    if (previousInput !== null && operator !== null) {
      const inputValue = parseFloat(input);
      const result = calculate(previousInput, inputValue, operator);
      setInput(String(result));
      setPreviousInput(null); // Reset previous input
      setOperator(null); // Reset operator
      setWaitingForNewNumber(true); // Ready for a new calculation
    }
  };

  // Function to handle the clear button click (AC - All Clear)
  const handleClearClick = () => {
    setInput('0');
    setPreviousInput(null);
    setOperator(null);
    setWaitingForNewNumber(false);
  };

  // Function to handle the decimal point button click
  const handleDecimalClick = () => {
    if (waitingForNewNumber) {
      // If waiting for a new number, start with "0."
      setInput('0.');
      setWaitingForNewNumber(false);
    } else if (!input.includes('.')) {
      // Add decimal only if not already present
      setInput(input + '.');
    }
  };

  // CSS for styling the calculator layout
  const calculatorStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: '"Inter", sans-serif', // Using Inter font
  };

  const cardStyle = {
    width: 320,
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    backgroundColor: '#ffffff',
  };

  const inputStyle = {
    height: '60px',
    fontSize: '2.5em',
    textAlign: 'right',
    marginBottom: '15px',
    borderRadius: '10px',
    backgroundColor: '#e9ecef',
    color: '#343a40',
    border: 'none',
    paddingRight: '15px',
  };

  const buttonStyle = {
    width: '100%',
    height: '60px',
    fontSize: '1.5em',
    borderRadius: '10px',
    margin: '5px 0',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.2s ease-in-out',
  };

  const operatorButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ff9500',
    borderColor: '#ff9500',
    color: '#ffffff',
  };

  const equalsButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    color: '#ffffff',
  };

  const clearButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    borderColor: '#dc3545',
    color: '#ffffff',
  };

  return (
    <div style={calculatorStyle}>
      <Card style={cardStyle}>
        {/* Calculator display input */}
        <Input
          value={input}
          readOnly
          style={inputStyle}
        />

        {/* Calculator buttons grid */}
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <Button style={clearButtonStyle} onClick={handleClearClick}>AC</Button>
          </Col>
          <Col span={6}>
            <Button style={buttonStyle} onClick={() => setInput(String(parseFloat(input) * -1))}>+/-</Button>
          </Col>
          <Col span={6}>
            <Button style={buttonStyle} onClick={() => setInput(String(parseFloat(input) / 100))}>%</Button>
          </Col>
          <Col span={6}>
            <Button style={operatorButtonStyle} onClick={() => handleOperatorClick('/')}>/</Button>
          </Col>

          <Col span={6}>
            <Button style={buttonStyle} onClick={() => handleNumberClick(7)}>7</Button>
          </Col>
          <Col span={6}>
            <Button style={buttonStyle} onClick={() => handleNumberClick(8)}>8</Button>
          </Col>
          <Col span={6}>
            <Button style={buttonStyle} onClick={() => handleNumberClick(9)}>9</Button>
          </Col>
          <Col span={6}>
            <Button style={operatorButtonStyle} onClick={() => handleOperatorClick('*')}>*</Button>
          </Col>

          <Col span={6}>
            <Button style={buttonStyle} onClick={() => handleNumberClick(4)}>4</Button>
          </Col>
          <Col span={6}>
            <Button style={buttonStyle} onClick={() => handleNumberClick(5)}>5</Button>
          </Col>
          <Col span={6}>
            <Button style={buttonStyle} onClick={() => handleNumberClick(6)}>6</Button>
          </Col>
          <Col span={6}>
            <Button style={operatorButtonStyle} onClick={() => handleOperatorClick('-')}>-</Button>
          </Col>

          <Col span={6}>
            <Button style={buttonStyle} onClick={() => handleNumberClick(1)}>1</Button>
          </Col>
          <Col span={6}>
            <Button style={buttonStyle} onClick={() => handleNumberClick(2)}>2</Button>
          </Col>
          <Col span={6}>
            <Button style={buttonStyle} onClick={() => handleNumberClick(3)}>3</Button>
          </Col>
          <Col span={6}>
            <Button style={operatorButtonStyle} onClick={() => handleOperatorClick('+')}>+</Button>
          </Col>

          <Col span={12}>
            <Button style={buttonStyle} onClick={() => handleNumberClick(0)}>0</Button>
          </Col>
          <Col span={6}>
            <Button style={buttonStyle} onClick={handleDecimalClick}>.</Button>
          </Col>
          <Col span={6}>
            <Button style={equalsButtonStyle} onClick={handleEqualsClick}>=</Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Calculater;

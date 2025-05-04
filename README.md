# React Calculator App 🧮

This is a simple **React Calculator App** built using functional components and the `useReducer` hook for state management. It supports basic arithmetic operations and simulates the behavior of a real calculator.

---

## 🚀 Features

- ✅ Add, subtract, multiply, and divide
- ✅ Clear and delete individual digits
- ✅ Handles decimal numbers
- ✅ Prevents invalid inputs (e.g. multiple decimals, leading zeros)
- ✅ Result formatting (e.g. 1,000 instead of 1000)
- ✅ Built using modular, reusable components

---

## 🧠 Technologies Used

- **React** (with `useReducer`)
- **JavaScript (ES6+)**
- **CSS** (grid layout for calculator interface)

---

## 🛠️ How It Works

The app uses the `useReducer` hook to manage calculator state through actions like:

- `ADD_DIGIT`
- `DELETE_DIGIT`
- `CHOOSE_OPERATION`
- `CLEAR`
- `EVALUATE`

Each button dispatches a corresponding action to update the calculator state accordingly. All arithmetic evaluation is handled inside a helper `evaluate()` function.

---


## ▶️ Getting Started

1. **Clone the repo**
   ```git clone https://github.com/aadimishraa/Calculator.git```
   ```cd Calculator```

2. **Install dependencies**
    ```npm install```

3. **Start the development server**
    ```npm start```

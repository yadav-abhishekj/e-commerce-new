# e-commerce Project

## Overview
This project is an e-commerce application built with React. It allows users to add items to a shopping cart, view the cart, and manage the items within it.

## Project Structure
```
e-commerce
├── src
│   ├── pages
│   │   └── Cart.jsx
│   ├── hooks
│   │   └── useCartHook.js
│   └── index.js
├── package.json
├── .husky
│   └── pre-commit
├── README.md
```

## Features
- **Cart Management**: Users can add, remove, and adjust the quantity of items in their cart.
- **Context API**: Utilizes React's Context API to manage cart state across components.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd e-commerce
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
- Start the application:
  ```
  npm start
  ```
- Open your browser and go to `http://localhost:3000` to view the application.

## Pre-commit Hook
This project uses Husky to enforce code quality checks before commits. Ensure that your code passes linting and tests before committing changes.

## Contributing
Feel free to submit issues or pull requests for any improvements or bug fixes.
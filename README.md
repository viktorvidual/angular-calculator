# Calculator

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.13.

It is a modular, component-driven calculator application that includes support for arithmetic operations, Modern Calculator UI with reusable calculator-button component, and service-based state management. It also features a calculation history feature.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## 🔧 Project Structure & Architecture

src/
└── app/
├── components/ # Reusable UI components
│ └── calculator-button/ # Styled calculator button component
├── pages/ # Route-level components (views)
│ ├── calculator/ # Main calculator screen (UI + logic)
│ └── history/ # History screen (view past calculations)
├── services/ # Application logic and state handling
│ ├── calculator/ # Calculator evaluation logic
│ └── history/ # History persistence and retrieval
├── app.component.\* # Root component
├── app.config.ts # Angular standalone component config
├── app.routes.ts # Application routes using provideRouter

## 🧠 Key Architectural Concepts

- **Component Isolation**: The main UI elements of the calculator - the button is encapsulated into self-contained components(`calculator-button`) with their own styles and custom @Inputs / Props

- **Service Layer**: The calculator logic (expression evaluation, error handling) is decoupled from the UI using Angular services. Here instead if using the buildin eval JS method, I used evaluation algorithm.

The history feature follows the same pattern, but it is interesting to note that the history service is also injected in the calculator service. This way, everytime a succesful calculation completes, it is saved to the current history.

- **Routing**: Navigation between Calculator and History is managed using `provideRouter()` with route-based code organization under `pages/`.

- **Testing**: Each service and component has a corresponding `.spec.ts` file for unit tests using Karma and Jasmine, but only the calculator service is tested extensively.

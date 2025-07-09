import ReactDOM from "react-dom/client";

const App = () => <h1>Hello from React Client!</h1>;

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);

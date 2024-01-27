import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navigation from "./navigation/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <>
        <Navigation />
        <ToastContainer />
      </>
    </BrowserRouter>
  );
}

export default App;

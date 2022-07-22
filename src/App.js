import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import {Home, Stock, Login, Register, NotFound} from "./pages"
import "./App.css"
import 'react-toastify/dist/ReactToastify.css';

import {StocksProvider, UserContext, UserProvider} from './contexts'


function App() {
  return (
    <>
    <StocksProvider>
      <UserProvider>
      <ToastContainer autoClose={1500} />
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element ={<Home/>}/>
        <Route path="/stock/:symbol" element ={<Stock/>}/>
        <Route path="/login" element = {<Login/>} />
        <Route path="/register" element = {<Register/>} />

        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
      </UserProvider>
    
    
    </StocksProvider>
    </>
    
    
  );
}

export default App;

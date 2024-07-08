import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import io from "socket.io-client";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import {  useSelector } from 'react-redux';
import { useEffect } from 'react';
import SocketContext from './context/SocketContext';


//socket io
const socket = io(`https://wappback.onrender.com/`);



function App() {
  
  

  const { user } = useSelector((state) => state.user);
  
  const token = user;



  
  return (
    <div>
    <SocketContext.Provider value={socket}>  
    <Router>
      <Routes>
        <Route 
          path='/' 
          element={<Home/>}
          // element={
          //   token ? <Home/> : <Navigate to="/"/>
          // }
        />
        <Route 
          path='/login'
          element={<Login/>} 
          // element={
          //   !token ? <Login/> : <Navigate to="/"/> 
          //   }
        />
        <Route 
          path='/register'
          element={<Register/>} 
          // element={
          //   !token ? <Register/> : <Navigate to="/"/>
          //   }
        />
      </Routes>
    </Router>
    </SocketContext.Provider>  
    </div>
  );
}

export default App;

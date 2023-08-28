import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register } from './Component/Register';
import { Home } from './Component/Home';
import { Login } from './Component/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

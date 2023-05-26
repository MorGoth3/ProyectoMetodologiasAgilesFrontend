import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Routes, Switch, Route} from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import Home from './components/pages/Home';
import Departments from './components/pages/Departments';
import Products from './components/pages/Products';
import Assign from './components/pages/Assign';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/products" element={<Products />}/>
          <Route path="/departments" element={<Departments />}/>
          <Route path="/assign" element={<Assign />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

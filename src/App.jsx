import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateTodo from './components/CreateTodo';
import HomePage from './components/HomePage';

function App() {
  return (
    <div >
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/create' element={<CreateTodo />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

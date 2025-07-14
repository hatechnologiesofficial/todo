import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateTodo from './components/CreateTodo';
import HomePage from './components/HomePage';
import EditTodo from './components/EditTodo';
import Calculater from './calculater/Calculater';
import CollBot from '@hammim-in/collbot-client';

function App() {
  return (
    <div >
      {/* <BrowserRouter>

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/create' element={<CreateTodo />} />
          <Route path='/edit/:indexId' element={<EditTodo/>}/>

        </Routes>
      </BrowserRouter> */}
      <Calculater/>
    </div>
  );
}

export default App;

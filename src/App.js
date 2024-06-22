
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ToDoHome from './Components/todo-home';
import TodoRegister from './Components/todo-register';
import ToDoLogin from './Components/todo-login';
import ToDoInvaild from './Components/ToDo-Invaild';
import TodoDashboard from './Components/todo-dashboard';
import TodoAddTask from './Components/todo-addtask';
import ToDoRemoveTask from './Components/todo-removetask';
import TodoEditTask from './Components/Todo-EditTask';
import Button from './Components/button';

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
      <header className=' '>
        <div className='text-center'>
        <Button/>
        <p className='text-center fs-5 fw-bold text-black my-5'>Add Your Appointments</p>
        </div>
        <div>
        
        </div>
      </header>
      <section>
        <div>
         <Routes>
         <Route path='/' element={<ToDoHome/>} />
          <Route path='register' element={<TodoRegister/>} />
          <Route path='login' element={<ToDoLogin/>} />
          <Route path='addtask' element={<TodoAddTask/>} />
          <Route path='removetask/:id' element={<ToDoRemoveTask/>} />
          <Route path='dashboard' element={<TodoDashboard/>} />
          <Route path='edit/:id' element={<TodoEditTask/>} />
          <Route path='error' element={<ToDoInvaild/>} />
         </Routes>
        </div>
      </section>
      </BrowserRouter>
    </div>
  );
}

export default App;

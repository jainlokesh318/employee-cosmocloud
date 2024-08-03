import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import EmployeeList from './components/EmployeeList';

function App() {
  return (
    <div className='text-gray-200 flex flex-col gap-4'>
      <h1 className='text-2xl uppercase'>Employee List</h1>
      <Router>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          {/* <Route path="/employees/:id" element={<EmployeeDetails />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </div>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import AddEmployee from './components/AddEmployee';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
        <Route path="/employee/add" element={<AddEmployee />} />
        <Route path="/employee/edit/:id" element={<AddEmployee />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App

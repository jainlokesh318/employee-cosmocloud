import { useState } from "react"
import { Employee } from "../models/employee"
import { deleteEmployee, fetchEmployees } from "../api/employee"

export function useEmployee(){
    const [employees, setEmployees] = useState<Employee[]>([])
    const [loading, setLoading] = useState(false)

    const fetchEmployeesData = async () => {
        setLoading(true);
        const res = await fetchEmployees();
        setEmployees(res.data)
        setLoading(false);
    }

    const deleteEmployeeData = async (id:string) => {
        await deleteEmployee(id);
        fetchEmployeesData();
    }

    return {fetchEmployeesData, deleteEmployeeData, employees, loading}
}
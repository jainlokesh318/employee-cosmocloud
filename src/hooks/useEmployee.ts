import { useState } from "react"
import { Employee } from "../models/employee"
import { deleteEmployee, fetchEmployee, fetchEmployees } from "../api/employee"

export function useEmployee() {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [loading, setLoading] = useState(false)

    const fetchEmployeesData = async () => {
        try {
            setLoading(true);
            const res = await fetchEmployees();
            setEmployees(res.data)
            setLoading(false);
        } catch (err) {
            setLoading(false);
            //TODO:- Add toast for the message
            console.log(err)
        }
    }

    const deleteEmployeeData = async (id: string) => {
        try {
            await deleteEmployee(id);
            fetchEmployeesData();
        } catch (err) {
            //TODO:- Add toast for the message
            console.log(err)
        }
    }

    const fetchEmployeeData = async (id: string) => {
        try {
            setLoading(true);
            const res = await fetchEmployee(id);
            setLoading(false);
            return res;
        }
        catch (err) {
            setLoading(false);
            //TODO:- Add toast for the message
            console.log(err)
        }
    }

    return { fetchEmployeesData, deleteEmployeeData, employees, loading, fetchEmployeeData }
}
import { useState } from "react"
import { Employee } from "../models/employee"
import { addEmployee, deleteEmployee, editEmployee, fetchEmployee, fetchEmployees } from "../api/employee"

type Page = {
    limit: number
    nextOffset: number
    previousOffset: number
    total: number
}

export function useEmployee() {
    //TODO:- Read employee from context 
    const [employees, setEmployees] = useState<Employee[]>([])
    const [pageDetails, setPageDetails] = useState<Page>({
        limit: 0,
        nextOffset: 0,
        previousOffset: 0,
        total: 0
    })
    const [loading, setLoading] = useState(false)

    const fetchEmployeesData = async (nextOffset?:number) => {
        try {
            setLoading(true);
            const res = await fetchEmployees(nextOffset ?? 0);
            setPageDetails(res.page)
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

    const addEmployeeData = async (newEmployee: Omit<Employee, '_id'>) => {
        try {
            setLoading(true);
            const res = await addEmployee(newEmployee);
            setLoading(false);
            return res;
        } catch (err) {
            setLoading(false);
            //TODO:- Add toast for the message
            console.log(err)
        }
    }

    const editEmployeeData = async (id: string, updatedEmployee: Omit<Employee, '_id'>) => {
        try {
            setLoading(true);
            const res = await editEmployee(id, updatedEmployee);
            setLoading(false);
            return res;
        } catch (err) {
            setLoading(false);
            //TODO:- Add toast for the message
            console.log(err)
        }
    }

    return { fetchEmployeesData, deleteEmployeeData, employees, loading, fetchEmployeeData, addEmployeeData, editEmployeeData, pageDetails }
}
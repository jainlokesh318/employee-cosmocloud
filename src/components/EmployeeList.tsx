import { useEffect, useState } from "react";
import { Employee } from "../models/employee";
import Loader from "./ui/Loader";
import { fetchEmployees } from "../api/employee";

export default function EmployeeList() {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [loading, setLoading] = useState(false)

    const setEmployeesData = async () => {
        setLoading(true);
        const res = await fetchEmployees();
        setEmployees(res.data)
        setLoading(false);
    }

    useEffect(() => {
        setEmployeesData();
    }, [])

    if (loading) {
        return <Loader />
    }

    if (employees.length == 0) {
        return <div>No Employees found</div>
    }

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Employee Id
                        </th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee => {
                            return (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {employee.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {employee._id}
                                    </td>
                                    <td className="px-6 py-4">
                                        <input type="checkbox" onClick={e => console.log(e)} />
                                    </td>
                                </tr>)
                        }
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
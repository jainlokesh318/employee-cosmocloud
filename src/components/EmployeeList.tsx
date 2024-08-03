import { useEffect } from "react";
import Loader from "./ui/Loader";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useEmployee } from "../hooks/useEmployee";
import { useNavigate } from "react-router-dom";

export default function EmployeeList() {
    const {fetchEmployeesData, employees, loading, deleteEmployeeData} = useEmployee()
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployeesData();
    }, [])

    if (loading) {
        return <Loader />
    }

    if (employees.length == 0) {
        return <div>No Employees found</div>
    }

    return (
        <div className="flex flex-col gap-4">
            <h1 className='text-2xl uppercase'>Employee List</h1>
            <table className="w-full text-sm text-left rtl:text-right hover:text-white text-gray-500 dark:text-gray-400">
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
                        employees.map(({_id, name}) => {
                            return (
                                <tr key={_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer" onClick={() => navigate(`/employee/${_id}`)}>
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        {name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {_id}
                                    </td>
                                    <td className="flex gap-2 px-6 py-4">
                                        <PencilIcon className="size-5 hover:text-gray-200" />
                                        <TrashIcon className="size-5 text-red-300 hover:text-red-500" onClick={() => deleteEmployeeData(_id)}/>
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
import { useEffect, useState } from "react";
import Loader from "./ui/Loader";

import { useEmployee } from "../hooks/useEmployee";
import { useNavigate, useParams } from "react-router-dom";
import { Employee } from "../models/employee";
import { getFirstTwoCharacters } from "../utils/HelperFunctions"
import { MapPinIcon } from "@heroicons/react/16/solid";

export default function EmployeeDetails() {
    const [employee, setEmployee] = useState<Employee>()
    const { fetchEmployeeData, loading, deleteEmployeeData } = useEmployee()
    const { id } = useParams();
    const navigate = useNavigate()

    const fetchData = async () => {
        if (id) {
            const res = await fetchEmployeeData(id);
            if (res) {
                setEmployee(res);
            }
        }
    }

    const handleDelete = async () => {
        if(employee){
            await deleteEmployeeData(employee._id)
            navigate('/');
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    if (loading) {
        return <Loader />
    }

    if (employee) {
        return (
            <div id="card" className="flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-between">
                    <div className="flex">
                        <div className="flex justify-center items-center dark:bg-stone-800 rounded-full h-12 w-12 uppercase font-bold text-gray-300">{getFirstTwoCharacters(employee.name)}</div>
                        <div className="ml-4">
                            <p className="font-bold">{employee.name}</p>
                            <p className="text-sm mt-1 text-gray-400">{employee._id}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <MapPinIcon className="size-5" />
                        <div className="w-40"> {[employee.address.line1, employee.address.city, employee.address.country, employee.address.zipcode].join(', ')}</div>
                    </div>
                </div>
                <div className="flex px-6 py-4 justify-between items-center">
                    {
                        employee.contactMethods.map((contactMethod) => {
                            return <div key={contactMethod.contact_method} className="flex gap-4 items-center">
                                <div>{contactMethod.contact_method} :</div>
                                <span>{contactMethod.value}</span>
                            </div>
                        })
                    }
                </div>
                <div className="px-6 py-4 border-t border-gray-700 flex justify-between">
                    <button type="button" className="focus:outline-none rounded-lg text-sm px-5 py-2.5 me-2 mb-2 border">Edit Details</button>
                    <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        )
    }

    return <div>No Employees found with id {`${id}`}</div>
}
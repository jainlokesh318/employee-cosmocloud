import { useEffect } from "react";
import Loader from "./ui/Loader";
import { ArrowLeftIcon, ArrowRightIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useEmployee } from "../hooks/useEmployee";
import { useNavigate } from "react-router-dom";

export default function EmployeeList() {
    const { fetchEmployeesData, employees, loading, deleteEmployeeData, pageDetails: { nextOffset, total, previousOffset } } = useEmployee()
    const navigate = useNavigate();

    const hasPreviousPage = previousOffset >= 0
    const hasNextPage = nextOffset < total

    const handlePrevPage = () => {
        if (hasPreviousPage) {
            fetchEmployeesData(previousOffset)
        }
    }

    const handleNextPage = () => {
        if (hasNextPage) {
            fetchEmployeesData(nextOffset)
        }
    }


    useEffect(() => {
        fetchEmployeesData();
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <div className="flex flex-col gap-4 text-sm">
            <div className="flex justify-between">
                <h1 className='text-2xl uppercase'>Employee List</h1>
                <button className="border flex items-center p-2 rounded-lg gap-2" onClick={() => navigate('/employee/add')}>
                    <PlusIcon className="size-5" />
                    <span>Add New Employee</span>
                </button>
            </div>
            <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-lg">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
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
                        employees.length == 0 ?
                            <div className="p-4">No Employees found</div> : employees.map(({ _id, name }) => {
                                return (
                                    <tr key={_id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:text-white cursor-pointer" onClick={() => navigate(`/employee/${_id}`)}>
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                            {name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {_id}
                                        </td>
                                        <td className="flex gap-2 px-6 py-4">
                                            <PencilIcon className="size-5 hover:text-gray-200" onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/employee/edit/${_id}`)
                                            }} />
                                            <TrashIcon className="size-5 text-red-300 hover:text-red-500" onClick={(e) => {
                                                e.stopPropagation();
                                                deleteEmployeeData(_id)
                                            }} />
                                        </td>
                                    </tr>)
                            }
                            )
                    }

                </tbody>
                <tfoot className="bg-gray-50 dark:bg-gray-800 w-full">
                    <tr>
                        <td className="px-4 py-2 w-full">
                            {`Showing ${nextOffset < total ? nextOffset : total} of ${total} entries `}
                        </td>
                        <td></td>
                        <td className="px-4 py-2 flex gap-2 text-right justify-end">
                            <ArrowLeftIcon className={`size-5 ${hasPreviousPage ? 'text-white cursor-pointer' : 'text-gray-600 cursor-not-allowed'}`} onClick={handlePrevPage} />
                            <ArrowRightIcon className={`size-5 ${hasNextPage ? 'text-white cursor-pointer' : 'text-gray-600 cursor-not-allowed'}`} onClick={handleNextPage} />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>

    )
}
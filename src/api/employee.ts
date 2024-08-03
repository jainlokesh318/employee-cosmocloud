import { Employee } from "../models/employee";
import api from "./axios";

export const fetchEmployees = async () => {
    try {
        const res = await api.get(`/employee?offset=0&limit=5`)
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const deleteEmployee = async (id: string) => {
    const payload = {};
    try {
        const res = await api.delete(`/employee/${id}`, { data: payload })
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const fetchEmployee = async (id: string) => {
    try {
        const res = await api.get(`/employee/${id}`)
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const addEmployee = async (newEmployee: Omit<Employee, '_id'>) => {
    try {
        const res = await api.post(`/employee`, newEmployee)
        return res.data;
    } catch (err) {
        throw err;
    }
};
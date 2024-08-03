import api from "./axios";

export const fetchEmployees = async () => {
    try{
        const res = await api.get(`/employee?offset=0&limit=5`)
        return res.data;
    }catch(err){
        throw err;
    }
};
import axios from './customize-axios'
const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
}
const postCreateUser = (name, job) => {
    return axios.post("/api/users", { name, job });
}
const updateInfoUser = (id, name, job) => {
    return axios.put(`/api/users/${id}`, { name, job });
}
const deleteUser = (id) => {
    return axios.delete(`api/users/${id}`);
}
export { fetchAllUser, postCreateUser, updateInfoUser, deleteUser };
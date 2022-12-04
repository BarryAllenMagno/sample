import axios from 'axios';

const url = "http://localhost:3001";

export default class TodoApp {
    static async getAll() {
       return await axios.get(url); 
    }

    static async add(todoApp) {
        return await axios.post(url, todoApp);
    }

    static async edit(todoApp) {
        return await axios.put(url, todoApp);
    }

    static async delete(id) {
        var data = { _id: id };
        return await axios.delete(url, { data: data });
    }
}
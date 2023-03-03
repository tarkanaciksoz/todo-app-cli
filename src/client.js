import axios from 'axios'

export class client {
    constructor (url) {
        if (url === undefined || url === "") {
            url = process.env.VUE_APP_API_URL
        }
        
        this.url = url
    }

    completeUrl(path) {
        return `${this.url}${path}`
    }
    
    async getTodosRequest() {
        return axios.get(this.completeUrl('/v1/todo/getTodos')).then(r => r.data)
    }

    async createTodoRequest(todo) {
        return axios.post(this.completeUrl('/v1/todo/createTodo'), 
        JSON.stringify({
            id: todo.id,
            value: todo.value,
            marked: todo.marked,
        }),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(r => r.data)
    }

    async markTodoRequest(todo) {
        return axios.put(this.completeUrl('/v1/todo/markTodo/' + todo.id)).then(r => r.data)
    }

    async deleteTodoRequest(todo) {
        return axios.delete(this.completeUrl('/v1/todo/deleteTodo/' + todo.id)).then(r => r.data)
    }
}

export default new client(process.env.VUE_APP_API_URL)
//export default client
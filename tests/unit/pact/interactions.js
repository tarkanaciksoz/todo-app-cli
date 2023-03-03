const { eachLike, boolean, string, integer, like } = require('@pact-foundation/pact').Matchers

const getTodosRequestTodoObject = {
    id: integer(1),
    value: string('buy some milk'),
    marked: integer(0),
}

const getTodosRequestExpectedResponse = {
    success: boolean(true),
    message: string('Todos Listed Successfully'),
    data: eachLike(getTodosRequestTodoObject),
    code: integer(200),
}

export const getTodosRequest = {
    interaction: {
        state: 'Provider has a todo',
        uponReceiving: 'a GET request to provider to get todo list',
        withRequest: {
            method: 'GET',
            path: '/v1/todo/getTodos',
        },
        willRespondWith: {
            status: 200,
            body: getTodosRequestExpectedResponse,
        },
    },
    response: getTodosRequestExpectedResponse,
    todoObject: {},
}


const createTodoObject = {
    id: integer(1),
    value: string('buy some milk'),
    marked: integer(0),
}

const createTodoRequestExpectedResponse = {
    success: boolean(true),
    message: string('Todo Created Successfully'),
    data: like(createTodoObject),
    code: integer(200),
}

export const createTodoRequest = {
    interaction: {
        state: 'Provider waiting request to create a todo',
        uponReceiving: 'a POST request to provider to create new todo',
        withRequest: {
            method: 'POST',
            path: '/v1/todo/createTodo',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createTodoObject),
        },
        willRespondWith: {
            status: 200,
            body: createTodoRequestExpectedResponse,
        },
    },
    response: createTodoRequestExpectedResponse,
    todoObject: createTodoObject,
}


const markTodoRequestTodoObject = {
    id: integer(1),
    value: string('buy some milk'),
    marked: integer(0),
}
const markTodoResponseTodoObject = {
    id: integer(1),
    value: string('buy some milk'),
    marked: integer(1),
}
const markTodoRequestExpectedResponse = {
    success: boolean(true),
    message: string('Todo Marked Successfully'),
    data: like(markTodoResponseTodoObject),
    code: integer(200),
}
export const markTodoRequest = {
    interaction: {
        state: 'Provider has todo to mark',
        uponReceiving: 'a PUT request to mark todo',
        withRequest: {
            method: 'PUT',
            path: '/v1/todo/markTodo/' + markTodoRequestTodoObject.id.value,
        },
        willRespondWith: {
            status: 200,
            body: markTodoRequestExpectedResponse,
        },
    },
    response: markTodoRequestExpectedResponse,
    todoObject: markTodoRequestTodoObject,
}

const deleteTodoRequestTodoObject = {
    id: integer(1),
    value: string('buy some milk'),
    marked: integer(0),
}
const deleteTodoRequestExpectedResponse = {
    success: boolean(true),
    message: string('Todo Deleted Successfully'),
    data: like({}),
    code: integer(200),
}
export const deleteTodoRequest = {
    interaction: {
        state: 'Provider has todo to delete',
        uponReceiving: 'a DELETE request to delete todo',
        withRequest: {
            method: 'DELETE',
            path: '/v1/todo/deleteTodo/' + deleteTodoRequestTodoObject.id.value,
        },
        willRespondWith: {
            status: 200,
            body: deleteTodoRequestExpectedResponse,
        },
    },
    response: deleteTodoRequestExpectedResponse,
    todoObject: deleteTodoRequestTodoObject,
}
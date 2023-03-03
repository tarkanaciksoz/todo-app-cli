import client from '@/client'

import axios from 'axios'
jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({
        data: {}, 
        status: 200,
    })),
    post: jest.fn(() => Promise.resolve({
        data: {}, 
        status: 200,
    })),
    put: jest.fn(() => Promise.resolve({
        data: {}, 
        status: 200,
    })),
    delete: jest.fn(() => Promise.resolve({
        data: {}, 
        status: 200,
    })),
}))

describe('client.getTodoRequest', () => {
    test('GivenEmptyTodoListWhenGetTodoRequestIsCalledThenItShouldReturnEmptyTodoList', async () => {
        const givenTodoList = []

        const expectedGetTodoResponse = {
            success: true, 
            message: 'Todos Listed Successfully', 
            data: givenTodoList,
            code: 200,
        }

        axios.get.mockImplementationOnce(() => Promise.resolve({
            status: 200,
            data: expectedGetTodoResponse,
        }))

        const actualGetTodoResponse = await client.getTodosRequest()
        expect(actualGetTodoResponse.success).toEqual(expectedGetTodoResponse.success)
        expect(actualGetTodoResponse.message).toEqual(expectedGetTodoResponse.message)
        expect(actualGetTodoResponse.data).toEqual(expectedGetTodoResponse.data)
        expect(actualGetTodoResponse.data.length).toEqual(expectedGetTodoResponse.data.length)
        expect(actualGetTodoResponse.code).toEqual(expectedGetTodoResponse.code)
    })
    test('GivenTodoListWith2TodosWhenGetTodoRequestIsCalledThenItShouldReturnTodoListWith2Todos', async () => {
        const givenTodoList = [
            {
                id: 1,
                value: 'buy some milk',
                marked: 0,
            },
            {
                id: 2,
                value: 'enjoy the assignment',
                marked: 0,
            },
        ]

        const expectedGetTodoResponse = {
            success: true, 
            message: 'Todos Listed Successfully', 
            data: givenTodoList,
            code: 200,
        }

        axios.get.mockImplementationOnce(() => Promise.resolve({
            status: 200,
            data: expectedGetTodoResponse,
        }))

        const actualGetTodoResponse = await client.getTodosRequest()
        expect(actualGetTodoResponse.success).toEqual(expectedGetTodoResponse.success)
        expect(actualGetTodoResponse.message).toEqual(expectedGetTodoResponse.message)
        expect(actualGetTodoResponse.data).toEqual(expectedGetTodoResponse.data)
        expect(actualGetTodoResponse.data.length).toEqual(expectedGetTodoResponse.data.length)
        expect(actualGetTodoResponse.code).toEqual(expectedGetTodoResponse.code)
    })
})

describe('client.createTodoRequest', () => {
    test('GivenTodoWhenCreateTodoRequestIsCalledThenItShouldReturnCreatedTodo', async () => {
        const givenTodo = {
            id: 1,
            value: 'buy some milk',
            marked: 0,
        }

        const expectedCreateTodoResponse = {
            success: true, 
            message: 'Todo Created Successfully', 
            data: givenTodo,
            code: 200,
        }

        axios.post.mockImplementationOnce(() => Promise.resolve({
            status: 200,
            data: expectedCreateTodoResponse,
        }))

        const actualCreateTodoResponse = await client.createTodoRequest(givenTodo)
        expect(actualCreateTodoResponse.success).toEqual(expectedCreateTodoResponse.success)
        expect(actualCreateTodoResponse.message).toEqual(expectedCreateTodoResponse.message)
        expect(actualCreateTodoResponse.data).toEqual(expectedCreateTodoResponse.data)
        expect(actualCreateTodoResponse.code).toEqual(expectedCreateTodoResponse.code)
    })
    test('GivenTodoWithAlreadyExistingTodoIdWhenCreateTodoRequestIsCalledThenItShouldReturnCreatedTodoWithNewTodoId', async () => {
        const givenTodo = {
            id: 1,
            value: 'enjoy the assignment',
            marked: 0,
        }

        const expectedCreateTodoResponse = {
            success: true, 
            message: 'Todo Created Successfully', 
            data: {
                id: 2,
                value: 'enjoy the assignment',
                marked: 0,
            },
            code: 200,
        }

        axios.post.mockImplementationOnce(() => Promise.resolve({
            status: 200,
            data: expectedCreateTodoResponse,
        }))

        const actualCreateTodoResponse = await client.createTodoRequest(givenTodo)
        expect(actualCreateTodoResponse.success).toEqual(expectedCreateTodoResponse.success)
        expect(actualCreateTodoResponse.message).toEqual(expectedCreateTodoResponse.message)
        expect(actualCreateTodoResponse.data).toEqual(expectedCreateTodoResponse.data)
        expect(actualCreateTodoResponse.code).toEqual(expectedCreateTodoResponse.code)
    })
})

describe('client.markTodoRequest', () => {
    test('GivenUnMarkedTodoWhenMarkTodoRequestIsCalledThenItShouldReturnTodoAsMarked', async () => {
        const givenTodo = {
            id: 1,
            value: 'buy some milk',
            marked: 0,
        }

        const expectedMarkTodoResponse = {
            success: true, 
            message: 'Todo Marked Successfully', 
            data: {
                id: 1,
                value: 'buy some milk',
                marked: 1,
            },
            code: 200,
        }

        axios.put.mockImplementationOnce(() => Promise.resolve({
            status: 200,
            data: expectedMarkTodoResponse,
        }))

        const actualMarkTodoResponse = await client.markTodoRequest(givenTodo)
        expect(actualMarkTodoResponse.success).toEqual(expectedMarkTodoResponse.success)
        expect(actualMarkTodoResponse.message).toEqual(expectedMarkTodoResponse.message)
        expect(actualMarkTodoResponse.data).toEqual(expectedMarkTodoResponse.data)
        expect(actualMarkTodoResponse.data.marked).toEqual(expectedMarkTodoResponse.data.marked)
        expect(actualMarkTodoResponse.code).toEqual(expectedMarkTodoResponse.code)
    })
    test('GivenMarkedTodoWhenMarkTodoRequestIsCalledThenItShouldReturnTodoAsUnMarked', async () => {
        const givenTodo = {
            id: 1,
            value: 'buy some milk',
            marked: 1,
        }

        const expectedMarkTodoResponse = {
            success: true, 
            message: 'Todo Marked Successfully', 
            data: {
                id: 1,
                value: 'buy some milk',
                marked: 0,
            },
            code: 200,
        }

        axios.put.mockImplementationOnce(() => Promise.resolve({
            status: 200,
            data: expectedMarkTodoResponse,
        }))

        const actualMarkTodoResponse = await client.markTodoRequest(givenTodo)
        expect(actualMarkTodoResponse.success).toEqual(expectedMarkTodoResponse.success)
        expect(actualMarkTodoResponse.message).toEqual(expectedMarkTodoResponse.message)
        expect(actualMarkTodoResponse.data).toEqual(expectedMarkTodoResponse.data)
        expect(actualMarkTodoResponse.data.marked).toEqual(expectedMarkTodoResponse.data.marked)
        expect(actualMarkTodoResponse.code).toEqual(expectedMarkTodoResponse.code)
    })
    test('GivenUnExistingTodoAsUnMarkedWhenMarkTodoRequestIsCalledThenItShouldReturnNoTodoFoundWithIdError', async () => {
        const givenTodo = {
            id: 1,
            value: 'buy some milk',
            marked: 0,
        }

        const expectedMarkTodoResponse = {
            success: false, 
            message: 'no todo found with id:1', 
            data: {},
            code: 400,
        }

        axios.put.mockImplementationOnce(() => Promise.resolve({
            status: 200,
            data: expectedMarkTodoResponse,
        }))

        const actualMarkTodoResponse = await client.markTodoRequest(givenTodo)
        expect(actualMarkTodoResponse.success).toEqual(expectedMarkTodoResponse.success)
        expect(actualMarkTodoResponse.message).toEqual(expectedMarkTodoResponse.message)
        expect(actualMarkTodoResponse.data).toEqual(expectedMarkTodoResponse.data)
        expect(actualMarkTodoResponse.code).toEqual(expectedMarkTodoResponse.code)
    })
    test('GivenUnExistingTodoAsMarkedWhenMarkTodoRequestIsCalledThenItShouldReturnNoTodoFoundWithIdError', async () => {
        const givenTodo = {
            id: 1,
            value: 'buy some milk',
            marked: 1,
        }

        const expectedMarkTodoResponse = {
            success: false, 
            message: 'no todo found with id:1', 
            data: {},
            code: 400,
        }

        axios.put.mockImplementationOnce(() => Promise.resolve({
            status: 200,
            data: expectedMarkTodoResponse,
        }))

        const actualMarkTodoResponse = await client.markTodoRequest(givenTodo)
        expect(actualMarkTodoResponse.success).toEqual(expectedMarkTodoResponse.success)
        expect(actualMarkTodoResponse.message).toEqual(expectedMarkTodoResponse.message)
        expect(actualMarkTodoResponse.data).toEqual(expectedMarkTodoResponse.data)
        expect(actualMarkTodoResponse.code).toEqual(expectedMarkTodoResponse.code)
    })
})

describe('client.deleteTodoRequest', () => {
    test('GivenTodoWhenDeleteTodoRequestIsCalledThenItShouldReturnTodoDeletedSuccessfullyMessage', async () => {
        const givenTodo = {
            id: 1,
            value: 'buy some milk',
            marked: 0,
        }

        const expectedDeleteTodoResponse = {
            success: true, 
            message: 'Todo Deleted Successfully', 
            data: {},
            code: 200,
        }

        axios.delete.mockImplementationOnce(() => Promise.resolve({
            status: 200,
            data: expectedDeleteTodoResponse,
        }))

        const actualDeleteTodoResponse = await client.deleteTodoRequest(givenTodo)
        expect(actualDeleteTodoResponse.success).toEqual(expectedDeleteTodoResponse.success)
        expect(actualDeleteTodoResponse.message).toEqual(expectedDeleteTodoResponse.message)
        expect(actualDeleteTodoResponse.data).toEqual(expectedDeleteTodoResponse.data)
        expect(actualDeleteTodoResponse.data.length).toEqual(expectedDeleteTodoResponse.data.length)
        expect(actualDeleteTodoResponse.code).toEqual(expectedDeleteTodoResponse.code)
    })
    test('GivenUnExistingTodoWhenDeleteTodoRequestIsCalledThenItShouldReturnNoTodoFoundWithIdError', async () => {
        const givenTodo = {
            id: 1,
            value: 'buy some milk',
            marked: 0,
        }

        const expectedDeleteTodoResponse = {
            success: false,
            message: 'no todo found with id:',
            data: {},
            code: 400,
        }

        axios.delete.mockImplementationOnce(() => Promise.resolve({
            status: 200,
            data: expectedDeleteTodoResponse,
        }))

        const actualDeleteTodoResponse = await client.deleteTodoRequest(givenTodo)
        expect(actualDeleteTodoResponse.success).toEqual(expectedDeleteTodoResponse.success)
        expect(actualDeleteTodoResponse.message).toEqual(expectedDeleteTodoResponse.message)
        expect(actualDeleteTodoResponse.data).toEqual(expectedDeleteTodoResponse.data)
        expect(actualDeleteTodoResponse.data.length).toEqual(expectedDeleteTodoResponse.data.length)
        expect(actualDeleteTodoResponse.code).toEqual(expectedDeleteTodoResponse.code)
    })
})
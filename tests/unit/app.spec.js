import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

import client from '@/client'
jest.mock('@/client', () => ({
    getTodosRequest: jest.fn(() => Promise.resolve({
        success: false,
        message: '',
        data: {}, 
        code: 200,
    })),
    createTodoRequest: jest.fn(() => Promise.resolve({
        success: false,
        message: '',
        data: {},
        code: 200, 
    })),
    markTodoRequest: jest.fn(() => Promise.resolve({
        success: false,
        message: '',
        data: {},
        code: 200, 
    })),
    deleteTodoRequest: jest.fn(() => Promise.resolve({
        success: false,
        message: '',
        data: {},
        code: 200, 
    })),
}))

describe('App.vue', () => {
    describe('App.getTodos', () => {
        test('GivenEmptyTodoListWhenGetTodosIsCalledThenTodoListShouldBeEmpty', async () => {
            const wrapper = shallowMount(App)

            const givenTodoList = []

            const expectedGetTodoResponse = {
                success: true,
                message: 'Todos Listed Successfully',
                data: givenTodoList,
                code: 200,
            }
    
            client.getTodosRequest.mockImplementationOnce(() => Promise.resolve(expectedGetTodoResponse))
            
            await wrapper.vm.getTodos()

            expect(wrapper.vm.todoList.length).toBe(0)
            expect(client.getTodosRequest).toBeCalled()
        })
        test('GivenTodoListWith2TodosWhenGetTodosIsCalledThenTodoListShouldHave2Todos', async () => {
            const wrapper = shallowMount(App)

            const givenTodoList = [
                {
                    id: 1,
                    value: "buy some milk",
                    marked: 0,
                },
                {
                    id: 2,
                    value: "enjoy the assignment",
                    marked: 0,
                },
            ]

            const expectedGetTodoResponse = {
                success: true,
                message: 'Todos Listed Successfully',
                data: givenTodoList,
                code: 200,
            }
    
            client.getTodosRequest.mockImplementationOnce(() => Promise.resolve(expectedGetTodoResponse))
            
            await wrapper.vm.getTodos()
            
            expect(wrapper.vm.todoList.length).toBe(2)
            expect(wrapper.vm.todoList[0].id).toBe(1)
            expect(wrapper.vm.todoList[1].id).toBe(2)
            expect(client.getTodosRequest).toBeCalled()
        })
    })

    describe('App.addTodo', () => {
        test('GivenEmptyTodoInputWhenAddTodoIsCalledThenItShouldReturn', async () => {
            const wrapper = shallowMount(App)
            
            await wrapper.vm.addTodo()

            expect(wrapper.vm.todoList.length).toBe(0)
        })
        test('GivenTodoInputWithBuySomeMilkWhenAddTodosIsCalledThenCreatedTodoShouldBeInTodoList', async () => {
            const wrapper = shallowMount(App)

            wrapper.vm.todoInput = 'buy some milk'

            const givenTodo = {
                id: 1,
                value: 'buy some milk',
                marked: 0,
            }

            const expectedAddTodoResponse = {
                success: true,
                message: 'Todo Created Successfully',
                data: givenTodo,
                code: 200,
            }
    
            client.createTodoRequest.mockImplementationOnce(() => Promise.resolve(expectedAddTodoResponse))
            
            await wrapper.vm.addTodo()
            
            expect(wrapper.vm.todoList.length).toBe(1)
            expect(wrapper.vm.todoList[0].id).toBe(givenTodo.id)
            expect(wrapper.vm.todoList[0].value).toBe(givenTodo.value)
            expect(client.createTodoRequest).toBeCalled()
        })
        test('GivenTodoInputWithEnjoyTheAssignmentAndExistingIdWhenAddTodosIsCalledThenCreatedTodoWithNewIdShouldBeInTodoList', async () => {
            const wrapper = shallowMount(App)

            wrapper.vm.todoInput = 'enjoy the assignment'

            const givenTodo = {
                id: 1,
                value: 'enjoy the assignment',
                marked: 0,
            }

            const expectedTodoResponse = {
                id: 2,
                value: 'enjoy the assignment',
                marked: 0,
            }

            const expectedAddTodoResponse = {
                success: true,
                message: 'Todo Created Successfully',
                data: expectedTodoResponse,
                code: 200,
            }
    
            client.createTodoRequest.mockImplementationOnce(() => Promise.resolve(expectedAddTodoResponse))
            
            await wrapper.vm.addTodo()
            
            expect(wrapper.vm.todoList.length).toBe(1)
            expect(wrapper.vm.todoList[0].id).toBe(2)
            expect(wrapper.vm.todoList[0].value).toBe(givenTodo.value)
            expect(client.createTodoRequest).toBeCalled()
        })
    })

    describe('App.markTodo', () => {
        test('GivenUnMarkedTodoIndexWhenMarkTodosIsCalledThenTodoShouldBeUpdatedAsMarked', async () => {
            const wrapper = shallowMount(App)

            const givenTodoIndex = 0

            const givenTodo = {
                id: 1,
                value: 'buy some milk',
                marked: 0,
            }

            wrapper.vm.todoList[givenTodoIndex] = givenTodo

            const expectedMarkTodo = {
                id: 1,
                value: 'buy some milk',
                marked: 1,
            }

            const expectedMarkTodoResponse = {
                success: true,
                message: 'Todo Marked Successfully',
                data: expectedMarkTodo,
                code: 200,
            }
    
            client.markTodoRequest.mockImplementationOnce(() => Promise.resolve(expectedMarkTodoResponse))
            
            await wrapper.vm.markTodo(givenTodoIndex)

            expect(wrapper.vm.todoList[givenTodoIndex].marked).toBe(1)
            expect(client.markTodoRequest).toBeCalled()
        })
        test('GivenMarkedTodoIndexWhenMarkTodosIsCalledThenTodoShouldBeUpdatedAsUnMarked', async () => {
            const wrapper = shallowMount(App)

            const givenTodoIndex = 0

            const givenTodo = {
                id: 1,
                value: 'buy some milk',
                marked: 1,
            }

            wrapper.vm.todoList[givenTodoIndex] = givenTodo

            const expectedMarkTodo = {
                id: 1,
                value: 'buy some milk',
                marked: 0,
            }

            const expectedMarkTodoResponse = {
                success: true,
                message: 'Todo Marked Successfully',
                data: expectedMarkTodo,
                code: 200,
            }
    
            client.markTodoRequest.mockImplementationOnce(() => Promise.resolve(expectedMarkTodoResponse))
            
            await wrapper.vm.markTodo(givenTodoIndex)

            expect(wrapper.vm.todoList[givenTodoIndex].marked).toBe(0)
            expect(client.markTodoRequest).toBeCalled()
        })
    })
    
    describe('App.deleteTodo', () => {
        test('GivenTodoListWithOneTodoWhenDeleteTodosIsCalledWithTodoIndexThenTodoListShouldBeEmpty', async () => {
            const wrapper = shallowMount(App)

            const givenTodoIndex = 0

            const givenTodo = {
                id: 1,
                value: 'buy some milk',
                marked: 0,
            }

            wrapper.vm.todoList[givenTodoIndex] = givenTodo

            const expectedDeleteTodoResponse = {
                success: true,
                message: 'Todo Deleted Successfully',
                data: {},
                code: 200,
            }
    
            client.deleteTodoRequest.mockImplementationOnce(() => Promise.resolve(expectedDeleteTodoResponse))
            
            await wrapper.vm.deleteTodo(givenTodoIndex)

            expect(wrapper.vm.todoList.length).toBe(0)
            expect(client.deleteTodoRequest).toBeCalled()
        })
        test('GivenTodoListWithTwoTodosWhenDeleteTodosIsCalledWithTodoIndexThenTodoListShouldHaveOneTodo', async () => {
            const wrapper = shallowMount(App)

            const givenTodoIndex = 0

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

            wrapper.vm.todoList = givenTodoList

            const expectedDeleteTodoResponse = {
                success: true,
                message: 'Todo Deleted Successfully',
                data: {},
                code: 200,
            }
    
            client.deleteTodoRequest.mockImplementationOnce(() => Promise.resolve(expectedDeleteTodoResponse))
            
            await wrapper.vm.deleteTodo(givenTodoIndex)

            expect(wrapper.vm.todoList.length).toBe(1)
            expect(client.deleteTodoRequest).toBeCalled()
        })
    })
})
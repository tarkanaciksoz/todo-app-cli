import { pactWith } from 'jest-pact'
import { client } from '@/client'
import { getTodosRequest, createTodoRequest, markTodoRequest, deleteTodoRequest } from './interactions'

pactWith({
  consumer: 'todo-app-cli',
  provider: 'todo-app-api'
},(provider) => {
    describe('client.GetTodosRequest', () => {
      beforeEach(() => {
        return provider.addInteraction(getTodosRequest.interaction)
      })

      it('Given empty TodoList When getTodosRequest is called Then it should return todo list response', async () => {
        const api = new client(provider.mockService.baseUrl)
        expect(await api.getTodosRequest())
      })
    })

    describe('client.createTodoRequest', () => {
      beforeEach(() => {
        return provider.addInteraction(createTodoRequest.interaction)
      })

      it('Given Todo When createTodoRequest is called Then it should return new todo response', async () => {
        const api = new client(provider.mockService.baseUrl)
        
        const todo = createTodoRequest.todoObject
        todo.id = todo.id.value
        todo.value = todo.value.value
        todo.marked = todo.marked.value

        expect(await api.createTodoRequest(todo))
      })
    })

    describe('client.markTodoRequest', () => {
      beforeEach(() => {
        return provider.addInteraction(markTodoRequest.interaction)
      })

      it('Given Todo When markTodoRequest is called Then it should return todo with marked response', async () => {
        const api = new client(provider.mockService.baseUrl)

        const todo = markTodoRequest.todoObject
        todo.id = todo.id.value
        todo.value = todo.value.value
        todo.marked = todo.marked.value

        expect(await api.markTodoRequest(todo))
      })
    })

    describe('client.deleteTodoRequest', () => {
      beforeEach(() => {
        return provider.addInteraction(deleteTodoRequest.interaction)
      })

      it('Given Todo When deleteTodoRequest is called Then it should return todo deleted successfully response', async () => {
        const api = new client(provider.mockService.baseUrl)

        const todo = deleteTodoRequest.todoObject
        todo.id = todo.id.value
        todo.value = todo.value.value
        todo.marked = todo.marked.value

        expect(await api.deleteTodoRequest(todo))
      })
    })
  }
)
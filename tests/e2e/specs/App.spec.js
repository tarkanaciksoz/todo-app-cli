describe('Web Based Todo Application Entegration Test', () => {
  it('Visits the app', () => {
    cy.intercept({
      method: 'GET',
      url: '/v1/todo/getTodos',
    },
    {
      'success': true,
      'message': 'Todos Listed Successfully',
      'data': [],
      'code': 200,
    }).as('getTodo')

    cy.visit('/')
    cy.contains('h1', 'TODO LIST APPLICATION')
  })
  it('Given empty TodoList, When I write "buy some milk" to text ox and click to ADD button, Then I should see "buy some milk" item in TodoList', () => {
    cy.intercept({
      method: 'POST',
      url: '/v1/todo/createTodo',
    },
    {
      'success': true,
      'message': 'Todo Created Successfully',
      'data': {
          'id': 1,
          'value': 'buy some milk',
          'marked': 0
      },
      'code': 200,
    }).as('createTodo')

    cy.get('#todo-input').type('buy some milk')
    cy.get('#add-todo-button').click()
    cy.get('#todo-list').contains('buy some milk')
    cy.get('#todo-input').empty
  })
  it('Given TodoList with "buy some milk" item, When I write "enjoy the assignment" to text box and click to ADD button, Then I should see "enjoy the assigment" item inserted to TodoList below "buy some milk" item', () => {
    cy.intercept({
      method: 'POST',
      url: '/v1/todo/createTodo',
    },
    {
      'success': true,
      'message': 'Todo Created Successfully',
      'data': {
          'id': 2,
          'value': 'enjoy the assignment',
          'marked': 0
      },
      'code': 200,
    }).as('createTodo')

    cy.get('#todo-input').type('enjoy the assignment')
    cy.get('#add-todo-button').click()
    cy.get('#todo-list').find('.todo').should('have.length', 2)
  })
  it('Given TodoList with "buy some milk" item, When I click on "buy some milk" text, Then I should see "buy some milk" item marked', () => {
    cy.intercept({
      method: 'PUT',
      url: '/v1/todo/markTodo/1',
    },
    {
      'success': true,
      'message': 'Todo Marked Successfully',
      'data': {
          'id': 1,
          'value': 'buy some milk',
          'marked': 1
      },
      'code': 200,
    }).as('markTodo')

    cy.get('#todo-list').contains('buy some milk').click()
    cy.get('#todo-list').contains('buy some milk').should('have.css', 'text-decoration', 'line-through solid rgb(44, 62, 80)')
  })
  it('Given TodoList with marked "buy some milk item", When I click on marked "buy some milk" text, Then I should see mark of "buy some milk" item should be unmarked', () => {
    cy.intercept({
      method: 'PUT',
      url: '/v1/todo/markTodo/1',
    },
    {
      'success': true,
      'message': 'Todo Marked Successfully',
      'data': {
          'id': 1,
          'value': 'buy some milk',
          'marked': 0
      },
      'code': 200,
    }).as('markTodo')

    cy.get('#todo-list').contains('buy some milk').click()
    cy.get('#todo-list').contains('buy some milk').should('have.css', 'text-decoration', 'none solid rgb(44, 62, 80)')
  })
  it('Given TodoList with "rest for a while" item, When I click on delete button next to "rest for a while" item, Then I should see the List as empty', () => {
    cy.intercept({
      method: 'GET',
      url: '/v1/todo/getTodos',
    },
    {
      'success': true,
      'message': 'Todos Listed Successfully',
      'data': [
        {
          id: 1,
          value:'rest for a while',
          marked: 0,
        }
      ],
      'code': 200,
    }).as('getTodo')
    cy.intercept({
      method: 'DELETE',
      url: '/v1/todo/deleteTodo/1',
    },
    {
      'success': true,
      'message': 'Todo Deleted Successfully',
      'data': {},
      'code': 200,
    }).as('deleteTodo')

    cy.visit('/')

    cy.get('#todo-list').contains('rest for a while')
    cy.get('#delete-todo-1').click()
    cy.get('#todo-list').find('.todo').should('have.length', 0)
  })
  it('Given TodoList with with "rest for a while" and "drink water" item in order, When I click on delete button next to "rest for a while" item, Then I should see "drink water" item in ToDo list', () => {
    cy.intercept({
      method: 'GET',
      url: '/v1/todo/getTodos',
    },
    {
      'success': true,
      'message': 'Todos Listed Successfully',
      'data': [
        {
          id: 1,
          value:'rest for a while',
          marked: 0,
        },
        {
          id: 2,
          value:'drink water',
          marked: 0,
        },
      ],
      'code': 200,
    }).as('getTodo')

    cy.intercept({
      method: 'DELETE',
      url: '/v1/todo/deleteTodo/1',
    },
    {
      'success': true,
      'message': 'Todo Deleted Successfully',
      'data': {},
      'code': 200,
    }).as('deleteTodo')

    cy.visit('/')

    cy.get('#todo-list').contains('rest for a while')
    cy.get('#todo-list').contains('drink water')
    cy.get('#todo-list').find('.todo').should('have.length', 2)

    cy.get('#delete-todo-1').click()
    cy.get('#todo-list').contains('drink water')
    cy.get('#todo-list').find('.todo').should('have.length', 1)
  })
})

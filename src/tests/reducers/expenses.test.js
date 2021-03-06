import expensesReducer from '../../store/reducers/expenses'
import expenses from '../fixtures/expenses'

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual([])
})

test('should set add an expense', () => {
  const expense = { id: 4, description: 'Bike', amount: 300, createdAt: 0 }
  const action = { type: 'ADD_EXPENSE', expense }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual([...expenses, expense])
})

test('should remove expense by id', () => {
  const action = { type: 'REMOVE_EXPENSE', id: expenses[1].id }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove any expenses if id not found', () => {
  const action = { type: 'REMOVE_EXPENSE', id: -1 }
  const state = expensesReducer(expenses, action)
  // expect(state).toEqual([expenses[0], expenses[1], expenses[2]])
  expect(state).toEqual(expenses)
})

test('should edit an expense', () => {
  const description = 'April rent'
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: { description },
  }
  const state = expensesReducer(expenses, action)
  expect(state[0].description).toBe(description)
})

test('should not edit expense if id not found', () => {
  const description = 'Just glassin'
  const action = { type: 'EDIT_EXPENSE', id: '-1', updates: { description } }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual(expenses)
})

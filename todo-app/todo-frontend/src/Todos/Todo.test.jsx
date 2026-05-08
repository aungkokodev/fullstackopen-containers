import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Todo from './Todo'

describe('Todo', () => {
  afterEach(() => {
    cleanup()
  })

  test('renders todo text', () => {
    const todo = {
      text: 'Test todo',
      done: false,
    }

    render(<Todo todo={todo} deleteTodo={() => {}} completeTodo={() => {}} />)

    expect(screen.getByText('Test todo')).toBeDefined()
    expect(screen.getByText('This todo is not done')).toBeDefined()
  })

  test('calls completeTodo when clicking set as done', async () => {
    const todo = {
      text: 'Test todo',
      done: false,
    }

    const completeTodo = vi.fn()

    render(
      <Todo todo={todo} deleteTodo={() => {}} completeTodo={completeTodo} />,
    )

    const user = userEvent.setup()
    const buttons = screen.getAllByRole('button', { name: /set as done/i })

    await user.click(buttons[0])

    expect(completeTodo).toHaveBeenCalledTimes(1)
    expect(completeTodo).toHaveBeenCalledWith(todo)
  })
})

const express = require('express')
const { Todo } = require('../mongo')
const router = express.Router()
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const length = (await Todo.find({})).length

  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })

  const count = await redis.get('count')
  const newCount = (Number(count) || length) + 1
  redis.set('count', newCount)

  res.send(todo)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)
  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.deleteOne()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = req.todo
  res.send(todo)
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todo = req.todo

  todo.text = req.body.text ?? todo.text
  todo.done = req.body.done ?? todo.done

  const updated = await todo.save()
  res.send(updated)
})

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router

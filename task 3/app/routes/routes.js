const todoController = require('../controller/todo.controller')
const router = require("express").Router()

router.get('/', todoController.getAllTodos)
router.get('/add', todoController.add)
router.get('/addLogic', todoController.addLogic)
router.get('/activate/:id', todoController.activate)
router.get('/single/:id', todoController.single)
router.get('/delete/:id', todoController.deleteOne)
router.get('/deleteAll', todoController.deleteAll)
router.get('/edit/:id', todoController.edit)
router.get('/editLogic/:id', todoController.editLogic)






module.exports = router
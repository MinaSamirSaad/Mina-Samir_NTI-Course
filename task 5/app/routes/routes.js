const todoController = require('../controller/todo.controller')
const router = require("express").Router()

router.get('/', todoController.getAllTodos)
router.get('/add', todoController.add)
router.get('/addLogic', todoController.addLogic)
router.get('/activate/:_id', todoController.activate)
router.get('/single/:_id', todoController.single)
router.get('/delete/:_id', todoController.deleteOne)
router.get('/deleteAll', todoController.deleteAll)
router.get('/edit/:_id', todoController.edit)
router.get('/editLogic/:_id', todoController.editLogic)






module.exports = router
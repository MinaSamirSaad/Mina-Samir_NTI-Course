const pName = require("../helper/pagesName");
const todoDB = require("../../models/todoModel/todo.model")

class Todo {
    // all Todos
    static getAllTodos = async (req, res) => {
        try{
            let todos = await todoDB.find();
            if (req.query.search) {
                todos = todos.filter((todo) => {
                    return (
                        todo.title.toLowerCase().includes(req.query.search.toLowerCase()) ||
                        todo.content.toLowerCase().includes(req.query.search.toLowerCase())
                    );
                });
            }
            res.render("home", {
                pageName: pName.home,
                search: true,
                data: todos,
                hasData: todos.length,
            });
        }
        catch(e){
            res.send(e.message)
        }
    };

    // add new todo
    static add = (req, res) => {
        res.render("add", {
            pageName: pName.add,
            search: false,
        });
    };

    static addLogic = async (req, res) => {
        try {
            const newTodo = await {
                status: "In Progress",
                finish: false,
                ...req.query,
            };
            const data =await new todoDB(newTodo);
            await data.save(); 
            res.redirect("/");
        } catch (e) {
            console.log(e.message);
        }
    };

    // handle todo (completed or in progress)
    static activate =async (req, res) => {
        const id = req.params._id;
        try {
            const todo = await todoDB.findById(id);
            if (todo.status == "In Progress") {
                await todoDB.findByIdAndUpdate(id,{ status: "Completed", finish: true } )
            } else {
            await todoDB.findByIdAndUpdate(id,{status: "In Progress", finish: false } )
            }
            res.redirect("/");
        } catch (e) {
            console.log(e.message);
        }
    };

    // show single Todo
    static single =async (req, res) => {
        const id = req.params._id;
        try {
            const todo = await todoDB.findById(id)
            res.render("show", {
                pageName: pName.single,
                search: false,
                todo,
            });

        } catch (e) {
            console.log(e.message);
        }
    };

    // delete single Todo
    static deleteOne = async(req, res) => {
        const id = req.params._id;
        try {
            await todoDB.findByIdAndDelete(id);
            res.redirect("/");
        } catch (e) {
            console.log(e.message);
        }
    };

    // delete All Todos
    static deleteAll = async(req, res) => {
        try {
            await todoDB.deleteMany();
            res.redirect("/");
        } catch (e) {
            console.log(e.message);
        }
    };

    // edit Todo
    static edit = async(req, res) => {
        const id = req.params._id;
        try {
            const todo = await todoDB.findById(id);
            res.render("edit", {
                pageName: pName.edit,
                search: false,
                todo,
            });
        } catch (e) {
            console.log(e.message);
        }
    };
    static editLogic =async (req, res) => {
        const id = req.params._id;
        try {
            let finish;
            req.query.status == "Completed" ? (finish = true) : (finish = false);
            await todoDB.findByIdAndUpdate(id,{ finish, ...req.query } );
            res.redirect("/");
        } catch (e) {
            console.log(e.message);
        }
    };
}
module.exports = Todo;

const { ObjectId } = require('mongodb')
const pName = require("../helper/pagesName");
const connectDb = require("../../models/dbConnect")

// handle date
const today = new Date();
const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};

class Todo {
    // all Todos
    static getAllTodos = async (req, res) => {
        connectDb(async (db) => {
            let todos = await db.collection("todos").find().toArray()
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
        })

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
                date: today.toLocaleDateString("ar-EG", options),
                ...req.query,
            };
            connectDb(async (db) => {
                await db.collection("todos").insertOne(newTodo)
                res.redirect("/");
            })
        } catch (e) {
            console.log(e.message);
        }
    };

    // handle todo (completed or in progress)
    static activate = (req, res) => {
        try {
            connectDb(async (db) => {
                const todo = await db.collection("todos").findOne({ _id: new ObjectId(req.params._id) });
                if (todo.status == "In Progress") {
                    await db.collection("todos").updateOne({ _id: new ObjectId(req.params._id) }, { $set: { status: "Completed", finish: true } })
                } else {
                    await db.collection("todos").updateOne({ _id: new ObjectId(req.params._id) }, { $set: { status: "In Progress", finish: false } })
                }
                res.redirect("/");
            })
        } catch (e) {
            console.log(e.message);
        }
    };

    // show single Todo
    static single = (req, res) => {
        try {
            connectDb(async (db) => {
                const todo = await db.collection("todos").findOne({ _id: new ObjectId(req.params._id) });
                res.render("show", {
                    pageName: pName.single,
                    search: false,
                    todo,
                });
            })

        } catch (e) {
            console.log(e.message);
        }
    };

    // delete single Todo
    static deleteOne = (req, res) => {
        try {
            connectDb(async (db) => {
                await db.collection("todos").deleteOne({ _id: new ObjectId(req.params._id) });
                res.redirect("/");
            })
        } catch (e) {
            console.log(e.message);
        }
    };

    // delete All Todos
    static deleteAll = (req, res) => {
        try {
            connectDb(async (db) => {
                await db.collection("todos").deleteMany();
                res.redirect("/");
            })
        } catch (e) {
            console.log(e.message);
        }
    };

    // edit Todo
    static edit = (req, res) => {
        try {
            connectDb(async (db) => {
                const todo = await db.collection("todos").findOne({ _id: new ObjectId(req.params._id) });
                res.render("edit", {
                    pageName: pName.edit,
                    search: false,
                    todo,
                });
            })
        } catch (e) {
            console.log(e.message);
        }
    };
    static editLogic = (req, res) => {
        try {
            connectDb(async (db) => {
                let finish;
                req.query.status == "Completed" ? (finish = true) : (finish = false);
                await db.collection('todos').updateOne({ _id: new ObjectId(req.params._id) }, { $set: { finish, ...req.query } })
                res.redirect("/");
            })
        } catch (e) {
            console.log(e.message);
        }
    };
}
module.exports = Todo;

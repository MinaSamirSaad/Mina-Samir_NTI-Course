const deal = require("../helper/dealWithJson");
const pName = require("../helper/pagesName");
const fileName = "models/users.json";

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
    static getAllTodos = (req, res) => {
        let todos = deal.readInJson(fileName);
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
    };

    // add new todo
    static add = (req, res) => {
        res.render("add", {
            pageName: pName.add,
            search: false,
        });
    };

    static addLogic = (req, res) => {
        const todos = deal.readInJson(fileName);
        try {
            const newTodo = {
                id: Date.now(),
                status: "In Progress",
                finish: false,
                date: today.toLocaleDateString("ar-EG", options),
                ...req.query,
            };
            todos.push(newTodo);
            deal.writeInJson(fileName, todos);
            res.redirect("/");
        } catch (e) {
            console.log(e.message);
        }
    };

    // handle todo (completed or in progress)
    static activate = (req, res) => {
        const todos = deal.readInJson(fileName);
        try {
            const index = todos.findIndex((todo) => todo.id == req.params.id);
            if (todos[index].status == "In Progress") {
                todos[index].status = "Completed";
                todos[index].finish = true;
            } else {
                todos[index].status = "In Progress";
                todos[index].finish = false;
            }
            deal.writeInJson(fileName, todos);
            res.redirect("/");
        } catch (e) {
            console.log(e.message);
        }
    };

    // show single Todo
    static single = (req, res) => {
        const todos = deal.readInJson(fileName);
        try {
            const todo = todos.find((todo) => todo.id == req.params.id);
            console.log(todo);
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
    static deleteOne = (req, res) => {
        const todos = deal.readInJson(fileName);
        try {
            const index = todos.findIndex((todo) => todo.id == req.params.id);
            todos.splice(index, 1);
            deal.writeInJson(fileName, todos);
            res.redirect("/");
        } catch (e) {
            console.log(e.message);
        }
    };

    // delete All Todos
    static deleteAll = (req, res) => {
        try {
            deal.writeInJson(fileName, []);
            res.redirect("/");
        } catch (e) {
            console.log(e.message);
        }
    };

    // edit Todo
    static edit = (req, res) => {
        const todos = deal.readInJson(fileName);
        try {
            const todo = todos.find((todo) => todo.id == req.params.id);
            res.render("edit", {
                pageName: pName.edit,
                search: false,
                todo,
            });
        } catch (e) {
            console.log(e.message);
        }
    };
    static editLogic = (req, res) => {
        const todos = deal.readInJson(fileName);
        const date = today.toLocaleDateString("ar-EG", options);
        let finish;
        try {
            req.query.status == "Completed" ? (finish = true) : (finish = false);
            const id = req.params.id;
            const index = todos.findIndex((u) => u.id == id);
            todos[index] = { id, finish, date, ...req.query };
            deal.writeInJson(fileName, todos);
            res.redirect("/");
        } catch (e) {
            console.log(e.message);
        }
    };
}
module.exports = Todo;

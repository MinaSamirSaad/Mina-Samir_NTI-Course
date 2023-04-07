const express = require('express')
const path = require("path")
const hbs = require("hbs")
const app = express()

//views static partials
const myStaticDir = path.join(__dirname, "../resources/public")
const myViewsDir = path.join(__dirname, "../resources/views")
const myPartialDir = path.join(__dirname, "../resources/layouts")

// configuration static partials fot hbs files
app.use(express.static(myStaticDir))
app.set("view engine", "hbs")
app.set("views", myViewsDir)
hbs.registerPartials(myPartialDir)

// using routes
const userRoutes = require("./routes/routes")
const exp = require("constants")
app.use(userRoutes)

// routes authentication
app.all("*", (req, res) => res.render("error", { pageTitle: "Error in page" }))

module.exports = app
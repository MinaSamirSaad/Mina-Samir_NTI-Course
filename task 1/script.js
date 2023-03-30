// select Elements
const myForm = document.querySelector("#myForm")
const userWrap = document.querySelector("#userWrap")
const showDataEl = document.getElementById('showData')

const heads = ["name", "age", "email","status"]

// read and write from Local storage
const readFromStorage = (key=`tasks`) => JSON.parse(localStorage.getItem(key)) || []
const writeToStorage = (data, key=`tasks`) => localStorage.setItem(key, JSON.stringify(data))

// functions to take data from form and save it in local storage 
// ----------------- start --------------------------------
const userObjCreator = (myForm)=>{
    const user = { id:Date.now() }
    heads.forEach( h => user[h] = myForm.elements[h].value )
    return user
}

const addUser = (user)=>{
    const allUsers = readFromStorage("users")
    allUsers.push(user)
    writeToStorage(allUsers, "users")
}


if(myForm){
    myForm.addEventListener("submit", function(e){
        e.preventDefault()
        const user = userObjCreator(myForm)
        addUser(user)
        window.location = "index.html"
    })  
}
// ----------------- end --------------------------------


// general function that help me to create Element and add it in HTML file
function createMyOwnElement (ele, parent, txt=null, classes=null){
    const myElement = document.createElement(ele)
    parent.appendChild(myElement)
    if(txt) myElement.textContent=txt
    if(classes) myElement.classList=classes
    return myElement
}


// functions to sort data from Local storage in home page
// -----------------------start--------------------------------
const deleteMyElement = (allUsers, i) =>{
    allUsers.splice(i,1)
    writeToStorage(allUsers, "users")
    drawData()
}
const editMyElement = (allUsers, i) =>{
    allUsers[i].status=="active" ? allUsers[i].status="inactive" : allUsers[i].status="active";
    writeToStorage(allUsers, "users")
    drawData()
}
const showData = (allUsers, i) =>{
    const name = createMyOwnElement("p", showDataEl, null,"show")
    createMyOwnElement("span", name,"Name : ")
    name.innerHTML += allUsers[i].name;
    const email = createMyOwnElement("p", showDataEl,null,"show")
    createMyOwnElement("span", email,"Email : ")
    email.innerHTML += allUsers[i].email;
    const age = createMyOwnElement("p", showDataEl,null,"show")
    createMyOwnElement("span", age,"Age : ")
    age.innerHTML += allUsers[i].age;
    const status = createMyOwnElement("p", showDataEl,null,allUsers[i].status == "active"?"status green":"status red")
    createMyOwnElement("span", status,"status : ")
    status.innerHTML += allUsers[i].status;
}

const drawData = () =>{
    userWrap.innerHTML=""
    showDataEl.innerHTML=""
    const allUsers = readFromStorage("users")
    allUsers.forEach((user, i)=>{
        const tr = createMyOwnElement("tr", userWrap)
        createMyOwnElement("td", tr, user.id)
        createMyOwnElement("td", tr, user.name)
        createMyOwnElement("td", tr, user.email)
        createMyOwnElement("td", tr, user.age)
        createMyOwnElement("td", tr, user.status)
        const td = createMyOwnElement("td", tr)

        const delBtn = createMyOwnElement("button", td, "Delete","mx-2 btn btn-danger")
        delBtn.addEventListener("click", (e)=> deleteMyElement(allUsers, i))
        const showBtn = createMyOwnElement("button", td, "Show","mx-2 btn btn-primary")
        showBtn.addEventListener("click", ()=>{
            showData(allUsers, i)
        })
        const editBtn = createMyOwnElement("button", td, "Edit","mx-2 btn btn-warning")
        editBtn.addEventListener("click", (e)=> editMyElement(allUsers, i))
    })
}

if(userWrap){
    drawData()
}
// -----------------------end--------------------------------
















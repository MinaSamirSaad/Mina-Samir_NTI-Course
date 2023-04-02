const yargs = require('yargs')
const user = require('./modules/users')

// add new user
yargs.command({
    command:"addUser",
    builder:{
        name:{
            diamondOption:true
        },
        email:{
            diamondOption:true
        },
        age :{
            diamondOption:true
        }
    },
    handler : (argv)=>user.addNewUser(argv)
})

// show all users
yargs.command({
    command:"showAllUsers",
    handler : (argv)=>user.showAllUsers()
 } )

//  show single user by id
 yargs.command({
    command:"findUser",
    builder:{
        id:{
            diamondOption:true
        }
    },
    handler : (argv)=>user.findUser(argv)
 } )

//  delete single user by id
yargs.command({
    command:"deleteUser",
    builder:{
        id:{
            diamondOption:true
        }
    },
    handler : (argv)=>user.deleteUser(argv)
 } )

//  delete all users
 yargs.command({
    command:"deleteAllUser",
    handler : ()=>user.deleteAllUsers()
 } )

//  edit single user
yargs.command({
    command:"editUser",
    builder:{
        id:{
            diamondOption:true
        },
        name:{
            diamondOption:false
        },
        email:{
            diamondOption:false
        },
        age:{
            diamondOption:false
        }
    },
    handler : (argv)=>user.editUser(argv)
 } )

//  edit all users
yargs.command({
    command:"editUser",
    builder:{
        name:{
            diamondOption:false
        },
        email:{
            diamondOption:false
        },
        age:{
            diamondOption:false
        }
    },
    handler : (argv)=>user.editAllUsers(argv)
 } )
yargs.argv
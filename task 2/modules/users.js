const deal = require("./dealWithJson.js");
const headers = ["id", "name", "email", "age"];
const createObj = (data) => {
  const user = {};
  headers.forEach((key) => {
    key == "id" ? (user[key] = Date.now()) : (user[key] = data[key]);
  });
  return user;
};

class User {
  static addNewUser = (data) => {
    const users = deal.readJsonData("users.json");
    const userData = createObj(data);
    users.push(userData);
    deal.writeJsonData("users.json", users);
  };

  static showAllUsers = (data) => {
    const users = deal.readJsonData("users.json");
    users.length
      ? users.forEach((user) => {
          console.log(
            `${user.name} - ${user.id} - ${user.email} - ${user.age}`
          );
        })
      : console.log("no users found");
  };

  static findUser = (data) => {
    const users = deal.readJsonData("users.json");
    const user = users.find((user) => user.id == data.id);
    user ? console.log(user) : console.log("no user found");
  };

  static deleteUser = (data) => {
    const users = deal.readJsonData("users.json");
    const filteredUsers = users.filter((user) => user.id !== data.id);
    deal.writeJsonData("users.json", filteredUsers);
  };

  static deleteAllUsers = () => {
    deal.writeJsonData("users.json", []);
  };

  static editUser = (data) => {
    if (data.id) {
      const users = deal.readJsonData("users.json");
      const user = users.find((user) => user.id == data.id);
      const filteredUsers = users.filter((user) => user.id != data.id);
      data.name && (user.name = data.name);
      data.email && (user.email = data.email);
      data.age && (user.age = data.age);
      filteredUsers.push(user);
      deal.writeJsonData("users.json", filteredUsers);
    } else {
      console.log("enter the id please");
    }
  };

  static editAllUsers = (data) => {
    const users = deal.readJsonData("users.json").map((user) => {
      data.name && (user.name = data.name);
      data.email && (user.email = data.email);
      data.age && (user.age = data.age);
    });
    deal.writeJsonData("users.json", users);
  };
}
module.exports = User;

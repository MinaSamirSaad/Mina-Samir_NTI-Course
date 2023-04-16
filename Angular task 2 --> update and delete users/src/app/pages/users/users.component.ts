import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users :any = []
  handleUser(eve:any){
    // console.log(eve)
    this.users.push(eve)


  }
  deleteUser(i:number){
    this.users.splice(i,1)
  }
  updateUser(i:number){
    this.users[i].userName= prompt('what is new name') || this.users[i].userName
    this.users[i].email= prompt('what is new email') || this.users[i].email
  }
}

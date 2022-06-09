import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-consult-employees',
  templateUrl: './consult-employees.component.html',
  styleUrls: ['./consult-employees.component.css']
})
export class ConsultEmployeesComponent implements OnInit {
  usersList: any[] = [];

  constructor(private _userService: UserService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this._userService.getUsers().subscribe({
      next: (data) => {
        this.usersList = [];
        data.map((user: any) => {
          this.usersList.push({ id: user.payload.doc.id, ...user.payload.doc.data() })
        })
      },
      error: (err) => console.log(err)
    });
  }

  deleteUser(id: string) {
    this._userService.deleteUser(id).then(() => {
      this.toastr.error('Usuario eliminado correctamente', 'Usuario eliminado', { positionClass: 'toast-bottom-right' });
    }).catch((err) => console.log(err))
  }

}

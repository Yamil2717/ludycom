import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {
  createUser: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  title: string = 'Crear usuario';
  buttonText: string = 'Registrar';

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.createUser = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      dateOfBirth: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.email]),
      dni: new FormControl('', [Validators.required, Validators.maxLength(7)]),
      area: new FormControl('', [Validators.required, Validators.maxLength(2)]),
      salary: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      status: new FormControl('Si', Validators.required)
    });
    this.id= this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.createUser = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      dateOfBirth: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.email]),
      dni: new FormControl('', [Validators.required, Validators.maxLength(7)]),
      area: new FormControl('', [Validators.required, Validators.maxLength(2)]),
      salary: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      status: new FormControl('Si', Validators.required)
    });
    this.isEdit();
  }
  
  get f() { return this.createUser.controls; }

  handleSubmit() {
    this.submitted = true;
    if (this.createUser.invalid) return;
    this.loading = true;
    if (this.id === null) this.addUser();
    else this.editUser(this.id);
  }

  addUser() {
    let user: userInterface = {
      name: this.createUser.value.name,
      lastName: this.createUser.value.lastName,
      dateOfBirth: this.createUser.value.dateOfBirth,
      email: this.createUser.value.email,
      dni: this.createUser.value.dni,
      area: this.createUser.value.area,
      salary: this.createUser.value.salary,
      status: this.createUser.value.status,
      DateCreated: new Date(),
      DateUpdate: new Date()
    }
    this._userService.addUser(user).then(() => {
      this.loading = false;
      this.toastr.success('Usuario creado correctamente', 'Usuario creado', { positionClass: 'toast-bottom-right' });
      this.router.navigate(['/consult-employees']);
    }).catch((err) => {
      this.loading = false;
      this.toastr.error(`Error al crear el usuario. Error: ${err}`, 'Error', { positionClass: 'toast-bottom-right' });
    });
  }

  isEdit() {
    if (this.id === null) return;
    this.title = 'Editar usuario';
    this.buttonText = 'Guardar';
    this._userService.getUser(this.id).subscribe((userData) => {
      this.createUser.patchValue({
        name: userData.payload.data().name,
        lastName: userData.payload.data().lastName,
        dateOfBirth: userData.payload.data().dateOfBirth,
        email: userData.payload.data().email,
        dni: userData.payload.data().dni,
        area: userData.payload.data().area,
        salary: userData.payload.data().salary,
        status: userData.payload.data().status
      });
    });
  }

  editUser(id:string) {
    let userUpdate: any = {
      name: this.createUser.value.name,
      lastName: this.createUser.value.lastName,
      dateOfBirth: this.createUser.value.dateOfBirth,
      email: this.createUser.value.email,
      dni: this.createUser.value.dni,
      area: this.createUser.value.area,
      salary: this.createUser.value.salary,
      status: this.createUser.value.status,
      DateUpdate: new Date()
    }
    this._userService.editUser(id, userUpdate).then(() => {
      this.loading = false;
      this.toastr.success('Usuario editado correctamente', 'Usuario editado', { positionClass: 'toast-bottom-right' });
      this.router.navigate(['/consult-employees']);
    }).catch((err) => {
      this.loading = false;
      this.toastr.error(`Error al editar el usuario. Error: ${err}`, 'Error', { positionClass: 'toast-bottom-right' });
    });
  }

}

interface userInterface {
  name: string,
  lastName: string,
  dateOfBirth: string,
  email: string,
  dni: number,
  area: number,
  salary: number,
  status: string,
  DateCreated: Date,
  DateUpdate: Date
}
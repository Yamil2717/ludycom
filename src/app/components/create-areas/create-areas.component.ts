import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-create-areas',
  templateUrl: './create-areas.component.html',
  styleUrls: ['./create-areas.component.css']
})
export class CreateAreasComponent implements OnInit {
  createArea: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  title: string = 'Crear usuario';
  buttonText: string = 'Registrar';

  constructor(
    private fb: FormBuilder,
    private _areaService: AreaService,
    private toastr: ToastrService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.createArea = this.fb.group({
      code: new FormControl('', [Validators.required, Validators.maxLength(2)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      leader: new FormControl('', [Validators.required, Validators.maxLength(7)]),
      status: new FormControl('Si', Validators.required)
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.createArea = this.fb.group({
      code: new FormControl('', [Validators.required, Validators.maxLength(2)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      leader: new FormControl('', [Validators.required, Validators.maxLength(7)]),
      status: new FormControl('Si', Validators.required)
    });
    this.isEdit();
  }

  get f() { return this.createArea.controls; }

  handleSubmit() {
    this.submitted = true;
    if (this.createArea.invalid) return;
    this.loading = true;
    if (this.id === null) this.addArea();
    else this.editArea(this.id);
  }

  addArea() {
    if (this.createArea.invalid) return;
    let area: areaInterface = {
      code: this.createArea.value.code,
      name: this.createArea.value.name,
      leader: this.createArea.value.leader,
      status: this.createArea.value.status,
      DateCreated: new Date(),
      DateUpdate: new Date()
    }
    this._areaService.addArea(area).then(() => {
      this.loading = false;
      this.toastr.success('Área creada correctamente', 'Área creado', { positionClass: 'toast-bottom-right' });
      this.router.navigate(['/consult-area']);
    }).catch((err) => {
      this.loading = false;
      this.toastr.error(`Error al crear el área. Error: ${err}`, 'Error', { positionClass: 'toast-bottom-right' });
    });
  }

  isEdit() {
    if (this.id === null) return;
    this.title = 'Editar área';
    this.buttonText = 'Guardar';
    this._areaService.getArea(this.id).subscribe((areaData) => {
      this.createArea.patchValue({
        code: areaData.payload.data().code,
        name: areaData.payload.data().name,
        leader: areaData.payload.data().leader,
        status: areaData.payload.data().status,
      });
    });
  }

  editArea(id: string) {
    let areaUpdate: any = {
      code: this.createArea.value.code,
      name: this.createArea.value.name,
      leader: this.createArea.value.leader,
      status: this.createArea.value.status,
      DateUpdate: new Date()
    }
    this._areaService.editArea(id, areaUpdate).then(() => {
      this.loading = false;
      this.toastr.success('Área editada correctamente', 'Área editado', { positionClass: 'toast-bottom-right' });
      this.router.navigate(['/consult-area']);
    }).catch((err) => {
      this.loading = false;
      this.toastr.error(`Error al editar el área. Error: ${err}`, 'Error', { positionClass: 'toast-bottom-right' });
    });
  }

}

interface areaInterface {
  name: string,
  code: number,
  leader: number,
  status: string,
  DateCreated: Date,
  DateUpdate: Date
}
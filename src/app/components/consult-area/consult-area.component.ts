import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-consult-area',
  templateUrl: './consult-area.component.html',
  styleUrls: ['./consult-area.component.css']
})
export class ConsultAreaComponent implements OnInit {
  areaList: any[] = [];

  constructor(private _areaService: AreaService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAreas()
  }

  getAreas() {
    this._areaService.getAreas().subscribe({
      next: (data:any) => {
        this.areaList = [];
        data.map((area: any) => {
          this.areaList.push({ id: area.payload.doc.id, ...area.payload.doc.data() })
        })
      },
      error: (err) => console.log(err)
    });
  }

  deleteArea(id: string) {
    this._areaService.deleteArea(id).then(() => {
      this.toastr.error('Area eliminada correctamente', 'Area eliminada', { positionClass: 'toast-bottom-right' });
    }).catch((err) => console.log(err))
  }

}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  
  constructor(private fs: AngularFirestore) { }

  addArea(user: any): Promise<any> {
    return this.fs.collection('areas').add(user);
  }

  getAreas(): Observable<any> {
    return this.fs.collection('areas', ref => ref.orderBy('DateCreated', 'asc')).snapshotChanges();
  }

  deleteArea(id: string): Promise<any> {
    return this.fs.collection('areas').doc(id).delete();
  }

  getArea(id: string): Observable<any> {
    return this.fs.collection('areas').doc(id).snapshotChanges();
  }

  editArea(id:string, data:any): Promise<any> {
    return this.fs.collection('areas').doc(id).update(data);
  }

}

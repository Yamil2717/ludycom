import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fs: AngularFirestore) { }

  addUser(user: any): Promise<any> {
    return this.fs.collection('users').add(user);
  }

  getUsers(): Observable<any> {
    return this.fs.collection('users', ref => ref.orderBy('DateCreated', 'asc')).snapshotChanges();
  }

  deleteUser(id: string): Promise<any> {
    return this.fs.collection('users').doc(id).delete();
  }

  getUser(id: string): Observable<any> {
    return this.fs.collection('users').doc(id).snapshotChanges();
  }

  editUser(id:string, data:any): Promise<any> {
    return this.fs.collection('users').doc(id).update(data);
  }

}

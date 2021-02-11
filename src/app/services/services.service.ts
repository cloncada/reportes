import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ReportInterface } from '../models/reports';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private afs:AngularFirestore) { 
    this.reportCollection = afs.collection<ReportInterface>('Reportes');
    this.reports = this.reportCollection.valueChanges();
  }
  
  private reportCollection: AngularFirestoreCollection<ReportInterface>;
  private reports: Observable<ReportInterface[]>;

  getReports(){
    return this.reports = this.reportCollection.snapshotChanges().pipe(map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as ReportInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  addReport() {}
  updateReport(){}
  deleteReport() {}
}

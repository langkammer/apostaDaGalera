import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cad-ligas',
  templateUrl: './cad-ligas.component.html',
  styleUrls: ['./cad-ligas.component.css']
})
export class CadLigasComponent implements OnInit {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  grupo : any = {};
  ambiente : any = {};
  liga : any = {};

  constructor(
    db: AngularFireDatabase
    ) { 
    this.itemsRef = db.list('ligas');

    
    this.items =  this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    console.log("ligas...",this.items)  
  }


  abreModal = function (edit : string, object : any) {
    
    if(edit != 'new')
      this.grupo = object;
    else
      this.grupo = {};

    $("#modalLiga").modal("show");
  };


  reset = function(){
    this.grupo = {};
    $("#modalLiga").modal("hide");
  }


  save() {
    console.log("ligas") //s
    // console.log(this.itemsCollection)

    const task =  this.itemsRef.push(this.liga);
    task.then((value) => {
      //SUCCESS
      console.log(value);
      this.reset(); 
    }, (error) => {
        console.log(error);
    })
  }


  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }

  ngOnInit() {
  }

}

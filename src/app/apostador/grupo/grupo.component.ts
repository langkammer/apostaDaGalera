import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

 
  aposta : any = {};

  itemRefLigas: AngularFireList<any>;

  itemRefGrupos: AngularFireList<any>;


  ligas: Observable<any[]>;

  grupos: Observable<any[]>;


  itemsLigas: Observable<any[]>;


  grupo : any = {
    crit1 : {},
    crit2 : {},
    crit3 : {},
    userGestor : {
      nome : "ROBSON"
    }

  };
  
  liga : any = {};

  constructor(db: AngularFireDatabase) {
    this.itemRefLigas = db.list('ligas');
    this.itemRefGrupos = db.list('grupos');

    
    this.ligas =  this.itemRefLigas.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.grupos =  this.itemRefGrupos.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  ngOnInit() {
  }

  showCriteriaCollapse = function(){
    console.log("collapse")
    $('#colapseCiteria').collapse('toggle')
}


  abreModal = function (edit : string, object : any) {
    
    if(edit != 'new')
      this.aposta = object;
    else
      this.aposta = {};

    $("#modalGrupo").modal("show");
  };

  reset = function(){
    this.grupo = {};
    $("#modalGrupo").modal("hide");
  }

  save() {
    console.log("ligas") //s
    // console.log(this.itemsCollection)

    const task =  this.itemRefGrupos.push(this.grupo);
    task.then((value) => {
      //SUCCESS
      console.log(value);
      this.reset(); 
    }, (error) => {
        console.log(error);
    })
  }

  deleteItem(key: string) {
    this.itemRefGrupos.remove(key);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-membros-grupo',
  templateUrl: './membros-grupo.component.html',
  styleUrls: ['./membros-grupo.component.css']
})
export class MembrosGrupoComponent implements OnInit {

  key = "";
  db : AngularFireDatabase;

  @BlockUI() blockUI: NgBlockUI;

  constructor(private route:ActivatedRoute, private router:Router,  db: AngularFireDatabase){
    this.db = db;
  }
  ngOnInit() {

    this.key = this.route.snapshot.params['key'];

    console.log(this.key)
    this.blockUI.start('Carregando Resultados ...'); // Start blocking

    this.db.object('membrosByGrupo/' + this.key).snapshotChanges().subscribe( res =>{
        if (res) {
            this.blockUI.stop(); // Stop blocking
        }
    })
  }
}

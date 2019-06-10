import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-convite',
  templateUrl: './convite.component.html',
  styleUrls: ['./convite.component.css']
})
export class ConviteComponent implements OnInit {

  key = "";
  db : AngularFireDatabase;
  grupo : any = {};

  @BlockUI() blockUI: NgBlockUI;

  constructor(private route:ActivatedRoute, private router:Router,  db: AngularFireDatabase){
    this.db = db;
  }
  ngOnInit() {

    this.key = this.route.snapshot.params['key'];

    console.log(this.key)
    this.blockUI.start('Carregando Resultados ...'); // Start blocking
    this.grupo =  this.db.object('grupos/' + this.key).snapshotChanges().subscribe( res =>{
      if (res) {
          console.log(res.payload.val());
          this.grupo = res.payload.val();
          this.blockUI.stop(); // Stop blocking
      }
    });
   
  }
}
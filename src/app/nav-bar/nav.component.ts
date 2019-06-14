import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { VinculoService } from '../services/vinculo.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-root',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavBarComponent implements OnInit {

  email = "";

  perfil:any = {};

  isAdmin:boolean = false;

  db : AngularFireDatabase;

  @BlockUI() blockUI: NgBlockUI;

  perfiUserRef: AngularFireList<any>;

  constructor(
    public afAuth: AngularFireAuth   ,
    db: AngularFireDatabase,
    public vinculoService: VinculoService
    ) 
  {
    this.db = db;

  } 

  ngOnInit(): void {
    this.afAuth.authState.subscribe(res => {
        if (res && res.uid) {
            console.log("logado : " , res.email)
            this.email = res.email;
            this.carregaDefinicoesPerfil(res.uid);
        } else {
          this.email = ''
        }
      });
  }

  logout() {
    console.log("deslogou ... ", this.perfil)
    this.afAuth.auth.signOut();
  }


  

  carregaDefinicoesPerfil(uid){
    this.blockUI.start('Carregando Resultados ...'); // Start blocking
    this.vinculoService
    .getUserByAuthID(uid)
    .subscribe(
        sucesso => {
          this.perfil = sucesso.data;
          this.isAdmin = sucesso.data.permissaoAdmin
          this.blockUI.stop();

        },
        err => {
            console.log(err);
            this.blockUI.stop(); // Stop blocking
        }
    );

    
   
  }

}

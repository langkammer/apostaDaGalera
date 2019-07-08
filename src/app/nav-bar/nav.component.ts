import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { VinculoService } from '../services/vinculo.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ResponseBodyInterface, User } from '../interfaces/response-body.interface';

import { SidenavService } from '../services/sidenav.service';
import { onMainContentChange } from '../animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [ onMainContentChange ]

})
export class NavBarComponent implements OnInit {

  email = "";

  perfil:User;

  response:ResponseBodyInterface;

  isAdmin:boolean = false;

  db : AngularFireDatabase;

  @BlockUI() blockUI: NgBlockUI;

  perfiUserRef: AngularFireList<any>;

  public onSideNavChange: boolean;


  constructor(
    public afAuth: AngularFireAuth   ,
    db: AngularFireDatabase,
    public vinculoService: VinculoService,
    private _sidenavService: SidenavService
    ) 
  {
    this.db = db;
    this._sidenavService.sideNavState$.subscribe( res => {
      console.log(res)
      this.onSideNavChange = res;
    })

  

  } 

  ngOnInit(): void {
    this.afAuth.authState.subscribe(res => {
        if (res && res.uid) {
            console.log("logado : " , res.email)
            this.email = res.email;
            this.carregaDefinicoesPerfil(res.email);
            this._sidenavService.logar();
        } else {
            this.email = ''
            this._sidenavService.deslogar();
        }
      });

   
  }

  logout() {
    console.log("deslogou ... ", this.perfil)
    this.afAuth.auth.signOut();
  }


  

  carregaDefinicoesPerfil(email){
    this.vinculoService
    .getUserByEmail(email)
    .subscribe(
        (response:ResponseBodyInterface) => {
          if(response.data){
            this.response = response;
            this.perfil   = this.response.data;
            this.isAdmin =  this.perfil.permissaoAdmin;
          }

        },
        err => {
            console.log(err);
        }
    );

    
   
  }

}

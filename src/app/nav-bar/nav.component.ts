import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavBarComponent implements OnInit {

  email = "";

  perfil:any = {};

  db : AngularFireDatabase;

  perfiUserRef: AngularFireList<any>;

  constructor(
    public afAuth: AngularFireAuth   ,
    db: AngularFireDatabase
     ) 
  {
    this.db = db;
    this.perfiUserRef = db.list('perfilUsuarios');

  } 

  ngOnInit(): void {
    this.afAuth.authState.subscribe(res => {
        if (res && res.uid) {
            console.log("logado : " , res.email)
            this.carregaDefinicoesPerfil(res.email);
        } else {
          this.email = ''
        }
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  carregaDefinicoesPerfil(email){
    console.log("EMAIL" , email)
    this.perfil = this.db.list('/perfilUsuarios')
    .snapshotChanges().pipe(
      map(changes => 
        changes.map(c => (console.log({ key: c.payload.key, ...c.payload.val() })))
      )
    );
    
   
  }

}

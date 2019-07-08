import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SidenavService } from 'src/app/services/sidenav.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() sidenav: MatSidenav

  logado:boolean = false;

  constructor(
    private _sidenavService: SidenavService,
    public afAuth: AngularFireAuth   
    ) { }

  ngOnInit() {
    this._sidenavService.getLogado().subscribe(
      (logado : boolean) =>{
        if(!logado){
          this.logado = false;
        }
        else{
          this.logado = true; 
        }
      }
    )
  }

  deslogar(){
    console.log("deslogar");
    this.afAuth.auth.signOut();
  }
}
import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupo, ResponseBodyInterface } from 'src/app/interfaces/response-body.interface';
import { GrupoService } from 'src/app/services/grupo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MsgService } from 'src/app/core/msg.service';

@Component({
  selector: 'app-convite',
  templateUrl: './convite.component.html',
  styleUrls: ['./convite.component.css']
})
export class ConviteComponent implements OnInit {
   
  sub: any;

  grupo = {} as Grupo;

  @BlockUI() blockUI: NgBlockUI;

  userLogado : boolean = false;

  email:string;

  
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private service:GrupoService,
    public afAuth: AngularFireAuth,
    private msgService:MsgService
  ){  
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];

    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
          console.log("logado?" , res)
          this.email = res.email;
          this.userLogado = true;
      } else {
        this.userLogado = false;
      }
    });

    if(id)
      this.carregaGrupo(id);
  }

  ngOnDestroy() {
  }

  carregaGrupo(id:number){

    this.service.get(id).subscribe(
     (res:ResponseBodyInterface) =>{
        if(res.status=="SUCESSO")
          this.grupo = res.data
     }
    );
  }


  aceitarConvite(){
    this.service.entrar({id: this.grupo.id, email : this.email}).subscribe(
      (res:ResponseBodyInterface) =>{
        if(res.status=="SUCESSO"){
          this.msgService.open("Agora Você participa do grupo : ",this.grupo.nome);
          this.router.navigate(['/apostador/grupoByAposta',  this.grupo.id]);

        }
  
      }
    )
  }

 
}

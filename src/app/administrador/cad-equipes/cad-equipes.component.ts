import { MatPaginator } from "@angular/material/paginator";
import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import {  MatBottomSheet, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


import { Equipe, MatDataDialogInterface } from 'src/app/interfaces/response-body.interface';
import { MsgService } from 'src/app/core/msg.service';
import { tap } from 'rxjs/internal/operators/tap';
import { BottonButtonComponent } from "src/app/shared/bottom/bottom-button.component";
import { EquipeDataSource } from "./equipes-data.source";
import { EquipeService } from "src/app/services/equipe.service";
import { TimeModalComponent } from "./modal/time-modal.component";
import * as _ from "lodash"

@Component({
  selector: 'app-cad-equipes',
  templateUrl: './cad-equipes.component.html',
  styleUrls: ['./cad-equipes.component.css']
})
export class CadEquipesComponent implements OnInit,AfterViewInit {

  nome:string;
  
  equipe = {} as Equipe;

  equipes = [] as Equipe[];

  equipesSelecionadas =  [] as Equipe[];

  displayedColumns: string[] = ['select','escudoPathString','nomeCompleto', 'sigla','id'];

  dataSource: EquipeDataSource;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
        private bottomSheet: MatBottomSheet,
        private service:EquipeService,
        private msgService:MsgService,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<CadEquipesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: MatDataDialogInterface
  ){}


  ngOnInit(): void {
    this.dataSource = new EquipeDataSource(this.service);
    if(this.data){
      this.data = this.data;
        _.remove(this.displayedColumns,'select');
      if(this.data.obj){
        this.equipesSelecionadas = this.data.obj;
      }
    }

    this.loadPage();
  }


  ngAfterViewInit() {
    this.paginator.page
        .pipe(
            tap(() => this.loadPage())
        )
        .subscribe();
  } 

  loadPage() {
    this.dataSource.load(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.nome,
      this.equipesSelecionadas);
  }



  openModal(tipoCrud:String,equipe:Equipe) : void{
    console.log("abre modal liga");
    if(!tipoCrud)
      tipoCrud = "Nova";
    const dialogRef = this.dialog.open(TimeModalComponent, {
      width: '600px',
      data: {action: tipoCrud, obj: equipe}

    });

    dialogRef.afterClosed().subscribe((equipe: Equipe)  => {
      console.log('The dialog was closed');
    //   this.animal = result;
        console.log(equipe);
        if(!!equipe){
          this.loadPage();
          this.msgService.open("Novo Time  ! : " , equipe.nomeAbrev)
        }
    });
  }

  
  openMenu(equipe:Equipe): void {
    this.bottomSheet.open(BottonButtonComponent).afterDismissed().subscribe(
      sucess => {
        if(!!sucess)
          this.openModal(sucess,equipe);
        else
          console.log("Fechou sem resultados ...");  
      }
    );
    console.log("ACESSOU SUB MENU");
  }

  // vaiParaMenu(tip,equipe:Equipe){
  //   if(tip!="Deletar")
  //     this.router.navigate(['/apostador/ligas/gerenciadorLiga', equipe.id,tip ]);
  //   else
  //     this.openModal(tip,equipe);
  // }


  marcaEquipe(event, equipe:Equipe) {
    console.log(event,equipe)
    if(event.checked)
      this.dataSource.marcaEquipe(equipe);
    else
      this.dataSource.desmarcarEquipe(equipe);  
  }
// changeEquipes(event) {
//     const times = <FormArray>this.form.get('times') as FormArray;

//     if(event.checked) {
//       times.push(new FormControl(event.source.value))

//       this.grupo.times.push(event.source.value);

//     } else {
//       const i = times.controls.findIndex(x => x.value === event.source.value);
      
//       _.remove(this.grupo.times, { sigla : event.source.value.sigla});

//       times.removeAt(i);
//     }


//   }

  confirmar(){
    console.log("equipes marcadas ", this.dataSource.getEquipesSelecionadas())
    this.equipesSelecionadas = _.filter(this.dataSource.getEquipesSelecionadas(),{select : true});
    console.log("equipes selecionadas ", _.filter(this.dataSource.getEquipesSelecionadas(),{select : true}))

    this.dialogRef.close(this.equipesSelecionadas);
  }

  cancelar(){
    this.dialogRef.close();
  }
}

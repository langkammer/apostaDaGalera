import { Component, OnInit } from '@angular/core';
import { onSideNavChange, animateText } from '../../animations/animations'
import { SidenavService } from '../../services/sidenav.service'


interface Page {
  rota: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  animations: [onSideNavChange, animateText]
})
export class LeftMenuComponent implements OnInit {
  public sideNavState: boolean = false;
  public linkText: boolean = false;

  public pages: Page[] = [


    {name: 'Resultados', rota:'apostador/resultados', icon: 'trending_up'},
    {name: 'Apostar', rota:'apostador/apostas', icon: 'thumbs_up_down'},
    {name: 'Grupos', rota:'apostador/grupos', icon: 'group_work'},
    {name: 'Ligas', rota:'admin/ligas', icon: 'import_contacts'},
    {name: 'Usuarios', rota:'admin/user', icon: 'people'},
    
  ]

  constructor(private _sidenavService: SidenavService) { }

  ngOnInit() {
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState
    
    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200)
    this._sidenavService.sideNavState$.next(this.sideNavState)
  }


}
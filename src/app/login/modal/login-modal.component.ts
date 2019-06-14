import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.css']
  })
export class LoginModalComponent {
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) {}

  @Input() usuario: any = {};

  open() {
    this.modalService.open(LoginModalComponent, 
      {
        ariaLabelledBy: 'modal-basic-title', 
        size: 'lg', 
         windowClass: 'custom-class'
    }
    );
  }
}

import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.css']
  })
export class LoginModalComponent {
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) {}

  open() {
    this.modalService.open(LoginModalComponent, {
      size: 'lg'
    });
  }
}

import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'x-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  message: any;
  private subscription = this.alertService.getAlert()
    .subscribe(message => {
      switch (message && message.type) {
        case 'success':
          message.cssClass = 'alert alert-success';
          break;
        case 'error':
          message.cssClass = 'alert alert-danger';
          break;
      }

      this.message = message;
    });

  constructor(private alertService: AlertService) { }

  ngOnInit() { }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

  onClose() {
    this.message = undefined;
  }
}

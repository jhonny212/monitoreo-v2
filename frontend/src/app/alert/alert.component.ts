import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from '../utils/alert-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  imports: [
    CommonModule
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit{
  message: string | null = null;
  type: 'success' | 'error' | 'info' | 'warning' = 'info';

  constructor(private alertService: AlertServiceService){
    
  }
  ngOnInit(): void {
    this.alertService.message$.subscribe(alert => {
      if (alert) {
        this.message = alert.message;
        this.type = alert.type;
      } else {
        this.message = null;
      }
    });
  }

  
}

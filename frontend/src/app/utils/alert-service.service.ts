import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type messageType = 'success' | 'error' | 'info' | 'warning'

@Injectable({
  providedIn: 'root',
})
export class AlertServiceService {
  constructor() {}

  private messageSubject = new BehaviorSubject<{
    message: string;
    type: messageType;
  } | null>(null);
  message$ = this.messageSubject.asObservable();

  showMessage(
    message: string,
    type: messageType
  ) {
    this.messageSubject.next({ message, type });
    setTimeout(() => this.messageSubject.next(null), 3000);
  }
}

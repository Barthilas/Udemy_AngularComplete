import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { stat } from 'fs';
import { AccountsService } from '../accounts.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService] //make a new instance of service, injecting is hierarchical, hence we dont need AccountService here
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private loggingService: LoggingService,
    private accountsService: AccountsService) {}

  onSetTo(status: string) {
    this.accountsService.updateStatus(this.id, status)
    this.accountsService.statusUpdated.emit(status)
    // this.loggingService.logStatusChange(status);
  }
}

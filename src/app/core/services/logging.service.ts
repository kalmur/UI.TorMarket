import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { interpretError } from './error-interpreter.function';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  constructor(
    private readonly toastr: ToastrService
  ) {}

  log(serviceName: string, error: HttpErrorResponse): any {
    const compiledMessage =
      `Failed to ${serviceName} ${interpretError(error)}`.trim() +
      '\nPlease refresh your page to see the latest changes.';
    this.toastr.error(compiledMessage);
    return compiledMessage;
  }
}

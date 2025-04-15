import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { interpretError } from './error-interpreter.function';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  constructor(private readonly toastr: ToastrService) {}

  log(serviceName: string, error: HttpErrorResponse): string {
    const compiledMessage =
      `Failed to ${serviceName} ${interpretError(error)}`.trim()
    this.toastr.error(compiledMessage);
    return compiledMessage;
  }
}

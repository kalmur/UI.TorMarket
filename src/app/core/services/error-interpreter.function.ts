import { HttpErrorResponse } from '@angular/common/http';

export function interpretError(error: HttpErrorResponse): string {
    let errorMessage = getErrorMessage(error).trim();

    if (!errorMessage.endsWith('.') && errorMessage !== '') {
        errorMessage += '.';
    }

    return errorMessage;
}

function getErrorMessage(error: HttpErrorResponse): string {
    if (error.error === null || error.error === void 0) {
        return error.statusText;
    }

    if(typeof error.error === 'string' && error.error.includes('The request timed out')) {
        return '';
    }

    if (typeof error.error === 'string') {
        return error.error;
    }

    if (error.error.modelState !== null && error.error.modelState !== void 0) {
        return getModelStateError(error);
    }

    if (error.error.Message !== null && error.error.Message !== void 0) {
        return error.error.Message;
    }

    if (
        Array.isArray(error.error) &&
        error.error.length > 0 &&
        error.error[0].Error
    ) {
        return error.error[0].Error;
    }

    return '';
}

function getModelStateError(error: HttpErrorResponse): string {
    let errorMessage = '';

    for (const fieldName in error.error.modelState) {
        if (fieldName !== null) {
            errorMessage = error.error.modelState[fieldName][0] + ' ';
        }
    }

    return errorMessage;
}
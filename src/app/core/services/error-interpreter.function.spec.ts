import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { interpretError } from '../auth/services/error-interpreter.function';

describe('[USER MANAGER] error-interpreter function', () => {
    const mockError: any = (additionalFields: any) => Object.assign(
        {},
        {
            type: HttpEventType.Response,
            headers: null,
            ok: false,
            name: 'HttpErrorResponse'
        },
        additionalFields
    );

    const mockModelStateError: HttpErrorResponse = mockError({
        error: {
            message: 'The request is invalid.',
            modelState: {
                userEmail: ['The Email field is not a valid e-mail address.']
            }
        },
        message:
            'Http failure response for https://tormakret/api/users: 400 Bad Request',
        status: 400,
        statusText: 'Bad Request',
        url: 'https://tormakret/api/users'
    });

    const mockGenericUnauthorizedError: HttpErrorResponse = mockError({
        error: null,
        message:
            'Http failure response for https://tormakret/api/users: 401 Unauthorized',
        status: 401,
        statusText: 'Unauthorized',
        url: 'https://tormakret/api/users'
    });

    const mockValidationError: HttpErrorResponse = mockError({
        error: 'Facility permissions cannot be specified for requested role.',
        message:
            'Http failure response for https://tormakret/api/users: 400 Bad Request',
        status: 400,
        statusText: 'Bad Request',
        url: 'https://tormakret/api/users'
    });

    const mockPermissionsError: HttpErrorResponse = mockError({
        error: { Message: 'Can not assign user to more than one role' },
        message:
            'Http failure response for https://permissions/api/permissions/307: 400 Bad Request',
        status: 400,
        statusText: 'Bad Request',
        url: 'https://permissions/api/permissions/307'
    });

    const mockTempAccessError: HttpErrorResponse = mockError({
        error: [{ Error: 'End date must be in the future.' }],
        message:
            'Http failure response for https://tenancy/api/tempaccess: 400 Bad Request',
        status: 400,
        statusText: 'Bad Request',
        url: 'https://tenancy/api/tempaccess'
    });

    const mockTempRequestTimeoutError: HttpErrorResponse = mockError({
        error: 'The request timed out',
        message:
            'Http failure response for https://tenancy/api/tempaccess: 500 Internal Server Error',
        status: 500,
        statusText: 'Internal Server Error',
        url: 'https://tenancy/api/tempaccess'
    });

    it('should extract the relevant message from mockPermissionsErrors', () => {
        const errorMessage = interpretError(mockPermissionsError);

        expect(errorMessage).toBe('Can not assign user to more than one role.');
    });

    it('should extract the relevant message from mockValidationErrors', () => {
        const errorMessage = interpretError(mockValidationError);

        expect(errorMessage).toBe(
            'Facility permissions cannot be specified for requested role.'
        );
    });

    it('should extract the relevant message from mockGenericUnauthorizedErrors', () => {
        const errorMessage = interpretError(mockGenericUnauthorizedError);

        expect(errorMessage).toBe('Unauthorized.');
    });

    it('should extract the relevant message from mockModelStateErrors', () => {
        const errorMessage = interpretError(mockModelStateError);

        expect(errorMessage).toBe(
            'The Email field is not a valid e-mail address.'
        );
    });

    it('should extract the relevant message from mockTempAccessErrors', () => {
        const errorMessage = interpretError(mockTempAccessError);

        expect(errorMessage).toBe('End date must be in the future.');
    });

    it('should return empty string for mockTempRequestTimeoutError', () => {
        const errorMessage = interpretError(mockTempRequestTimeoutError);

        expect(errorMessage).toBe('');
    });
});
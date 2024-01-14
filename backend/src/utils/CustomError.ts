export class CustomError extends Error {
    errors: { message: string };
    status: number;

    constructor(message: string, code: number) {
        super(message); // 'message' property is part of the standard Error object
        this.errors = {message};
        this.status = code;
    }
}

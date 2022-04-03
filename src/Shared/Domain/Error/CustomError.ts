export default class CustomError extends Error {
    constructor(readonly message: string = 'Error', readonly statusCode: number = 500) {
        super(message);
    }
}
import UserId from '../../../../Shared/Domain/Users/UserId';

export default class UserFoundPayload {
    constructor(readonly id: UserId) {
    }
}
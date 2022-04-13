import User from '../Domain/User';

export default class UserDTO {
    constructor(readonly id: string, readonly name: string) {}

    static fromEntity(user: User): UserDTO {
        return new UserDTO(user.id.value, user.name.value);
    }
}

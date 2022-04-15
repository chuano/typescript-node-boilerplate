import User from '../Domain/User';

export default class UserDto {
    constructor(readonly id: string, readonly name: string) {
    }

    static fromEntity(user: User): UserDto {
        return new UserDto(user.id.value, user.name.value);
    }
}

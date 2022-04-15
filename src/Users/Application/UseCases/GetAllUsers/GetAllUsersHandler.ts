import IUserRepository from '../../../Domain/IUserRepository';
import UserDto from '../../UserDto';

export default class GetAllUsersHandler {
    constructor(private readonly userRepository: IUserRepository) {
    }

    async handle(): Promise<UserDto[]> {
        const users = await this.userRepository.findAll();

        return users.map((user) => UserDto.fromEntity(user));
    }
}

import IUserRepository from '../../../Domain/IUserRepository';
import UserDTO from '../../UserDTO';

export default class GetAllUsersHandler {
    constructor(private readonly userRepository: IUserRepository) {
    }

    async handle(): Promise<UserDTO[]> {
        const users = await this.userRepository.findAll();

        return users.map((user) => UserDTO.fromEntity(user));
    }
}

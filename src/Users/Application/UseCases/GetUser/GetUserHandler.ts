import UserFinder from '../../../Domain/UserFinder/UserFinder';
import UserId from '../../../Domain/UserId';
import UserDTO from '../../UserDTO';
import GetUserQuery from './GetUserQuery';

export default class GetUserHandler {
    constructor(private readonly userFinder: UserFinder) { }

    async handle(query: GetUserQuery): Promise<UserDTO> {
        const user = await this.userFinder.find(new UserId(query.userId));

        return new UserDTO(user.id.value, user.name.value);
    }
}
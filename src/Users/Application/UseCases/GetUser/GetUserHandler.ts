import UserFinder from '../../../Domain/UserFinder/UserFinder';
import UserId from '../../../../Shared/Domain/Users/UserId';
import UserDTO from '../../UserDTO';
import GetUserQuery from './GetUserQuery';

export default class GetUserHandler {
    constructor(private readonly userFinder: UserFinder) { }

    async handle(query: GetUserQuery): Promise<UserDTO> {
        const user = await this.userFinder.find(new UserId(query.userId));

        return UserDTO.fromEntity(user);
    }
}

import UserFinder from '../../../Domain/UserFinder/UserFinder';
import UserId from '../../../../Shared/Domain/Users/UserId';
import UserDto from '../../UserDto';
import GetUserQuery from './GetUserQuery';
import {AppService} from '../../../../Shared/Domain/AppService';

@AppService()
export default class GetUserHandler {
    constructor(private readonly userFinder: UserFinder) {
    }

    async handle(query: GetUserQuery): Promise<UserDto> {
        const user = await this.userFinder.find(new UserId(query.userId));

        return UserDto.fromEntity(user);
    }
}

import UserId from '../../Shared/Domain/Users/UserId';
import UserName from './UserName';

export default class User {
    constructor(private _id: UserId, private _name: UserName) {
    }

    static fromPrimitives(id: string, name: string): User {
        return new User(
            new UserId(id),
            new UserName(name),
        );
    }

    get id(): UserId {
        return this._id;
    }

    private set id(id: UserId) {
        this._id = id;
    }

    get name(): UserName {
        return this._name;
    }

    private set name(name: UserName) {
        this._name = name;
    }
}
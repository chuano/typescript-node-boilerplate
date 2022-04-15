# Typescript node boilerplate
Personal usage typescript express application using Express as framework.

This project uses a Hexagonal Architecture approach, using a simple User aggregate as example.

## Features
- [x] TypeORM
- [x] Dependency Injection
- [x] Testing
- [x] JWT Authentication
- [x] Dotenv
- [x] EventBus
- [ ] RabbitMQ
- [ ] Generate PDF
- [ ] SOAP Client
- [ ] OpenAPI
- [ ] Migrations
- [ ] Linter

## Dependencies

### Express
- express
- compression
- cors
- helmet (security)
- morgan (loggin)
- express-async-errors
### Environment
- dotenv
### Jwt
- jsonwebtoken
### Dependency injection
- node-dependency-injection
### Database
- typeorm
### Testing
- jest
- ts-jest
- supertest
### Development
- nodemon
- tslint
- typescript
### Other
- glob
- prettier
## Maybe
https://www.npmjs.com/package/typescript-rest-swagger


## Event Bus system
The Event Bus is instantiated at the bootstrap of application and injected to dependency injection container.

The events are matched with his handlers by the handler public *eventClassName* property and the event class name. 

### Events
The events should implement IEvent interface
```typescript
import {IEvent} from '../../../../Shared/Domain/EventBus/IEvent';
import UserFoundPayload from './UserFoundPayload';

export class UserFound implements IEvent {
    constructor(readonly payload: UserFoundPayload) {
    }
}
```
Then you can publish them using publish method of EventBus.
```typescript
const event = new UserFound(new UserFoundPayload(userId));
await this.eventBus.publish(event);
```
### Handlers
The event handlers should implement IHandler interface.
```typescript
import {UserFound} from '../../../Domain/UserFinder/Event/UserFound';
import {IHandler} from '../../../../Shared/Domain/EventBus/IHandler';

export default class HandleUserFound implements IHandler {
    readonly eventClassName: string = UserFound.name;

    async handle(event: UserFound): Promise<void> {
        console.log(event.payload);
    }
}
```
They may be defined in the dependency injection configuration file tagged with EventHandler tag.
```yaml
Users.HandleUserFound:
    class: ./Users/Infrastructure/EntryPoint/Subscriber/HandleUserFound
    arguments: []
    tags:
      - { name: EventHandler}
```
Then they are automatically attached to event bus.

### Manual handler attachment
Handlers can be attached manually instead by dependency injection configuration.

```typescript
import HandleUserFound from './HandleUserFound';

eventBus.attach(new HandleUserFound());
```
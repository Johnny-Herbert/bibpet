import { User } from "../common/User";

export class Users {
    users: Array<User>;

    constructor(){
        this.users = new Array<User>();
    }

    create(user: User): User {
        return new User("","","");
    }
    read(email: String): Array<User> {
        return new Array<User>();
    }
    update(user: User): User {
        return new User("","","");
    }
    delete(email: String): User {
        return new User("","","");
    }
    login(email: String, password: String): User {
        return new User("","","");
    }
}
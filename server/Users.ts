import { User } from "../common/User";

export class Users {
    users: Array<User>;

    Users(){
        this.users = new Array<User>();
    }

    create(user: User){}
    read(email: String){}
    update(user: User){}
    delete(email: String){}
    login(email: String, password: String){}
}
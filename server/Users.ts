import { User } from "../common/User";

export class Users {
    users: User[];

    UserRepository(users: User[]){
        this.users = users;
    }

    create(user: User){}
    read(email: String){}
    update(user: User){}
    delete(email: String){}
    login(email: String, password: String){}
}
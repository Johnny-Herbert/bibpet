export class User {
    name: String;
    email: String;
    password: String;

    User(name: String, email: String, password: String){
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
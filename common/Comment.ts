import { User } from "./User";

export class Comment {
    id: number;
    text: string;
    user: User;

    Comment(id: number, text: string, user: User ) {
        this.id  = id;
        this.text = text;
        this.user  = user;
    }
}

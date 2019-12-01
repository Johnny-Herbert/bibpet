import { Comment } from "./Comment";
export class Comments{
    CommentList: Array<Comment>;
    create(comment: Comment){};
    read(id:number){};
    update(comment: Comment){};
    delete(id:number){};
}
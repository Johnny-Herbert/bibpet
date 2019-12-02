import { Comment } from "./Comment";
export class Comments{
    commentList: Array<Comment>;
    
    constructor(){
        this.commentList = new Array<Comment>();
    }

    create(comment: Comment){};
    read(id:number){};
    update(comment: Comment){};
    delete(id:number){};
}
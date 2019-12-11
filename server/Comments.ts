import { Comment } from "../common/Comment";
export class Comments{
    commentList: Array<Comment>;
    
    constructor(){
        this.commentList = new Array<Comment>();
    }

    create(comment: Comment): Comment{
        return
    };
    read(): Array<Comment>{
        return
    };
    update(comment: Comment){};
    delete(id:number){};
}
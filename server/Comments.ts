import { Comment } from "../common/Comment";
export class Comments{
    commentList: Array<Comment>;
    
    constructor(){
        this.commentList = new Array<Comment>();
    }

    create(newComment: Comment): Comment {
        if(!this.commentList.find(a => a.id == newComment.id)) {
            this.commentList.push(newComment)
            return newComment;
        }
    } 
    
    read(): Array<Comment>{
        return this.commentList;
    };

    update(newComment: Comment): Comment {
        var result: Comment = this.commentList.find(a => a.id == newComment.id)
        if(result && newComment.text !== "") {
            result.text = newComment.text;
        return result;
        }
    }

    delete(id:number): Comment{
        for(var i = 0; i < this.commentList.length; i++) {
            if(this.commentList[i].id = id) {
                var result = this.commentList[i];
                this.commentList.splice(i,1);
                return result;
            }
        }
    }
}
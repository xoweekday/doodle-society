import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Button, Comment, Form, Header, List } from 'semantic-ui-react'
const moment = require('moment');

const Comments = ({user, dood, getComment}) => {
    const[comments, setComments] = useState([]);
    const[comment, setComment] = useState("");
    const[showComments,setShowComments ] = useState(3);

    useEffect(() => {
        getComments()
        .then(result => setComments(result.data));
    },[]);
    
    useEffect(() => {
        console.log(showComments);
    })


    const getComments = () => {
        return axios.get(`/api/comments/${dood.id}`);
    }

    const addComments = () => {
        if(!comment){
            return;
        }
        axios.post('/api/comments', {doodle_id: dood.id, comment: comment, user_id: user.id})
        .then(() => {
         return getComments()   
        })
        .then((results) => setComments(results.data))
        .catch(err => console.error(err));
    }

    return(
        <Comment.Group>
            <List>
                <b>Comments</b>
                <hr></hr>
            </List>
            {!!showComments && <div className ='hideComments' onClick={() => setShowComments(0)}>hide comments</div>}
            {comments.slice(0, showComments).map((comment) => (
            <Comment>
                <Comment.Avatar src={comment.avatar}/>
                <Comment.Content>
                    <Comment.Author as='a'><b>{comment.username}</b></Comment.Author> 
                    <Comment.Metadata>
                    <div><font className="createdAt">{moment(comment.created_at).startOf('minute').fromNow()}</font></div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.comment}</Comment.Text>
                    <Comment.Actions>
                        <Comment.Action></Comment.Action>
                    </Comment.Actions>
                    <hr></hr>
                </Comment.Content>
            </Comment>
            ))
            }
            {!!comments.length && comments.length > showComments && <div className="headComment" dividing onClick={() => setShowComments(showComments + 3)}>
                 Show More Comments 
            </div>}
            <Form reply>
                <Form.TextArea id='comment' onChange={(e) =>{setComment(e.target.value)}}/>
                <Button onClick={() => addComments()} content='Reply' labelPosition='left' primary />
            </Form>
            
        </Comment.Group>
    )
};
export default Comments;
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { components } from 'react-select';
const moment = require('moment');

const Comments = ({user, dood, getComment}) => {
    const[comments, setComments] = useState([]);

    useEffect(() => {
        getComments()
        .then(result => setComments(result.data));
    },[]);
    

    const getComments = () => {
        return axios.get(`/api/comments/${dood.id}`);
    }

    console.log(user);
    const addComments = () => {
        const comment = document.getElementById('comment').value;
        axios.post('/api/comments', {doodle_id: dood.id, comment: comment, user_id: user.id})
        .then(() => {
         return getComments()   
        })
        .then((results) => setComments(results.data))
        .catch(err => console.error(err));
    }

    return(
        <Comment.Group>
            <Header as='h3' dividing>
                Comments
            </Header>
            { comments.map((comment) => (
            <Comment>
                <Comment.Avatar src={comment.avatar}/>
                <Comment.Content>
                    <Comment.Author as='a'><b>{comment.username}</b></Comment.Author> 
                    <Comment.Metadata>
                    </Comment.Metadata>
                    <Comment.Text>{comment.comment}</Comment.Text>
                    <div><font className="createdAt">{moment(comment.created_at).startOf('minute').fromNow()}</font></div>
                    <Comment.Actions>
                        <Comment.Action></Comment.Action>
                    </Comment.Actions>
                    <hr></hr>
                </Comment.Content>
            </Comment>
            ))
            }
            <Form reply>
                <Form.TextArea id='comment'/>
                <Button  onClick={() => addComments()} content='Reply' labelPosition='left' icon='edit' primary />
            </Form>
        </Comment.Group>
    )
};
export default Comments;
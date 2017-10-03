import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Comment, Divider} from 'semantic-ui-react'
import CreateCommentForm from './form'
import PostComment from './comment'

class PostComments extends Component {
  render () {
    const {comments} = this.props;
    const commentCount = comments.length;
    return (
      <Comment.Group>
        <Divider horizontal section>
          Comments
        </Divider>

        {commentCount === 0 && (
          <div>No comments.</div>
        )}

        {comments.map((comment, index) => (
          <PostComment key={comment.id} comment={comment} />
        ))}

        <Divider horizontal section>
          Add a comment
        </Divider>

        <CreateCommentForm />
      </Comment.Group>
    )
  }
}

const mapStateToProps = ({comments}) => ({comments});
export default connect(mapStateToProps)(PostComments)

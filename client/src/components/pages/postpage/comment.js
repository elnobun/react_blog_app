import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Comment, Icon, Divider} from 'semantic-ui-react'
import CreateCommentForm from './form'
import {deletePostCommentAsync, votePostCommentAsync } from '../../../actions/comments'
// import timeStamp from '../../../utils/timestamp'
import timeAgo from '../../../utils/timeago'

class PostComment extends Component {
  state = {edit: false};

  toggleEdit = () => {
    this.setState(prevState => ({edit: !prevState.edit}))
  };

  deleteComment = commentId => {
    this.props.deletePostCommentAsync({commentId})
  };

  upVoteComment = commentId => {
    this.props.votePostCommentAsync({commentId, vote: 'upVote'})
  };

  downVoteComment = commentId => {
    this.props.votePostCommentAsync({commentId, vote: 'downVote'})
  };

  render () {
    const {edit} = this.state;
    const {comment} = this.props;

    if (edit) {
      return (
        <CreateCommentForm
          toggleEdit={this.toggleEdit}
          commentId={comment.id}
          defaults={{body: comment.body, author: comment.author}}
        />
      )
    } else {
      return (
        <Comment key={comment.id}>
          <Comment.Content>
            <Comment.Author as='a'>{comment.author}</Comment.Author>
            <Comment.Metadata>
              <span>
              posted {timeAgo(comment.timestamp)}
              </span>
                <Icon disabled name='heart outline' /> {comment.voteScore}
            </Comment.Metadata>
            <Icon name='comments outline'/>
            <Comment.Text>{comment.body}</Comment.Text>
            <Comment.Actions>
              <Comment.Action onClick={() => this.toggleEdit()}>
                <Icon disabled name='edit' />
              </Comment.Action>
              <Comment.Action onClick={() => this.deleteComment(comment.id)}>
                <Icon disabled name='trash outline' />
              </Comment.Action>
              <Comment.Action onClick={() => this.downVoteComment(comment.id)}>
                <Icon disabled name='thumbs outline down' />
              </Comment.Action>
              <Comment.Action onClick={() => this.upVoteComment(comment.id)}>
                <Icon disabled name='thumbs outline up' />
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
          <Divider hidden/>
        </Comment>
      )
    }
  }
}

const mapStateToProps = ({post, comments}) => ({post, comments});
const mapDispatchToProps = {deletePostCommentAsync, votePostCommentAsync};
export default connect(mapStateToProps, mapDispatchToProps)(PostComment)

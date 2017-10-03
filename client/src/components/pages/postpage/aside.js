import React, {Component} from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Icon, Button, Segment} from 'semantic-ui-react'
import {deletePostAsync, votePostAsync} from '../../../actions/post'
import timeStamp from '../../../utils/timestamp'
import dateStamp from '../../../utils/datestamp'

class PostAside extends Component {
  editPost = () => {
    const {post} = this.props;
    this.props.history.push(`/${post.category}/${post.id}/edit`)
  };

  deletePost = () => {
    this.props
      .deletePostAsync({postId: this.props.post.id})
      .then(() => this.props.history.push(`/`))
  };

  render () {
    const {post} = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Icon name='user' />
          {post.author}
        </Segment>
        <Segment>
          <Icon disabled name='tag' />
          {post.category} category
        </Segment>
        <Segment>
          <Icon disabled name='heart outline' />
          {post.voteScore} likes

          <Button
            basic
            compact
            size='small'
            floated='right'
            color='green'
            icon='arrow up'
            onClick={() =>
              this.props.votePostAsync({postId: post.id, vote: 'upVote'})}
          />
          <Button
            basic
            compact
            size='small'
            floated='right'
            color='red'
            icon='arrow down'
            onClick={() =>
              this.props.votePostAsync({postId: post.id, vote: 'downVote'})}
          />
        </Segment>

        <Segment>
          <div>
            <Icon disabled name='calendar'/>{dateStamp(post.timestamp)}
          </div>
        </Segment>
        <Button
          disabled
          basic
          content='Time of Post'
          icon='alarm'
          label={{as: 'a', basic: true, content: `${timeStamp(post.timestamp)}`}}
          labelPosition='right'
        />
        <Button.Group attached='bottom'>
          <Button
            basic color='blue'
            size='small'
            icon='edit'
            content='Edit'
            onClick={this.editPost}
          />
          <Button
            basic color='red'
            size='small'
            icon='trash outline'
            content='Delete'
            onClick={this.deletePost}
          />
        </Button.Group>
      </Segment.Group>
    )
  }
}

const mapStateToProps = ({post}) => ({post});
const mapDispatchToProps = {deletePostAsync, votePostAsync};
const enhance = compose(connect(mapStateToProps, mapDispatchToProps), withRouter);
export default enhance(PostAside)

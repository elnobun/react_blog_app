import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { Container, Grid, Header, Message, Divider } from 'semantic-ui-react'
import {isEmpty} from 'lodash'
import PageHeader from '../../header'
import SiteFooter from '../../footer'
import PostComments from './comments'
import PostAside from './aside'
import {fetchPostAsync} from '../../../actions/post'
import {fetchPostCommentsAsync} from '../../../actions/comments'
import marked from '../../../utils/marked'

class Post extends Component {
  componentDidMount () {
    this.fetchData()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.fetchData()
    }
  }

  fetchData = () => {
    const {postId} = this.props.match.params;
    this.props.fetchPostAsync(postId);
    this.props.fetchPostCommentsAsync(postId)
  };

  render () {
    const {post} = this.props;
    const linkStyle = {fontWeight: 500, textDecoration: 'underline'};
    return (
      <div>
        <Divider hidden/>
        <PageHeader params={this.props.match.params} />
        <Container>
          {isEmpty(post) ? (
            <Message negative>
              <Message.Header>Post not found</Message.Header>
              <p>
                You may want to view the{' '}
                <Link to='/' style={linkStyle}>
                  post listings page
                </Link>{' '}
                or{' '}
                <Link to='/new' style={linkStyle}>
                  create a new post
                </Link>.
              </p>
            </Message>
          ) : (
            <Grid centered>
              <Grid.Column width={12}>
                <div>
                  <Header as='h2'>Title: {post.title}</Header>
                  {post.body && (
                    <div
                      dangerouslySetInnerHTML={{__html: marked(post.body)}}
                    />
                  )}
                </div>
                <PostComments />
              </Grid.Column>
              <Grid.Column width={4}>
                <PostAside />
              </Grid.Column>
            </Grid>
          )}
        </Container>
        <SiteFooter />
      </div>
    )
  }
}

const mapStateToProps = ({post, comments}) => ({post, comments});
const mapDispatchToProps = {fetchPostAsync, fetchPostCommentsAsync};
export default connect(mapStateToProps, mapDispatchToProps)(Post)

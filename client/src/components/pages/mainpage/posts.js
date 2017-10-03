import React, { Component } from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Card, Icon, Container, Divider, Grid, Feed } from 'semantic-ui-react'
import marked from '../../../utils/marked'
import dateStamp from '../../../utils/datestamp'
import timeAgo from '../../../utils/timeago'
import timeStamp from '../../../utils/timestamp'

class MainpagePosts extends Component {

  moveToPost = post => {
    this.props.history.push(`/${post.category}/${post.id}`)
  };

  render () {
    const {posts} = this.props;
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={13}>
              <Card.Group>
                {posts.map(post => (
                  <Card key={post.id}>
                    <Card.Content header={post.title}/>
                    <Card.Content extra>
                      <Icon name='user'/> {post.author}
                      <span className='right floated'>
                  <Icon disabled name='tag'/>{post.category} category
                </span>
                    </Card.Content>
                    <Card.Content>
                      <Card.Description>
                        {post.body && (
                          <div
                            dangerouslySetInnerHTML={{__html: marked(post.body)}}
                            style={{maxHeight: 150, overflow: 'hidden'}}
                          />
                        )}
                        <Divider hidden/>
                        <Button basic color='teal' onClick={() => this.moveToPost(post)}>
                          <Icon name="book"/>view post</Button>
                      </Card.Description>
                    </Card.Content>

                    <Card.Content extra>
                      <div>
                        <Icon disabled name='calendar'/>{dateStamp(post.timestamp)}
                        <span className='right floated'>
                          <Icon disabled name='alarm'/>{timeStamp(post.timestamp)}
                        </span>
                      </div>

                    </Card.Content>
                    <Card.Description>
                      <Button
                        disabled
                        basic
                        content='Likes'
                        icon='heart'
                        label={{as: 'a', basic: true, content: `${post.voteScore}`}}
                        labelPosition='right'
                      />
                    </Card.Description>
                  </Card>
                ))}
              </Card.Group>
            </Grid.Column>

            <Grid.Column width={3}>
              <Divider horizontal section>
                <Icon name='feed'/> Post FEED
              </Divider>
              <Feed size='small'>
                {posts.map(post => (
                  <Feed.Event key={post.id}>
                    <Feed.Label>
                      <img src='' alt=''/>
                    </Feed.Label>
                    <Feed.Content>
                      <Feed.Summary>
                        <Feed.User onClick={() => this.moveToPost(post)}>{post.author}</Feed.User> posted
                        <Feed.Date>{timeAgo(post.timestamp)}</Feed.Date>
                      </Feed.Summary>

                    </Feed.Content>
                  </Feed.Event>
                ))}
              </Feed>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = ({posts}) => ({posts});
const enhance = compose(connect(mapStateToProps), withRouter);

export default enhance(MainpagePosts)

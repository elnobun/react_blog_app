import React, {Component} from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Container, Dropdown } from 'semantic-ui-react'
import {sortPosts} from '../../../actions/posts'

class MainpageControls extends Component {

  render () {
    const {sortPosts} = this.props;
    return (
      <Container>
        <Dropdown basic text='Filter Posts' icon='filter' floating labeled button className='icon'>
          <Dropdown.Menu>
            <Dropdown.Header icon='tags' content='Filter By'/>
            <Dropdown.Divider/>
            <Dropdown.Item onClick={() => sortPosts('title')}>Title</Dropdown.Item>
            <Dropdown.Item onClick={() => sortPosts('-timestamp')}>Latest</Dropdown.Item>
            <Dropdown.Item onClick={() => sortPosts('timestamp')}>Oldest</Dropdown.Item>
            <Dropdown.Item onClick={() => sortPosts('-voteScore')}>Votes</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    );
  }
}

const mapStateToProps = ({categories, posts}) => ({categories, posts});
const mapDispatchToProps = {sortPosts};
const enhance = compose(connect(mapStateToProps, mapDispatchToProps), withRouter);

export default enhance(MainpageControls)

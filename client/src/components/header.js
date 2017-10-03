import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {withRouter} from 'react-router-dom'
import { Menu, Container, Divider, Icon } from 'semantic-ui-react'
import {fetchCategoriesAsync} from '../actions/categories'
import { resetPost } from '../actions/post'

class Header extends Component {
  componentDidMount () {
    this.fetchData()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.params !== this.props.params) {
      this.fetchData()
    }
  }

  fetchData = () => {
    this.props.fetchCategoriesAsync()
  };

  selectedCategory = location => {
    this.props.history.push(location)
  };

  newPost = () => {
    this.props.resetPost();
    this.props.history.push('/new')
  };

  render () {
    const {categories} = this.props;
    return (
      <div>
        <Menu pointing secondary>
          <Container>
            <Menu.Item
              name=''
              active={this.props.params.category == null}
              onClick={() => this.selectedCategory('/')}
            >
              All Posts
            </Menu.Item>

            {categories.map(category => (
              <Menu.Item
                key={category.path}
                name={category.path}
                active={this.props.params.category === category.path}
                onClick={() => this.selectedCategory(`/${category.path}`)}
              >
                {category.name}
              </Menu.Item>
            ))}

            <Menu.Menu position='right'>
              <Menu.Item onClick={this.newPost}>
                <Icon name='plus'/>Add Post
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
        <Divider hidden/>
      </div>
    )
  }
}

const mapStateToProps = ({categories, posts}) => ({categories, posts});
const mapDispatchToProps = {fetchCategoriesAsync, resetPost};
const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
);

export default enhance(Header)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Divider} from 'semantic-ui-react'
import PageHeader from '../../header'
import SiteFooter from '../../footer'
import MainpageControls from './filters'
import MainpagePosts from './posts'
import {fetchPostsAsync, fetchCategoryPostsAsync} from '../../../actions/posts'

class Mainpage extends Component {
  componentDidMount () {
    this.fetchData()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.fetchData()
    }
  }

  fetchData = () => {
    const {category} = this.props.match.params;
    if (category != null) {
      this.props.fetchCategoryPostsAsync(category)
    } else {
      this.props.fetchPostsAsync()
    }
  };

  render () {
    return (
      <div>
        <Divider hidden />
        <PageHeader params={this.props.match.params} />
        <MainpageControls />
        <Divider hidden />
        <MainpagePosts />
        <SiteFooter />
      </div>
    )
  }
}

const mapStateToProps = ({categories, posts}) => ({categories, posts});
const mapDispatchToProps = {fetchPostsAsync, fetchCategoryPostsAsync};
export default connect(mapStateToProps, mapDispatchToProps)(Mainpage)

import React from 'react';

import Loading from 'react-loading';

import { RoutedComponent, connect } from 'routes/routedComponent';
import GoogleResults from './components/GoogleResults';
import { getMonitoring } from '../Monitoring/modules/monitoring';
import { getGoogleResults, requestRemoval } from './modules/googleResults';
import { addCurrentKeyword } from 'routes/client/Keywords/modules/keywords';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

class GoogleResultsContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true,
      pageNum: 1
    }

    this.getResults = this.getResults.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
    this.handleRemoval = this.handleRemoval.bind(this);
    this.showAlertMessage = this.showAlertMessage.bind(this);
    this.hideAlertMessage = this.hideAlertMessage.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.keywords.all.length > 0 ?
      this.getResults(this.props.keywords.all[0])
        :
          this.context.router.push('/keywords')
  }

  getLayoutOptions() {
    return {
      contentView: CONTENT_VIEW_STATIC,
      sidebarEnabled: true,
      navbarEnabled: true,
      footerEnabled: true,
      headerEnabled: true
    }
  }

  getNextPage(pageNum) {
    this.getResults(this.props.keywords.currentKeyword, pageNum)
  }

  handleRemoval(id) {
    const payload = { request: { search_result_id: id }}
    this.props.requestRemoval(payload)
    .then( (res) => this.showAlertMessage())
    .catch( (error) => this.showAlertMessage())
  }

  showAlertMessage() {
    this.setState({showModal: true})
  }

  hideAlertMessage() {
    this.setState({showModal: false})
  }

  getResults(keyword, pageNum=1) {
    const { account_id } = this.props.currentUser
    const keyword_id = keyword.id
    const payload = { pageNum, keyword_id, account_id }
    this.props.addCurrentKeyword(keyword)
    this.props.getGoogleResults(payload);
    this.setState({ isFetching: true, pageNum: parseInt(pageNum) })
  }

  componentWillReceiveProps(nextProps) {
    !nextProps.googleResults.isFetching &&
      setTimeout(() => this.setState({isFetching: false}), 1500)
  }

  render() {
    return (
        <GoogleResults
          results={this.props.googleResults.all}
          pagination={this.props.googleResults.pagination}
          keywords={this.props.keywords}
          isFetching={this.state.isFetching}
          getResults={this.getResults}
          getNextPage={this.getNextPage}
          pageNum={this.state.pageNum}
          handleRemoval={this.handleRemoval}
          showModal={this.state.showModal}
          hideModal={this.hideAlertMessage}
        />
    )
  }
}

const mapStateToProps = state => {
  return {
    googleResults: state.googleResults,
    currentUser: state.currentUser,
    keywords: state.keywords
  }
}

const mapActionCreators = {
  getGoogleResults,
  addCurrentKeyword,
  requestRemoval
}

export default connect(mapStateToProps, mapActionCreators)(GoogleResultsContainer);

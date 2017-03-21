import React, { Component } from 'react';
import Loading from 'react-loading';
import { Redirect } from 'react-router';

import { RoutedComponent, connect } from 'routes/routedComponent';
import GoogleResults from './components/GoogleResults';
import { getGoogleResults } from 'modules/googleResults';
import { addCurrentKeyword } from 'modules/keywords';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';

class GoogleResultsContainer extends RoutedComponent {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true,
      isLoggedIn: !!props.currentUser.id
    }

    this.getResults = this.getResults.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
  }

  componentWillMount() {
    this.state.isLoggedIn ? (
       this.isInitialRendering && this.getResults(this.props.keywords.all[0])
    ) : (
    <Redirect to={{
      pathname:'/login',
      state: { from: props.location }
    }}
    />
    )


  }

  isInitialRendering() {
    !this.props.currentKeyword
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

  getResults(keyword, pageNum = '1') {
    const account_id = this.props.currentUser.account_id
    const keyword_id = keyword.id
    const params = { pageNum, keyword_id, account_id }
    const authToken = this.props.currentUser.access_token
    this.props.addCurrentKeyword(keyword)
    this.props.getGoogleResults(params, authToken);
    this.setState({ isFetching: true })
  }

  componentWillReceiveProps(nextProps) {
    !nextProps.googleResults.isFetching &&
      setTimeout(() => this.setState({isFetching: false}), 3000)
  }

  render() {
    console.log('keywords', this.props.keywords.currentKeyword.value)
    return (
        <GoogleResults
          results={this.props.googleResults.results}
          keywords={this.props.keywords}
          isFetching={this.state.isFetching}
          getResults={this.getResults}
          getNextPage={this.getNextPage}
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
  addCurrentKeyword
}

export default connect(mapStateToProps, mapActionCreators)(GoogleResultsContainer);

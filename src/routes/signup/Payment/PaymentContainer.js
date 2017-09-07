import React from 'react';

import Payment from './components/Payment';
import PaymentComplete from './components/PaymentComplete';
import { RoutedComponent, connect } from 'routes/routedComponent';
import { postPayment } from './modules/payment';
import { CONTENT_VIEW_STATIC } from 'layouts/DefaultLayout/modules/layout';


class PaymentContainer extends RoutedComponent {
  constructor() {
    super()

    this.submitForm = this.submitForm.bind(this);
    this.buildParams = this.buildParams.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.hasKeywords = this.hasKeywords.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  getLayoutOptions() {
    return {
      contentView: CONTENT_VIEW_STATIC,
      sidebarEnabled: false,
      navbarEnabled: true,
      footerEnabled: true,
      headerEnabled: false,
    }
  }

  sanitizeNums(value) {
    return value.replace(/[^\d]/gi, '')
  }

  toLowerCase(name) {
    return name.toLowerCase()
  }

  buildParams(values) {
    return {
      user: this.props.currentUser.id,
      card_holder_name: values.fullName,
      card_number: this.sanitizeNums(values.creditCardNumber),
      card_month: values.expirationMonth,
      card_year: values.expirationYear,
      card_cvc: values.cvCode,
      address: values.address,
      city: values.city,
      state: values.state,
      zip: values.zipcode,
      plan: 'individual'
    }
  }

  submitForm(formProps) {
    let params = this.buildParams(formProps)
    this.props.postPayment(params)
  }

  handleClick() {
    if(this.hasKeywords()) {
      this.context.router.push('/dashboard')
    }
    this.context.router.push('/keywords')
  }

  hasKeywords() {
    if(this.props.keywords.all) {
      return this.props.keywords.all > 0
    }
    return false
  }

  render() {
    if(!this.props.payment.success && this.props.currentUser.id) {
      return <Payment
        submitForm={this.submitForm}
        errorMessage={this.props.payment.errorMessage}
        isFetching={this.props.payment.isFetching}
        />
    } else {
      return  <PaymentComplete
        handleClick={this.handleClick}
      />
    }
  }
}

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    errorMessage: state.errorMessage,
    planSelection: state.planSelection,
    keywords: state.keywords,
    payment: state.payment
})

const mapActionCreators = {
  postPayment
}

export default connect(mapStateToProps, mapActionCreators)(PaymentContainer);
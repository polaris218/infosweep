import BlitzApi from 'services/BlitzApi';

// action types
export const SUBSCRIPTIONS_PENDING = 'SUBSCRIPTIONS_PENDING';
export const SUBSCRIPTIONS_SUCCESS = 'SUBSCRIPTIONS_SUCCESS';
export const SUBSCRIPTIONS_FAILURE = 'SUBSCRIPTIONS_FAILURE';
export const SUBSCRIPTION_UPDATE_PENDING = 'SUBSCRIPTION_UPDATE_PENDING'
export const SUBSCRIPTION_UPDATE_SUCCESS = 'SUBSCRIPTION_UPDATE_SUCCESS'
export const SUBSCRIPTION_UPDATE_FAILURE = 'SUBSCRIPTION_UPDATE_FAILURE'

export const SUBSCRIPTIONS_REQUEST = '/admin/api/subscriptions';

// actions
export const getSubscriptions = (params, pageNum) => {
  const path = `${SUBSCRIPTIONS_REQUEST}/${pageNum}`
  return dispatch => {
    dispatch(gettingSubscriptions())
    return BlitzApi.get(path, params)
    .then(
      response => dispatch(receiveSubscriptions(response.data)))
      .catch(
        error => dispatch(receiveSubscriptionsFailure(error)))
  }
}

export const updateSubscription = (id, params) => {
  return dispatch => {
    dispatch(updatingSubscription())
    return BlitzApi.patch(`${SUBSCRIPTIONS_REQUEST}/${id}`, params)
    .then(
      response => dispatch(receiveSubscriptionUpdate(response.data)))
      //response => console.log('response', response))
      .catch(
        error => dispatch(receiveSubscriptionUpdateFailure(error)))
        //error => console.log('error', error))
  }
}

export const updatingSubscription = () => (
  {
    type: SUBSCRIPTION_UPDATE_PENDING
  }
)

export const receiveSubscriptionUpdate = data => (
  {
    type: SUBSCRIPTION_UPDATE_SUCCESS,
    data
  }
)

export const receiveSubscriptionUpdateFailure = error => (
  {
    type: SUBSCRIPTION_UPDATE_FAILURE,
    error
  }
)

export const gettingSubscriptions = () => (
  {
    type: SUBSCRIPTIONS_PENDING
  }
)

export const receiveSubscriptions = data => (
  {
    type: SUBSCRIPTIONS_SUCCESS,
    data
  }
)

export const receiveSubscriptionsFailure = error => (
  {
    type: SUBSCRIPTIONS_FAILURE,
    error
  }
)

// reducer
const reducer = (state={}, action) => {
  switch(action.type) {
    case SUBSCRIPTIONS_PENDING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case SUBSCRIPTIONS_SUCCESS:
      return Object.assign({}, state, {
        all: action.data.subscriptions,
        pagination: action.data.meta.pagination,
        isFetching: false,
      });
    case SUBSCRIPTIONS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    case SUBSCRIPTION_UPDATE_PENDING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case SUBSCRIPTION_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case SUBSCRIPTION_UPDATE_FAILURE:
      return Object.assign({}, state, {
        errorMessage: error.response.data.errorMessage,
        isFetching: false
      });
    default:
      return state
  }
  return state
}

export default reducer;

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { submitKeyword } from 'routes/admin/Dashboard/User/modules/keywords';
import {
    Col,
    Modal,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from 'components';

const renderInput = ({ input, type }) => {
  return (
    <FormControl
      {...input}
      type={type}
    />
  )
}

const KeywordModal = props => {

  const _onSubmit = data => {
    props.hideModal()
    props.dispatch(submitKeyword(data, props.account.id))
  }

  return (
      <Modal show={ true } onHide={props.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            { 'Add Keyword ' }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={props.handleSubmit(_onSubmit)} horizontal>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Keyword
              </Col>
              <Col sm={9}>
                <Field
                  name='value'
                  type='text'
                  component={renderInput}
                />
              </Col>
            </FormGroup>
            <Modal.Footer>
              <Button onClick={props.hideModal}>Close</Button>
              <Button bsStyle='primary' type='submit'>Save</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
  );
}

const reduxUserEdit = reduxForm({
  form: 'keywordNew'
})(KeywordModal)

export default connect()(reduxUserEdit);

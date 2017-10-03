import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Formik } from 'formik'
import { filter, isEmpty } from 'lodash'
import yup from 'yup'
import {Button, Form, TextArea, Message, Icon} from 'semantic-ui-react'
import { createPostCommentAsync, editPostCommentAsync } from '../../../actions/comments'

class CreateCommentForm extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.defaults !== this.props.defaults) {
      this.props.resetForm(nextProps)
    }
  }


  render () {
    const {
      defaults,
      values,
      handleChange,
      handleSubmit,
      onSubmission,
      errors,
      touched
    } = this.props;
    const displayErrors = filter(errors, (_error, key) => touched[key]);

    return (
      <div>
        <Form size='small' onSubmit={handleSubmit} loading={onSubmission}>

          {displayErrors.length > 0 && (
            <Message negative>
              <Message.Header>Oops!</Message.Header>
                {displayErrors.map(error => (
                  <p key={error}><Icon name='close'/>{error}</p>
                ))}
            </Message>
          )}

          <Form.Field>
            <label>Name</label>
            <input
              type='text'
              name='author'
              value={values['author']}
              placeholder='Name'
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Message</label>
            <TextArea
              name='body'
              value={values['body']}
              placeholder='Message'
              onChange={handleChange}
              autoHeight
            />
          </Form.Field>

          <Button
            basic
            color='teal'
            disabled={onSubmission}
            size='small'
            icon='comments outline'
            labelPosition='left'
            content={isEmpty(defaults) ? 'Add comment' : 'Edit comment'}
          />
        </Form>
      </div>
    )
  }
}

const defaultStr = yup
  .string()
  .default('')
  .trim();
const schema = yup.object({
  author: defaultStr.label('Name').required('Please add a Name'),
  body: defaultStr.label('Message').required('Whats on your Mind?')
});

const formikConfig = {
  displayName: 'CreateCommentForm',
  validationSchema: schema,
  validateOnChange: true,
  mapPropsToValues: ({defaults = {}}) => ({...schema.default(), ...defaults}),
  handleSubmit: (payload, {props, setSubmitting, resetForm}) => {
    const createComment = ({body, author}) => {
      const parentId = props.post.id;
      return props.createPostCommentAsync({body, author, parentId})
    };

    const editComment = ({body, author}) => {
      const id = props.commentId;
      return props.editPostCommentAsync({body, author, id})
    };

    if (isEmpty(props.defaults)) {
      createComment({
        body: payload.body,
        author: payload.author
      }).then(() => {
        setSubmitting(false);
        resetForm()
      })
    } else {
      editComment({
        id: props.commentId,
        body: payload.body,
        author: payload.author
      }).then(() => {
        setSubmitting(false);
        props.toggleEdit()
      })
    }
  }
};

const mapStateToProps = ({post}) => ({post});
const mapDispatchToProps = {createPostCommentAsync, editPostCommentAsync};
const enhance = compose(connect(mapStateToProps, mapDispatchToProps), Formik(formikConfig));
export default enhance(CreateCommentForm)

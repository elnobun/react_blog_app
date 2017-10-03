import React, {Component} from 'react'
import {compose} from 'recompose'
import {Formik} from 'formik'
import {filter} from 'lodash'
import {withRouter} from 'react-router-dom'
import yup from 'yup'
import { Button, Form, TextArea, Message, Icon, Grid } from 'semantic-ui-react'

class CrudpageForm extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.defaults !== this.props.defaults) {
      this.props.resetForm(nextProps)
    }
  }

  cancel = () => {
    const {postId, defaults, history} = this.props;
    if (postId) {
      history.push(`/${defaults.category}/${postId}`)
    } else {
      history.push(`/`)
    }
  };

  render () {
    const {
      categories,
      values,
      handleChange,
      handleSubmit,
      onSubmission,
      errors,
      touched
    } = this.props;
    const displayErrors = filter(errors, (_error, key) => touched[key]);

    const form = (
      <Form onSubmit={handleSubmit} loading={onSubmission}>

        {displayErrors.length > 0 && (
          <Message negative>
            <Message.Header>Oops!</Message.Header>
              {displayErrors.map(error => (
                <p key={error}><Icon name='close'/>{error}</p>
              ))}
          </Message>
        )}

        <Form.Field>
          <label>Title</label>
          <input
            type='text'
            name='title'
            value={values['title']}
            onChange={handleChange}
            placeholder='title'/>
        </Form.Field>

        <Form.Field>
          <label>Body</label>
          <TextArea
            name='body'
            value={values['body']}
            onChange={handleChange}
            autoHeight
            placeholder='body'/>
        </Form.Field>

        <Form.Field>
          <label>Author</label>
          <input
            type='text'
            name='author'
            value={values['author']}
            onChange={handleChange}
            placeholder='author'/>
        </Form.Field>

        <Form.Field id='category'>
          <label>Category</label>
          <select
            name='category'
            value={values['category']}
            onChange={handleChange}
            className='ui selection dropdown'
            placeholder='category'>

            <option
              disabled
              value=''>
              Select Category
            </option>
            {categories.map(category => (
              <option
                key={category.name}
                value={category.name}
              >
                {category.name}
              </option>
            ))}
          </select>
        </Form.Field>

        <Button basic color='blue' disabled={onSubmission}><Icon name='checkmark'/> Submit</Button>

        <Button basic color='red' onClick={this.cancel}><Icon name='chevron left'/>Cancel</Button>
      </Form>
    );

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            {form}
          </Grid.Column>

          <Grid.Column width={4}>
            Hello
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

//
// const defaultStr = yup.string().default('')
//
// const modelSchema = yup.object({
//   name: yup.object({
//     title: defaultStr.required('please enter a title'),
//     body: defaultStr.required('What is on your mind?'),
//     author: defaultStr.required('please identify yourself'),
//     category: defaultStr.required('please select a category'),
//   })
// })


const defaultStr = yup
  .string()
  .default('')
  .trim();

const schema = yup.object({
  title: defaultStr.required('Title: Please enter a title'),
  body: defaultStr.required('Body: Whats on your mind?'),
  author: defaultStr.required('Author: Please identify yourself'),
  category: defaultStr.required('Caregory: Please select a category')
});

const formikConfig = {
  displayName: 'CreateEditForm',
  validationSchema: schema,
  validateOnChange: true,
  mapPropsToValues: ({defaults = {}}) => ({...schema.default(), ...defaults}),
  handleSubmit: (payload, {props, setSubmitting}) => {
    setSubmitting(false);
    props.postId
      ? props.editPost({post: payload, postId: props.postId})
      : props.createPost({post: payload})
  }
};

const enhance = compose(Formik(formikConfig), withRouter);
export default enhance(CrudpageForm)

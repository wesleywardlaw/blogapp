import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts, editPost } from '../actions';

class PostsEdit extends Component{

	componentDidMount(){
		this.props.fetchPosts();
	}

	renderField(field){

		const { meta: { touched, error } } = field;
		const className = `form-group ${touched&&error ? 'has-danger':''}`;
		return(
		
			<div className={className}>
				<label>{field.label}</label>
				<input className="form-control"
					type="text"
					value={field.defaultValue}

					{...field.input}
				/>
				<div className="text-help">
					{touched ? error: ''}
				</div>
			</div>
		);
	}

	onSubmit(values){
		console.log(values);
		const { id } = this.props.match.params;
		this.props.editPost(values, id, () => {
			this.props.history.push('/');
		});
	}

	render(){
		const { handleSubmit } = this.props;
			return(

				<div>
				<h1>Edit Post</h1>

				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field
						label="Title"
						name="title"
						component={this.renderField}
						

					/>
					<Field
						label="Categories"
						name="categories"
						component={this.renderField}
						

					/>
					<Field
						label="Post Content"
						name="content"
						component={this.renderField}
						

					/>
					<button type="submit" className="btn btn-primary">Submit</button>
					<Link to="/" className="btn btn-danger">Cancel</Link>
				</form>

				</div>
			);
	}
}

function validate(values){
	const errors = {};
	//validate inputs from values object
	if(!values.title){
		errors.title = "Enter a title"
	}
	if(!values.categories){
		errors.categories = "Enter some categories"
	}
	if(!values.content){
		errors.content = "Enter some content please"
	}

 
	//if errors is empty, the form is fine to submit
	//if errors has *any* properties reduxform assumes form is invalid
	return errors;
}


PostsEdit = reduxForm({
  form: 'postsEdit', // a unique identifier for this form
  validate
})(PostsEdit)

// You have to connect() to any reducers that you wish to connect to yourself
PostsEdit = connect(
  (state, ownProps) => ({
    initialValues: state.posts[ownProps.match.params.id]// pull initial values reducer
  }),
  {fetchPosts, editPost} // bind action creators
)(PostsEdit);

export default PostsEdit;
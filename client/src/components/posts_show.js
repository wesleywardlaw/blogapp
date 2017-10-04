import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component{
	componentDidMount(){
		const { id } = this.props.match.params;
		this.props.fetchPost(id);
	}

	onDeleteClick(){
		const { id } = this.props.match.params;
		this.props.deletePost(id, () =>{
			this.props.history.push('/');
		});
	}

	render(){
		const { post } = this.props;
		const { id } = this.props.match.params;

		if(!post){
			return <div>Loading...</div>
		}
		return(
			<div>
				<Link to="/">Back to Index</Link>
				
				<button
					className="btn btn-danger pull-xs-right"
					onClick = {this.onDeleteClick.bind(this)}
				>
					Delete Post
				</button>
				<Link className="btn btn-warning pull-xs-right" to={`/posts/${id}/edit`}>
					Edit Post
				</Link>
					<div className="card card-block">
					<h3 className="card-title">{post.title}</h3>
					<h6>Categories: {post.categories}</h6>
					<p className="card-text">{post.content}</p>
					</div>
			</div>
		);
	}
}

function mapStateToProps({ posts }, ownProps){
	return {post:posts[ownProps.match.params.id]};
}
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
import axios from 'axios';


export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const EDIT_POST = 'edit_post';
export const FETCH_POST = 'fetch_post;'
export const DELETE_POST = 'delete_post';

const ROOT_URL = 'http://localhost:3090';

export function fetchPosts(){
	const request = axios.get(`${ROOT_URL}/blogs`);
	return {
		type: FETCH_POSTS,
		payload: request
	}
}

export function createPost(values, callback){
	const request = axios.post(`${ROOT_URL}/blogs`, values)
		.then(() => callback());

	return{
		type: CREATE_POST,
		payload: request
	};
}

export function editPost(values, id, callback){
	const request = axios.put(`${ROOT_URL}/blogs/${id}`, values)
		.then(() => callback());

	return{
		type: EDIT_POST,
		payload: request
	}
}

export function fetchPost(id){
	const request = axios.get(`${ROOT_URL}/blogs/${id}`);

	return{
		type: FETCH_POST,
		payload: request
	};
}

export function deletePost(id, callback){
	const request = axios.delete(`${ROOT_URL}/blogs/${id}`)
		.then(()=>callback());

	return{
		type: DELETE_POST,
		payload: id
	}
}
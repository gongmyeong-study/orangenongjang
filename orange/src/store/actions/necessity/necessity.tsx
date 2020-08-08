import axios from 'axios';
import { Dispatch } from 'redux';
import { necessityConstants } from '../actionTypes';


// 생필품 구매목록 추가 기능

const createSuccess = (necessities: any) => ({
	type: necessityConstants.CREATE_SUCCESS,
	target: necessities,
});

const createFailure = (error: any) => {
	let actionType = null;
	switch (error.response.status) {
		default:
			actionType = necessityConstants.CREATE_FAILURE;
			break;
	}
	return {
		type: actionType,
		target: error,
	};
};

const removeSuccess = (necessities: any) => ({
	type: necessityConstants.REMOVE_SUCCESS,
	target: necessities,
});

const removeFailure = (error: any) => {
	let actionType = null;
	switch (error.response.status){
		default:
			actionType = necessityConstants.REMOVE_FAILURE;
			break;
	}
	return {
		type: actionType,
		target: error,
	};
};

export const createNecessity = (
	name: string, option: string, description: string, price: string
	) => (dispatch: Dispatch) => axios.post('/api/v1/necessity/', { name, option, description, price })
	.then((createResponse) => dispatch(createSuccess(createResponse.data)))
	.catch((createError) => dispatch(createFailure(createError)));

export const removeNecessity = (
	name: string, option: string, description: string, price: string
	) => (dispatch: Dispatch) => axios.put('/api/v1/necessity/', { name, option, description, price })
	.then((removeResponse) => dispatch(removeSuccess(removeResponse.data)))
	.catch((removeError) => dispatch(removeFailure(removeError)));

import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
	const res = await axios.post('/api/stripe', token);
	// will return updated user so passing back through fetch user will update user w/ new credits...
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
	const res = await axios.post('/api/surveys', values);
	history.push('/surveys'); // redirect....
	dispatch({
		type: FETCH_USER,
		payload: res.data
	});
};

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys');
	dispatch({
		type: FETCH_SURVEYS,
		payload: res.data
	});
};

// old syntax
// export function fetchUser() {
// 	return dispatch => {
// 		axios.get('/api/current_user').then(response => {
// 			return dispatch({
// 				type: FETCH_USER,
// 				payload: response.data
// 			});
// 		});
// 	};
// }

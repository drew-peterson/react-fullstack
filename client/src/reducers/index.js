// default import of /reducers directory will grab the index file...
import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
	auth: authReducer
});

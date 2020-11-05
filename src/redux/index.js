import { combineReducers } from 'redux';
import imageReducer from './images/imageReducer';

const rootReducer = combineReducers({
    data: imageReducer
});

export default rootReducer;

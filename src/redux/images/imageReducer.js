import { SET_CURRENT_IMAGES, SET_SEARCH_BY, SET_SEARCH_TEXT } from './imageTypes';

const INITIAL_STATE = {
    images: [],
    searchBy: "local",
    search: ""
};

const imageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_IMAGES:
            return {
                ...state,
                images: action.payload
            };
        case SET_SEARCH_BY:
            return {
                ...state,
                searchBy: action.payload
            };
        case SET_SEARCH_TEXT:
            return {
                ...state,
                search: action.payload
            };
        default:
            return state
    }
};

export default imageReducer;

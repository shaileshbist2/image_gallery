import { SET_CURRENT_IMAGES, SET_SEARCH_BY, SET_SEARCH_TEXT, SET_CATEGORY_CLICKED } from './imageTypes';

const INITIAL_STATE = {
    images: [],
    local: {
        forest: [],
        mountain: [],
        sports: []
    },
    isCategoryClicked: true,
    searchBy: "remote",
    search: ""
};

const imageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_IMAGES:
            return {
                ...state,
                local: {
                    ...state.local,
                    [action.payload.category]: action.payload.imgData
                }
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
        case SET_CATEGORY_CLICKED:
            return {
                ...state,
                isCategoryClicked: action.payload
            };
        default:
            return state
    }
};

export default imageReducer;

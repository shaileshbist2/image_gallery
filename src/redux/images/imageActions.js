import { SET_CURRENT_IMAGES, SET_SEARCH_BY, SET_SEARCH_TEXT, SET_CATEGORY_CLICKED } from './imageTypes';

export const setImages = data => ({
    type: SET_CURRENT_IMAGES,
    payload: data
});

export const setSearchBy = data => ({
    type: SET_SEARCH_BY,
    payload: data
});

export const setSearchText = data => ({
    type: SET_SEARCH_TEXT,
    payload: data
});

export const isCategoryClicked = data => ({
    type: SET_CATEGORY_CLICKED,
    payload: data
});

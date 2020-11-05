import { SET_CURRENT_IMAGES, SET_SEARCH_BY, SET_SEARCH_TEXT } from './imageTypes';

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

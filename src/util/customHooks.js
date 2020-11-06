import { useEffect, useCallback, useRef } from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import { accessKey, pageLength } from '../config/config';
import { setImages } from '../redux/images/imageActions';
const unsplash = new Unsplash({
    "accessKey": accessKey,
    "timeout": 500
});

export const useFetch = (data, category, dispatch, store) => {
    const searchBy = !store.searchBy ? 'remote' : store.searchBy;
    const isCategoryClicked = store.isCategoryClicked;
    const cat = category.replace(/[/]/g, '');
    const localStore = store.local[cat];

    useEffect(() => {
        if (searchBy === 'remote') {
            setImages({
                category: category.replace(/[/]/g, ''),
                imgData: []
            });
            dispatch({ type: 'STACK_IMAGES', images: [] });
        }
    }, [dispatch, searchBy, category])
    
    useEffect(() => {
        if (searchBy === 'local') {
            dispatch({ type: 'STACK_IMAGES', images: [] });
            dispatch({ type: 'STACK_IMAGES', images: localStore });
        }
    }, [dispatch, searchBy, localStore])

    useEffect(() => {
        if (searchBy === 'remote' && isCategoryClicked) {
            dispatch({ type: 'FETCHING_IMAGES', fetching: true });
            unsplash.search.photos(category, data.page, pageLength, { orientation: "portrait", color: "green" }).then(toJson).then(json => {
                const images = json.results;
                dispatch({ type: 'STACK_IMAGES', images });
                dispatch({ type: 'FETCHING_IMAGES', fetching: false });
            });
        }
    }, [dispatch, category, data.page, searchBy, isCategoryClicked]);
}

export const useInfiniteScroll = (scrollRef, dispatch, searchBy, search) => {
    const scrollObserver = useCallback(
        node => {
            new IntersectionObserver(entries => {
                entries.forEach(en => {
                    if (en.intersectionRatio > 0) {
                        dispatch({ type: 'ADVANCE_PAGE' });
                    }
                });
            }).observe(node);
        },
        [dispatch]
    );

    useEffect(() => {
        if (scrollRef.current) {
            if (searchBy === 'remote' && search === "") {
                scrollObserver(scrollRef.current);
            }
        }
    }, [scrollObserver, scrollRef, searchBy, search]);
}

export const useLazyLoading = (imgSelector, items) => {
    const imgObserver = useCallback(node => {
        const intObs = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (en.intersectionRatio > 0) {
                    const currentImg = en.target;
                    const newImgSrc = currentImg.dataset.src;
                    if (!newImgSrc) {
                        console.error('Image source is invalid');
                    } else {
                        currentImg.src = newImgSrc;
                    }
                    intObs.unobserve(node);
                }
            });
        })
        intObs.observe(node);
    }, []);

    const imagesRef = useRef(null);

    useEffect(() => {
        imagesRef.current = document.querySelectorAll(imgSelector);
        if (imagesRef.current) {
            imagesRef.current.forEach(img => imgObserver(img));
        }
    }, [imgObserver, imagesRef, imgSelector, items])
}

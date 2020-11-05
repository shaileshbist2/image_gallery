import { useEffect, useCallback, useRef } from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import { accessKey, pageLength } from '../config/config';
const unsplash = new Unsplash({
    "accessKey": accessKey,
    "timeout": 500
});

export const useFetch = (data, category, dispatch) => {
    useEffect(() => {
        dispatch({ type: 'FETCHING_IMAGES', fetching: true });
        unsplash.search.photos(category, data.page, pageLength, { orientation: "portrait", color: "green" }).then(toJson).then(json => {
            const images = json.results;
            dispatch({ type: 'STACK_IMAGES', images });
            dispatch({ type: 'FETCHING_IMAGES', fetching: false });
        });
    }, [dispatch, category, data.page]);
}

export const useInfiniteScroll = (scrollRef, dispatch) => {
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
            scrollObserver(scrollRef.current);
        }
    }, [scrollObserver, scrollRef]);
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

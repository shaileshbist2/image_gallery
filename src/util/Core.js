import React, { useEffect, useReducer, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useFetch, useInfiniteScroll, useLazyLoading } from './customHooks';
import { setImages } from '../redux/images/imageActions';
import { STACK_IMAGES, FETCHING_IMAGES, ADVANCE_PAGE } from './type';

function Core({ match, setImages, store }) {

    const search = store.search;
    const searchBy = store.searchBy;
    const isCategoryClicked = store.isCategoryClicked;

    const imgReducer = (state, action) => {
        const images = isCategoryClicked ? state.images.concat(action.images) : [];
        switch (action.type) {
            case STACK_IMAGES:
                return { ...state, images: images }
            case FETCHING_IMAGES:
                return { ...state, fetching: action.fetching }
            default:
                return state;
        }
    }

    const pageReducer = (state, action) => {
        switch (action.type) {
            case ADVANCE_PAGE:
                return { ...state, page: state.page + 1 }
            default:
                return state;
        }
    }

    const [filterImage, setFilterImg] = useState([]);
    const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 });
    const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true });
    let bottomBoundaryRef = useRef(null);
    useFetch(pager, match.path, imgDispatch, store);
    useLazyLoading('.card-img-top', imgData.images);
    useInfiniteScroll(bottomBoundaryRef, pagerDispatch, searchBy, search);

    useEffect(() => {
        imgDispatch({ type: 'STACK_IMAGES', images: [] });
        imgDispatch({ type: 'ADVANCE_PAGE', page: 0 });
        imgDispatch({ type: 'FETCHING_IMAGES', fetching: false });
    }, [searchBy, imgDispatch]);

    useEffect(() => {
        if (searchBy === 'remote') {
            setImages({
                category: match.path.replace(/[/]/g, ''),
                imgData: imgData.images
            });
        }
    }, [imgData, setImages, match.path, searchBy]);

    useEffect(() => {
        if (search) {
            const filtered = imgData.images.filter(p => new RegExp(search).test(p.alt_description));
            setFilterImg(filtered);
        } else {
            setFilterImg(imgData.images);
        }
    }, [search, imgData]);

    return (
        <React.Fragment>
            <div className="col-md-10 offset-1">
                <div id='images' className="row">
                    {filterImage.map((image, index) => {
                        const { alt_description, urls } = image
                        return (
                            <div key={index} className="col-md-3">
                                <img
                                    alt={alt_description}
                                    data-src={urls.thumb}
                                    className="card-img-top"
                                    style={{ height: "100%", width: "100%", padding: "5px", borderRadius: "10px" }}
                                    src={urls.thumb} />
                            </div>
                        )
                    })}
                </div>
            </div>

            {imgData.fetching && (
                <div className="text-center m-auto p-3">
                    <i className="fa fa-refresh fa-spin" style={{ fontSize: "30px", padding: "40px" }}></i>
                </div>
            )}
            <div id='page-bottom-boundary' style={{ border: '1px solid #fff' }} ref={bottomBoundaryRef}></div>
        </React.Fragment >
    )
}

const mapStateToProps = (state) => ({
    store: state.data
});

const mapDispatchToProps = dispatch => ({
    setImages: data => dispatch(setImages(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Core));

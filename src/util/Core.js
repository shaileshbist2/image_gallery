import React, { useEffect, useReducer, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useFetch, useInfiniteScroll, useLazyLoading } from '../customHooks';
import { setImages } from '../redux/images/imageActions';
let filtered = [];
function Core({ match, setImages, data }) {
    console.log(process.env);
    const imgReducer = (state, action) => {
        switch (action.type) {
            case 'STACK_IMAGES':
                return { ...state, images: state.images.concat(action.images) }
            case 'FETCHING_IMAGES':
                return { ...state, fetching: action.fetching }
            default:
                return state;
        }
    }

    const pageReducer = (state, action) => {
        switch (action.type) {
            case 'ADVANCE_PAGE':
                return { ...state, page: state.page + 1 }
            default:
                return state;
        }
    }

    const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 });
    const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true, })
    let bottomBoundaryRef = useRef(null);
    useFetch(pager, match.path, imgDispatch);
    useLazyLoading('.card-img-top', imgData.images)
    useInfiniteScroll(bottomBoundaryRef, pagerDispatch);
    if(data.search !== "") {
        console.log(data.search);
        filtered = imgData.images.filter(p => new RegExp(data.search).test(p.alt_description));
    } else {
        filtered = imgData.images
    }
    useEffect(() => {
        setImages(imgData.images);
    }, [imgData, setImages])
    return (
        <React.Fragment>
            <div className="col-md-10 offset-1">
                <div id='images' className="row">
                    {filtered.map((image, index) => {
                        const { alt_description, urls } = image
                        return (
                            <div key={index} className="col-md-3">
                                <img
                                    alt={alt_description}
                                    data-src={urls.thumb}
                                    className="card-img-top"
                                    style={{ height: "100%", width: "100%", padding: "5px", borderRadius: "10px" }}
                                    src={'https://img2.pngio.com/index-of-areaedu-wp-content-uploads-2016-02-default-png-600_600.png'} />
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
    data: state.data
});

const mapDispatchToProps = dispatch => ({
    setImages: data => dispatch(setImages(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Core));

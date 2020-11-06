import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearchBy, setSearchText, isCategoryClicked } from '../redux/images/imageActions';
import './style.css';

const category = ["forest", "mountain", "sports"];

const Header = ({ store, setSearchBy, setSearchText, isCategoryClicked }) => {

    const handleClicked = (e) => {
        setSearchBy(e.target.checked ? "remote" : "local")
        isCategoryClicked(false);
    }

    return (
        <div className="row">
            <div className="col-md-12 form-group" style={{ textAlign: "center" }}>
                <div className="col-md-12 form-group" style={{ fontFamily: 'Lobster, cursive' }}>
                    <h1>Elite Gallary</h1>
                </div>
                <div className="col-md-12 form-group">
                    <div className="col-md-6 offset-3 form-group">
                        <div className="input-group mb-3" style={{ height: "50px" }}>
                            <input onChange={e => setSearchText(e.target.value)} type="text" className="form-control" placeholder="Search..." style={{ height: "52px" }} />
                            <button type="button" className="btn btn-dark" style={{ borderRadius: "0px 6px 6px 0", width: "50px" }}>
                                <i className="fa fa-search" style={{ fontSize: "20px" }}></i>
                            </button>
                            <div className="input-group-append">
                                <h4 className="switch-label text-capitalize" style={{ fontSize: "14px", margin: "2px 0px 0px 15px", position: "absolute" }}>{store.searchBy}</h4>
                                <label className="switch" style={{ margin: "18px 0px 0px 6px" }}>
                                    <input onClick={e => handleClicked(e)} type="checkbox" defaultChecked={store.searchBy === 'remote' ? true : false} />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 form-group">
                    {
                        category.length > 0 &&
                        category.map((p, i) =>
                            <Link key={i} to={'/' + p}>
                                <button onClick={() => { isCategoryClicked(true) }} type="button" className="btn btn-dark btn-sm btn-cat">
                                    {p}
                                </button>
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setSearchText: cat => dispatch(setSearchText(cat)),
    setSearchBy: cat => dispatch(setSearchBy(cat)),
    isCategoryClicked: cat => dispatch(isCategoryClicked(cat))
});

const mapStateToProps = (state) => ({
    store: state.data
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

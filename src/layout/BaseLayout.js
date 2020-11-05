import React from 'react';
import Header from "./Header";

const BaseLayout = (props) => {
    return (
        <React.Fragment>
            <div className="container" style={{ marginTop: "60px" }}>
                <Header />
                {props.children}
            </div>
        </React.Fragment>
    )
}

export default BaseLayout;

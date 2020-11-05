import React from 'react';
import { withRouter } from 'react-router-dom';

const Title = ({ category, match }) => {
    return (
        <div className="col-md-12 text-capitalize">
            <h4 style={{ textAlign: "center" }}>{match.path.replace(/[/]/g, '')} images</h4>
        </div>
    )
}

export default withRouter(Title);

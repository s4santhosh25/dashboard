import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import * as Auth from '../../utils/auth';

class PrivateRoute extends Component {
    render() {
        const { path, component: Component } = this.props;
        if (Auth.checkToken())
            return <Route path={path} component={Component} />
        else
            return <Redirect to="/" />
    }
}

const mapStateToProps = (state) => {
    return {
        form: state.form
    }
}

PrivateRoute.propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(PrivateRoute)

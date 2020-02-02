import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Form from './Form';

class Index extends Component {
    render() {
        const { form: { type } } = this.props;
        console.log('formIndex component called!');

        return (
            <React.Fragment>
                <Form type={type} {...this.props} />
            </React.Fragment>
        )
    }
}

Index.propTypes = {
    form: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        form: state.form,
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Index)

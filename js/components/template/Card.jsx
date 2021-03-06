/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const {isObject} = require('lodash');
const {connect} = require('react-redux');
const {bindActionCreators} = require('redux');
const TemplateSira = require('./TemplateSira');
const {Modal} = require('react-bootstrap');
const {toggleSiraControl} = require("../../actions/controls");
const toggleDetail = toggleSiraControl.bind(null, 'detail');

const Draggable = require('react-draggable');
require("./card.css");

const Card = React.createClass({
    propTypes: {
        card: React.PropTypes.shape({
            template: React.PropTypes.oneOfType([
                    React.PropTypes.string,
                    React.PropTypes.func]),
            loadingCardTemplateError: React.PropTypes.oneOfType([
                    React.PropTypes.string,
                    React.PropTypes.object])
        }),
        open: React.PropTypes.bool,
        model: React.PropTypes.object,
        impiantoModel: React.PropTypes.object,
        toggleDetail: React.PropTypes.func
    },
    getDefaultProps() {
        return {
            card: {
                template: "",
                loadingCardTemplateError: null
            },
            open: false,
            model: {},
            toggleDetail: () => {}
        };
    },
     renderLoadTemplateException() {
        let exception = this.props.card.loadingCardTemplateError;
        if (isObject(exception)) {
            exception = exception.status + ": " + exception.data;
        }

        return (
            <Modal
                show={ (exception) ? true : false}
                bsSize="small"
                onHide={this.props.toggleDetail} >
                <Modal.Header closeButton>
                    <Modal.Title>Data Exception</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mapstore-error">{exception}</div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    },
    renderCard() {
        return (this.props.card.loadingCardTemplateError) ? (
                this.renderLoadTemplateException()
            ) : (
            <Draggable start={{x: 672, y: 180}} handle=".panel-heading,.panel-heading *">
                <div className="scheda-sira">
                    <TemplateSira template={this.props.card.template} model={this.props.model} impiantoModel={this.props.impiantoModel}/>
                </div>
            </Draggable>);
    },
    render() {
        return (this.props.open) ? this.renderCard() : null;
    }
});

module.exports = connect((state) => {
    return {
        impiantoModel: state.cardtemplate.impiantoModel,
        card: state.cardtemplate || {},
        open: state.siraControls.detail
    };
}, dispatch => {
    return bindActionCreators({
        toggleDetail: toggleDetail
    }, dispatch);
})(Card);

/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const ReactDOM = require('react-dom');
const expect = require('expect');

const Home = require('../Home');

describe('Home test suite', () => {
    var home = null;

    before(() => {
        document.body.innerHTML = '<div id="container"></div>';
        home = ReactDOM.render(
          <Home />,
          document.getElementById('container')
        );
    });
    it('checks that homepage has been rendered', () => {
        expect(home).not.to.be.null;
        let homeNode = ReactDOM.findDOMNode(home);
        expect(homeNode).toExist();
    });
});

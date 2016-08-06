import React, { Component, PropTypes } from 'react';
import { ConditionalRender } from 'components/base';
import Navigation from '../Navigation/Navigation';
import './Page.scss';

class Page extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  static contextTypes = {
    router: PropTypes.object
  };

  onBackClick = event => {
    const { router } = this.context;
    event.preventDefault();
    router.goBack();
  };

  render() {
    const { children } = this.props;

    return (
      <div className="page">
        <Navigation className="page-menu" />
        <div className="page-content-container">
          <div className="page-content">
            {children}

            <a href="#" className="back-button" onClick={this.onBackClick}>
              &laquo; back
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ConditionalRender(Page);

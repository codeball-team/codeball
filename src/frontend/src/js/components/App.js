import React, { Component, PropTypes } from 'react';
import { bindActionsAndConnect } from 'utils';
import AjaxSpinner from 'containers/AjaxSpinner/AjaxSpinner';
import AjaxErrors from 'containers/AjaxErrors/AjaxErrors';
import { Page } from 'components/ui';

class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  };

  componentWillMount = () => {
    const {
      actions: {
        currentUserLoad,
        gamesLoad,
        pitchesLoad,
        usersLoad
      }
    } = this.props;
    currentUserLoad();
    gamesLoad();
    pitchesLoad();
    usersLoad();
  };

  render() {
    const { children } = this.props;

    return (
      <div>
        <Page>
          {children}
        </Page>
        <AjaxSpinner />
        <AjaxErrors />
      </div>
    );
  }
}

export default bindActionsAndConnect(App, () => ({}));

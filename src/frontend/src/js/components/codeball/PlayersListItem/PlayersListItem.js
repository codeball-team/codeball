import React, { Component, PropTypes } from 'react';
import { USER_MISSING_PICTURE_URL } from 'constants';
import { BaseComponent } from 'components/base';
import { Link, ListItem } from 'components/ui';
import './PlayersListItem.scss';

class PlayersListItem extends Component {
  static propTypes = {
    children: PropTypes.element,
    className: PropTypes.string,
    user: PropTypes.object.isRequired
  };

  render() {
    const {
      children,
      className,
      user: {
        firstName,
        id,
        lastName,
        pictureUrl
      }
    } = this.props;

    return (
      <Link key={id} className={className} to={`/players/${id}`}>
        <ListItem className="players-list-item">
          <div
            className="picture"
            style={{
              backgroundImage: `url("${pictureUrl || USER_MISSING_PICTURE_URL}")`
            }} />

          <div className="name ellipsis">
            {lastName} {firstName}
          </div>

          {children}
        </ListItem>
      </Link>
    );
  }
}

export default BaseComponent(PlayersListItem);

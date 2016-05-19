import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import TeamLineup from '../TeamLineup/TeamLineup';
import './GameLineup.scss';

export default class GameLineup extends Component {
  static propTypes = {
    className: PropTypes.string,
    users: PropTypes.object.isRequired,
    teamA: PropTypes.array.isRequired,
    teamB: PropTypes.array.isRequired
  };

  render() {
    const {
      className,
      users,
      teamA,
      teamB
    } = this.props;

    return (
      <div
        className={classNames(
          'game-lineup',
          className
        )}>
        <div className="title">
          Lineups
        </div>

        <div className="lineups">
          <TeamLineup
            teamName="Team A"
            users={users}
            team={teamA} />

          <TeamLineup
            teamName="Team B"
            users={users}
            team={teamB} />
        </div>
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'underscore';
import './MatchScore.scss';

export default class MatchScore extends Component {
  static propTypes = {
    className: PropTypes.string,
    pitchName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    teamAScore: PropTypes.number,
    teamBScore: PropTypes.number
  };

  render() {
    const {
      className,
      pitchName,
      date,
      time,
      teamAScore,
      teamBScore
    } = this.props;

    return (
      <div
        className={classNames(
          'match-score',
          className
        )}>
        <div className="title">
          Result
        </div>

        <div className="score">
          {this.renderScore(teamAScore)} : {this.renderScore(teamBScore)}
        </div>

        <div className="details">
          {pitchName}
        </div>

        <div className="details">
          {date}
        </div>

        <div className="details">
          {time}
        </div>
      </div>
    );
  }

  renderScore(score) {
    return (score !== undefined && score !== null)
      ? score
      : '-';
  }
}

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import IconLocation from 'react-icons/lib/io/ios-location';
import IconWorld from 'react-icons/lib/io/ios-world-outline';
import IconPeople from 'react-icons/lib/io/ios-people';
import IconCalendar from 'react-icons/lib/io/ios-calendar-outline';
import IconClock from 'react-icons/lib/io/ios-time-outline';
import IconLayers from 'react-icons/lib/io/social-buffer';
import './MatchInfo.scss';

const domainRegExp = /(https?:\/\/[^\/]*)/;

export default class MatchInfo extends Component {
  static propTypes = {
    className: PropTypes.string,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    pitchName: PropTypes.string.isRequired,
    pitchType: PropTypes.string.isRequired,
    pitchAddress: PropTypes.string.isRequired,
    pitchUrl: PropTypes.string,
    pitchMinNumberOfPlayers: PropTypes.number.isRequired,
    pitchMaxNumberOfPlayers: PropTypes.number.isRequired
  };

  render() {
    const {
      className,
      date,
      time,
      duration,
      pitchName,
      pitchType,
      pitchAddress,
      pitchUrl,
      pitchMinNumberOfPlayers,
      pitchMaxNumberOfPlayers
    } = this.props;

    return (
      <div
        className={classNames(
          'match-info',
          className
        )}>
        <div className="title">
          {pitchName}
        </div>

        <div className="details" title="Match date & time">
          <IconCalendar className="icon" />
          {date}, {time}
        </div>

        <div className="details" title="Match duration">
          <IconClock className="icon" />
          {duration} min
        </div>

        <div className="details ellipsis" title="Pitch address">
          <IconLocation className="icon" />
          <a href={`https://www.google.com/maps/?q=${pitchAddress}`}>
            {pitchAddress}
          </a>
        </div>

        {pitchUrl && (
          <div className="details ellipsis" title="Pitch webpage">
            <IconWorld className="icon" />
            <a href={pitchUrl}>
              {pitchUrl.match(domainRegExp)[0]}
            </a>
          </div>
        )}

        <div className="details ellipsis" title="Pitch type">
          <IconLayers className="icon" />
          {pitchType}
        </div>

        <div className="details" title="Pitch capacity">
          <IconPeople className="icon" />
          {
            pitchMinNumberOfPlayers === pitchMaxNumberOfPlayers
              ? `${pitchMinNumberOfPlayers}`
              : `${pitchMinNumberOfPlayers} - ${pitchMaxNumberOfPlayers}`
          }
        </div>
      </div>
    );
  }
}

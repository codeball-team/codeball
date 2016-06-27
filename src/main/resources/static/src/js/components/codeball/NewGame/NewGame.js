import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import {
  DATE_FORMAT, DURATION_OPTIONS, HOUR_OPTIONS, MINUTE_OPTIONS
} from 'constants/Configuration';
import { InputWrapper, TimePicker, ValuePicker } from 'components/ui';
import './NewGame.scss';

export default class NewGame extends Component {
  static propTypes = {
    className: PropTypes.string,
    date: PropTypes.number,
    duration: PropTypes.number,
    hour: PropTypes.number,
    minute: PropTypes.number,
    pitches: PropTypes.array.isRequired,
    pitchId: PropTypes.number,
    onDurationChange: PropTypes.func.isRequired,
    onHourChange: PropTypes.func.isRequired,
    onMinuteChange: PropTypes.func.isRequired,
    onPitchIdChange: PropTypes.func.isRequired,
    onDateChange: PropTypes.func.isRequired
  };

  onPitchIdChange = ({ value }) => {
    const { onPitchIdChange } = this.props;
    onPitchIdChange(value);
  };

  onDateChange = (date) => {
    const { onDateChange } = this.props;
    onDateChange(date.valueOf());
  };

  render() {
    const {
      className,
      date,
      duration,
      hour,
      minute,
      pitches,
      pitchId,
      onMinuteChange,
      onHourChange,
      onDurationChange
    } = this.props;

    const pitchesOptions = pitches.map(({ id, name }) => ({
      label: name,
      value: id
    }));

    return (
      <div
        className={classNames(
          'new-game',
          className
        )}>
        <InputWrapper
          label="Start date"
          isValid={Boolean(date)}>
          <DatePicker
            className="editable-text-input"
            dateFormat={DATE_FORMAT}
            locale="en-GB"
            minDate={moment()}
            placeholderText="Select start date..."
            selected={date && moment(date)}
            onChange={this.onDateChange} />
        </InputWrapper>

        <InputWrapper
          label="Start time"
          isValid={Number.isInteger(hour) && Number.isInteger(minute)}>
          <div className="date-input">
            <TimePicker
              hour={hour}
              hourOptions={HOUR_OPTIONS}
              minute={minute}
              minuteOptions={MINUTE_OPTIONS}
              onHourChange={onHourChange}
              onMinuteChange={onMinuteChange} />
          </div>
        </InputWrapper>

        <InputWrapper
          label="Duration"
          isValid={Boolean(duration)}>
          <ValuePicker
            options={DURATION_OPTIONS}
            value={duration}
            onChange={onDurationChange} />
        </InputWrapper>

        <InputWrapper
          label="Pitch"
          isValid={Boolean(pitchId)}>
          <Select
            placeholder="Select pitch..."
            options={pitchesOptions}
            value={pitchId}
            searchable={false}
            clearable={false}
            onChange={this.onPitchIdChange} />
        </InputWrapper>
      </div>
    );
  }
}

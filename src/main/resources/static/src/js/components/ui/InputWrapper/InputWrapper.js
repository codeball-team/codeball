import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { renderConditionally } from 'utils';
import IconCancel from 'react-icons/lib/io/ios-close-outline';
import IconSave from 'react-icons/lib/io/ios-checkmark-outline';
import './InputWrapper.scss';

export default class InputWrapper extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    isValid: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string
  };

  render() {
    const {
      className,
      children,
      isValid,
      label,
      value
    } = this.props;

    return (
      <div
        className={classNames(
          'input-wrapper',
          className
        )}>
        <div className="label">
          <div className="title">
            {label} {renderConditionally({
              when: isValid,
              render: () => (
                <span>
                  <span>:</span>
                  <span className="text-highlight">{` ${value}`}</span>
                </span>
              )
            })}
          </div>

          <div
            className={classNames(
              'validation',
              {
                valid: isValid,
                invalid: !isValid
              }
            )}>
            {renderConditionally({
              when: isValid,
              render: () => (
                <IconSave className="icon" />
              )
            })}

            {renderConditionally({
              when: !isValid,
              render: () => (
                <IconCancel className="icon" />
              )
            })}
          </div>
        </div>

        <div className="content">
          {children}
        </div>
      </div>
    );
  }
}

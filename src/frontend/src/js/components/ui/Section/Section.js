import React, { Component, PropTypes } from 'react';
import { _ } from 'utils';
import { BaseComponent } from 'components/base';
import { ButtonCancel, ButtonEdit, ButtonSave } from 'components/ui';
import ButtonsPanel from '../ButtonsPanel/ButtonsPanel';
import './Section.scss';

export default function SectionDecorator(ChildComponent) {
  class Section extends Component {
    static propTypes = {
      buttons: PropTypes.array,
      canEdit: PropTypes.bool,
      canSubmit: PropTypes.bool,
      isEditable: PropTypes.bool,
      isEditing: PropTypes.bool,
      title: PropTypes.node.isRequired,
      onCancel: PropTypes.func,
      onEdit: PropTypes.func,
      onSave: PropTypes.func
    };

    static defaultProps = {
      buttons: [],
      canEdit: false,
      canSubmit: true,
      isEditable: false,
      isEditing: false,
      onCancel: _.noop,
      onEdit: _.noop,
      onSave: _.noop
    };

    render() {
      const {
        buttons,
        canEdit,
        canSubmit,
        isEditable,
        isEditing,
        title,
        onCancel,
        onEdit,
        onSave
      } = this.props;

      const areEditingButtonsEnabled = canEdit && isEditable;
      const childProps = {
        ..._(this.props).omit(_(Section.propTypes).keys()),
        isEditing
      };

      return (
        <div className="section">
          <div className="section-bar">
            <div className="section-title ellipsis">
              {title}
            </div>

            <ButtonsPanel>
              {[
                <ButtonEdit
                  renderWhen={[
                    areEditingButtonsEnabled,
                    !isEditing
                  ]}
                  key="section-edit"
                  onClick={onEdit} />,

                <ButtonCancel
                  renderWhen={[
                    areEditingButtonsEnabled,
                    isEditing
                  ]}
                  key="section-cancel"
                  onClick={onCancel} />,

                <ButtonSave
                  renderWhen={[
                    areEditingButtonsEnabled,
                    isEditing
                  ]}
                  key="section-save"
                  isDisabled={!canSubmit}
                  onClick={onSave} />,

                ...buttons.filter(Boolean)
              ]}
            </ButtonsPanel>
          </div>

          <ChildComponent {...childProps} />
        </div>
      );
    }
  }

  return BaseComponent(Section);
}

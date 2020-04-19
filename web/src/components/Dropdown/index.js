import React, { useState } from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';

import { MdMoreHoriz } from 'react-icons/md';

import { Container, ActionButton, ActionList, Action } from './styles';

export default function Dropdown({ actions }) {
  const [isOpened, setIsOpened] = useState(false);

  function handleActions() {
    setIsOpened(!isOpened);
  }

  function closeDropdown() {
    setIsOpened(false);
  }

  function renderActionList() {
    return (
      <ActionList visible={isOpened}>
        {actions.map((action, actionIndex) => (
          <Action key={`${action.link}_${String(actionIndex)}`}>
            {action.type === 'button' ? (
              <button type="button" onClick={action.onClickButtonHandler}>
                {action.icon}
                {action.title}
              </button>
            ) : (
              <Link to={action.link}>
                {action.icon}
                {action.title}
              </Link>
            )}
          </Action>
        ))}
      </ActionList>
    );
  }

  return (
    <OutsideClickHandler onOutsideClick={closeDropdown} disabled={!isOpened}>
      <Container>
        <ActionButton onClick={handleActions}>
          <MdMoreHoriz color="#C6C6C6" size={26} />
        </ActionButton>
        {renderActionList()}
      </Container>
    </OutsideClickHandler>
  );
}

Dropdown.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      icon: PropTypes.element.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string,
      onClickButtonHandler: PropTypes.func,
    })
  ).isRequired,
};

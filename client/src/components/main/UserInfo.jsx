import React from 'react';
import PropTypes from 'prop-types';

import Arrow from '../Arrow';

const UserInfo = props => {
  const { username, isOpen } = props;
  return (
    <div className="flex justify-end items-center cursor-pointer username">
      <span className="text-lg lg:text-xl mx-4 lg:mx-5 text-right leading-none">
        {username}
      </span>
      <span>
        <Arrow isOpen={isOpen} />
      </span>
    </div>
  );
};

export default UserInfo;

UserInfo.propTypes = {
  username: PropTypes.string,
  isOpen: PropTypes.bool
};

UserInfo.defaultProps = {
  username: '',
  isOpen: false
};

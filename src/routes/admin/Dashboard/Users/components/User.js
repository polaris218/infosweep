import React, { PropTypes } from 'react';
import { Button } from 'components'

import { formatDate } from 'utils/dateHelper';

const User = (props) => {
  const {
    id,
    first_name,
    last_name,
    email,
    group,
    role,
    accounts,
    created_at,
  } = props.user

  const fullName = `${first_name} ${last_name}`
  const renderButton = (
    <Button
      bsStyle='danger'
      onClick={() => {props.handleClick(id)}}
    >
      Become User
    </Button>
  )

  return (
    <tr className='bg-gray-darker' key={id}>
      <td>
        { id }
      </td>
      <td>
        { fullName }
      </td>
      <td>
        { email }
      </td>
      <td>
        { group }
      </td>
      <td>
        { role }
      </td>
      <td>
        { formatDate(created_at) }
      </td>
      <td>
        { renderButton }
      </td>
    </tr>
  )
}

User.propTypes = {
  User: PropTypes.object
}

export default User;

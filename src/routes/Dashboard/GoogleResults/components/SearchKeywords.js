import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import {
    Checkbox,
    Divider,
    Button
} from 'components';

const SearchKeywords = ({ keywords, getResults }) => {
  return (
    <div>
      <Divider className='m-b-1'>
        Keywords
      </Divider>
      <div>
        <ul>
        {
          keywords.all.map( (keyword, key) => (
            <li key={key} className='list-unstyled'>
              <Button
                bsStyle='link'
                key={key}
                onClick={getResults.bind(null, keyword)}
              >
                {keyword.value}
              </Button>
            </li>
          ))
        }
      </ul>
      </div>
    </div>
  )
}

SearchKeywords.propTypes = {
  keywords: PropTypes.object.isRequired,
  getResults: PropTypes.func.isRequired
}

export default SearchKeywords;
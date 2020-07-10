import React from 'react';

import './search-panel.css';



const SearchPanel = ({onSearch}) => {

  const search = (e) => {
    onSearch(e.target.value)
  }

  return (
    <input type="text"
              className="form-control search-input"
              placeholder="type to search"
    onChange={search}/>
  );
};

export default SearchPanel;

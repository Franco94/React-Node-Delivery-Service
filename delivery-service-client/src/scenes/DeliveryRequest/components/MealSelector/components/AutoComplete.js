import React from 'react';
import {AutoComplete} from 'antd';

function Complete(props) {

  let mealList;
  if (props.dataSource) {
    mealList = props.dataSource.map(meal => meal.name);
  }
  return (<AutoComplete style={{
      width: 200
    }} dataSource={mealList} onSelect={props.onSearch} placeholder="Search catalog..." filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}/>);

}
// ========================================
export default Complete;

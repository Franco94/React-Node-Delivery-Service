import React from 'react';
import {Card} from 'antd';

const {Meta} = Card;

function CardButton(props) {

  return (<Card onClick={props.onClick} hoverable="hoverable" style={{
      width: 220
    }} cover={<img alt = "no connection" src = {
      props.meal.img
    }
    />}>
    <Meta title={props.meal.name} description={'$' + props.meal.cost}/>
  </Card>);

}

// ========================================
export default CardButton;

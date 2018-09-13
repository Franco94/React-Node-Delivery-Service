import React from 'react';
import {Icon, Row, Col} from 'antd';
import './index.css';

class SideCart extends React.Component {

  renderItem(meal) {

    return (<Row gutter={16} key={meal._id} className="item">
      <Col span={3}>
        <Icon className="dynamic-delete-button" type="minus-circle-o" onClick={() => this.props.onDelete(meal)}/>
      </Col>
      <Col span={7}>
        {meal.name}
      </Col>
      <Col span={4}>
        ${meal.cost}
      </Col>
      <Col span={5}>
        Qty: {meal.quantity}
      </Col>
      <Col span={5}>
        <Icon className="dynamic-button" type="up" theme="outlined" onClick={() => this.props.changeQuantity(meal.quantity + 1, meal)}/>
        <Icon className="dynamic-button" type="down" theme="outlined" onClick={() => this.props.changeQuantity(meal.quantity - 1, meal)}/>
      </Col>
    </Row>);
  }

  render() {
    let meals = this.props.selectedMeals;

    let mealList = meals.map((meal) => {

      return this.renderItem(meal);
    });

    let totalCost = '';
    if (this.props.totalCost > 0) {
      totalCost = <div className="totalCost">Total: $ {this.props.totalCost}
      </div>
    }

    return (<div className="bar">
      {mealList}
      {totalCost}
    </div>);
  }
}
// ========================================
export default SideCart;

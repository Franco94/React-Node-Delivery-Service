import React from 'react';
import {Tag, Row, Col} from 'antd';

import './index.css';
import CardButton from './components/CardButton';
import Complete from './components/AutoComplete';

class MealSelector extends React.Component {

  renderCard(meal) {

    return (<CardButton key={meal._id} meal={meal} onClick={() => this.props.onClick(meal)}></CardButton>);

  }

  render() {
    let tag;
    let mealList = "No meals available...";
    let meals = this.props.meals;
    let filteredMeals = this.props.filteredMeals;

    if (meals.length > 0) {
      //render all meal cards
      mealList = meals.map((meal) => {
        return this.renderCard(meal);
      });
    }
    if (filteredMeals.length > 0) {
      //there is a filter
      //create tag
      let tagName = filteredMeals[0].name;
      tag = <Tag className="tag" color="geekblue" closable="closable" onClose={this.props.onTagClose}>{tagName}</Tag>

      //render filtered meal cards
      mealList = filteredMeals.map((meal) => {
        return this.renderCard(meal);
      });

    }

    return (<div className="delivery-request">

      <div className="card-row">
        <div className="welcome">
          <Row gutter={16} className="welcomeText">
            <h1>What are you having today?</h1>
          </Row>
          <Row gutter={16} className="search">
            <Col span={14}>
              <Complete dataSource={meals} onSearch={(name) => this.props.onSearch(name)}></Complete>
            </Col>
            <Col span={2} className="tag">
              {tag}
            </Col>
          </Row>
        </div>
        {mealList}

      </div>
    </div>);
  }
}
// ========================================
export default MealSelector;

import React from 'react';
import {Layout, notification} from 'antd';

import './index.css';
import MealSelector from './components/MealSelector';
import SideCart from './components/SideCart';
import DeliveryInfoForm from './components/DeliveryInfoForm';

const {Header, Footer, Content, Sider} = Layout;

class DeliveryRequest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      filteredMeals: [],
      selectedMeals: [],
      totalCost: 0,
      restaurantId: null,
      awaitingEta: false
    };
  }

  componentDidMount() {
    //fetch initial data once the component mounts

    fetch('/api/meals').then(res => res.json()).then(meals => {
      this.setState({meals: meals})
    }).catch(error => {
      console.log(error);
    });

    fetch('/api/restaurants').then(res => res.json()).then(restaurants => {
      //get restoNode
      const restoNode = restaurants.find(resto => resto.name === "RestoNode");
      this.setState({restaurantId: restoNode._id})
    }).catch(error => {
      console.log(error);
    });

  }

  handleClick(meal) {

    if (meal) {
      //meal selected
      const selectedMeals = this.state.selectedMeals.slice();
      const selected = selectedMeals.find(m => m._id === meal._id);

      if (selected) {
        //if already exists
        selected.quantity++;
        this.setState({
          selectedMeals: selectedMeals,
          //update totalCost
          totalCost: this.state.totalCost + meal.cost
        });

      } else {
        //first time selected
        this.setState({
          selectedMeals: selectedMeals.concat([
            {
              _id: meal._id,
              name: meal.name,
              cost: meal.cost,
              quantity: 1
            }
          ]),
          //update totalCost
          totalCost: this.state.totalCost + meal.cost
        });
      }
    }
  }

  handleDelete(meal) {
    //meal selected for removal
    const selectedMeals = this.state.selectedMeals.slice();
    const indexSelected = selectedMeals.findIndex(m => m._id === meal._id);
    selectedMeals.splice(indexSelected, 1);
    //update selectedMeals collection
    this.setState({
      selectedMeals: selectedMeals,
      //update totalCost
      totalCost: this.state.totalCost - (meal.cost * meal.quantity)
    });
  }

  changeQuantity(value, meal) {
    if (meal && value > 0) {
      //meal quantity change
      //calculate previous totalcost
      const oldTotalCost = this.state.totalCost - (meal.cost * meal.quantity);

      const selectedMeals = this.state.selectedMeals.slice();
      const selected = selectedMeals.find(m => m._id === meal._id);
      selected.quantity = value;

      //update selectedMeals collection and totalCost
      this.setState({
        selectedMeals: selectedMeals,
        totalCost: oldTotalCost + (selected.cost * selected.quantity)
      });
    }
  }

  handleUser(user, locationData) {

    if (user && locationData) {
      //received all necessary user input
      this.toggleEta();
      //save the user info
      fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({name: user.name, surname: user.surname, phone: user.phone}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(newuser => {

        const meals = this.state.selectedMeals;
        const restaurantId = this.state.restaurantId;
        const totalCost = this.state.totalCost;
        //save the order
        fetch('/api/deliveryOrders', {
          method: 'POST',
          body: JSON.stringify({meals: meals, restaurant: restaurantId, totalCost: totalCost, locationData: locationData, user: newuser._id}),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => {
          //received final response
          this.toggleEta();
          if (res.status !== 200) {
            this.openWarningNotification();
          } else {
            (res.json()).then(eta => this.openSuccessNotification(locationData, eta))
          }
        }).catch(error => {
          this.toggleEta()
          this.openWarningNotification()
          console.log(error);
        });

      }).catch(error => {
        this.toggleEta()
        this.openWarningNotification()
        console.log(error);
      });
    }
  }

  handleUserLocation(locationData) {
    //user location data change
    this.setState({locationData: locationData});
  }

  toggleEta() {
    this.setState({
      awaitingEta: !this.state.awaitingEta
    });
  }

  handleSearch(name) {
    const meals = this.state.meals;
    const filteredMeals = meals.filter(m => m.name === name);

    this.setState({filteredMeals: filteredMeals});

  }

  handleTagClose() {
    this.setState({filteredMeals: []});

  }

  openSuccessNotification(locationData, eta) {

    const args = {
      message: 'Just ' + eta + ' more!',
      description: 'Your order will arrive to ' + locationData.address + ' in an estimated time of ' + eta + '. Thank you!',
      duration: 0,
      type: 'success'
    };

    notification.open(args);
  }

  openWarningNotification() {
    const args = {
      message: 'Oops!',
      description: 'Something went wrong with your order. Please try again later!',
      duration: 0,
      type: 'warning'
    };

    notification.open(args);
  }

  render() {
    let infoRequest;

    let disabled = true;
    if (this.state.selectedMeals.length > 0) {
      disabled = false;
    }

    infoRequest = <DeliveryInfoForm disabled={disabled} awaiting={this.state.awaitingEta} handleUser={(user, locationData) => this.handleUser(user, locationData)}></DeliveryInfoForm>

    return (<div>
      <Layout >
        <Header></Header>
        <Layout >
          <Content>
            <MealSelector meals={this.state.meals} filteredMeals={this.state.filteredMeals} onClick={(meal) => this.handleClick(meal)} onTagClose={() => this.handleTagClose()} onSearch={(name) => this.handleSearch(name)}></MealSelector>
          </Content>
          <Sider width={300} style={{
              background: '#fff'
            }}>
            <div className="side-content">
              <div className="title">
                <h2>Your Order</h2>
              </div>
              <SideCart selectedMeals={this.state.selectedMeals} totalCost={this.state.totalCost} onDelete={(meal) => this.handleDelete(meal)} changeQuantity={(value, meal) => this.changeQuantity(value, meal)}></SideCart>
              <div className="confirm-button">
                {infoRequest}
              </div>
            </div>
          </Sider>
        </Layout>
        <Footer className="foot">@RestoNode</Footer>
      </Layout>

    </div>);
  }
}

// ========================================
export default DeliveryRequest;

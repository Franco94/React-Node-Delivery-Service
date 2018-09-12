import React from 'react';
import {Button, Modal, Form, Input, Select} from 'antd';
import LocationSearchInput from './components/LocationSearchInput';

import './index.css';

const FormItem = Form.Item;
const Option = Select.Option;

const CollectionCreateForm = Form.create()(class extends React.Component {

  allLetter(rule, value, callback) {
    let letters = /^[A-Za-z]+$/;
    if (value && !letters.test(value)) {
      callback(false)
    }
    callback();
  }

  allNumber(rule, value, callback) {
    if (value && isNaN(value)) {
      callback(false)
    }
    callback();
  }

  render() {
    const {visible, onCancel, onCreate, form} = this.props;
    const {getFieldDecorator} = form;
    const prefixSelector = getFieldDecorator('prefix', {initialValue: '299'})(<Select style={{
        width: 80
      }}>
      <Option value="299">+299</Option>
      <Option value="011">+011</Option>
    </Select>);

    return (<Modal visible={visible} title="Information Request" okText="Done" onCancel={onCancel} onOk={onCreate}>

      <Form layout="vertical">
        <FormItem>
          <h4>Where do we send your order to?</h4>
          <LocationSearchInput handleUserLocation={(locationData) => this.props.handleUserLocation(locationData)}></LocationSearchInput>
        </FormItem>
        <hr></hr>
        <br></br>
        <h4>Now, please add your contact information.</h4>
        <br></br>
        <FormItem label="Name">
          {
            getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please input your name!'
                }, {
                  validator: this.allLetter,
                  message: 'Please input your name!'
                }
              ]
            })(<Input disabled={this.props.formDisabled} type="string"/>)
          }
        </FormItem>
        <FormItem label="Surname">
          {
            getFieldDecorator('surname', {
              rules: [
                {
                  required: true,
                  message: 'Please input your surname!'
                }, {
                  validator: this.allLetter,
                  message: 'Please input your surname!'

                }
              ]
            })(<Input disabled={this.props.formDisabled} type="string"/>)
          }
        </FormItem>
        <FormItem className="collection-create-form_last-form-item" label="Phone Number">
          {
            getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: 'Please input your phone number!'
                }, {
                  validator: this.allNumber,
                  message: 'Please input your phone number!'
                }
              ]
            })(<Input disabled={this.props.formDisabled} type="number" addonBefore={prefixSelector} style={{
                width: '100%'
              }}/>)
          }
        </FormItem>
      </Form>
    </Modal>);
  }
});

class DeliveryInfoForm extends React.Component {

  state = {
    visible: false,
    locationData: null
  };

  showModal = () => {
    this.setState({visible: true});
  }

  handleCancel = () => {
    this.setState({visible: false});
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (!this.state.locationData) {
        return;
      }

      const user = {
        name: values.name,
        surname: values.surname,
        phone: values.prefix + values.phone
      };

      const locationData = this.state.locationData;
      //send back user info
      this.props.handleUser(user, locationData);

      form.resetFields();
      this.setState({visible: false});

    });
  }

  handleUserLocation(locationData) {
    this.setState({locationData: locationData});
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {

    let formDisabled = true;
    if (this.state.locationData) {
      formDisabled = false;
    }

    return (<div>
      <Button disabled={this.props.disabled} loading={this.props.awaiting} type="primary" onClick={this.showModal}>Confirm Order</Button>
      <CollectionCreateForm formDisabled={formDisabled} handleUserLocation={(locationData) => this.handleUserLocation(locationData)} wrappedComponentRef={this.saveFormRef} visible={this.state.visible} onCancel={this.handleCancel} onCreate={this.handleCreate}/>
    </div>);
  }
}

// ========================================
export default DeliveryInfoForm;

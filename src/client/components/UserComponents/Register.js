import React, {Component} from 'react';


import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


// class userRegister extends React.Component {
class UserRegister extends Component {

  constructor(props){
  	super(props)
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('test')

  }

  checkPassword(rule, value, callback){
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }


  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        
        <FormItem>
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>
      </Form>
    );
  }
}

export default UserRegister;
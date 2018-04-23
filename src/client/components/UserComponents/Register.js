import React, {Component} from 'react';


import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


// class userRegister extends React.Component {
class UserRegister extends Component {

	constructor(props){
		super(props);

		this.handleFormFieldsChange = this.handleFormFieldsChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
	  		form_data:{}
	  	}
	}


  handleSubmit(e){
    e.preventDefault();

    let url = '/api/user/register';
    let data = this.state.form_data;
 //    let data = new FormData();
    

  //   var response = fetch(url,{
		// 	"Content-Type" : "application/json",
		// 	method: 'POST',
		// 	credentials: 'include',
		// 	body: {'lol': 'lolllllllll'},
		// 	// body: data,
		// }).catch(err=>{
		// 	console.log('____',err)
		// });



	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader('Content-Type', 'application/json')

	xhr.onreadystatechange = function() {
	    if (this.status == 200) {

	    }

	    if(this.status >= 400){
	    	console.log("ERROR OCCURRED, CHECK SEREVER LOGS")
	    }

	};
	xhr.onerror = function(){
		
	}

	xhr.send(JSON.stringify(data));

	window.location = '/hi';


  }

  handleFormFieldsChange(val, field){
  	this.state.form_data[field] = val;
  	let form_data = {...this.state.form_data};
  	form_data[field] = val;
  	this.setState({
  		form_data
  	})

  }


  render() {

  	const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };


    return (
      <div>
  	  <h2 style={{textAlign: 'center', marginTop: '10px'}}>
		  USER REGISTERATION FORM
  	  </h2>

		<Form onSubmit={this.handleSubmit} style={{marginTop: '20px'}}>
		<FormItem {...formItemLayout} label="Name">
			<Input data-name="Name"
					onChange={(e)=>{this.handleFormFieldsChange(e.target.value, 'name')}}
					value={this.state.form_data.name}
					placeholder = "Name" />
		</FormItem>
		<FormItem {...formItemLayout} label="Email">
			<Input data-name="Email"
					onChange={(e)=>{this.handleFormFieldsChange(e.target.value, 'email')}}
					value={this.state.form_data.email}
					placeholder = "Email" />
		</FormItem>

		<FormItem {...formItemLayout} label="password">
			<Input data-name="password"
					type="password"
					onChange={(e)=>{this.handleFormFieldsChange(e.target.value, 'password')}}
					value={this.state.form_data.password}
					onChange={(e)=>{this.handleFormFieldsChange(e.target.value, 'password')}}
					placeholder = "password" />
		</FormItem>

		<FormItem {...formItemLayout} label="phone_number">
			<Input data-name="phone_number"
					onChange={(e)=>{this.handleFormFieldsChange(e.target.value, 'phone_number')}}
					value={this.state.form_data.phone_number}
					placeholder = "phone_number" />
		</FormItem>

		<FormItem {...formItemLayout} label="address">
			<TextArea data-name="address"
					autosize = {{ minRows: 2, maxRows: 6 }}
					maxLength= {100}
					value={this.state.form_data.address}
					onChange={(e)=>{this.handleFormFieldsChange(e.target.value, 'address')}}
					placeholder = "address" />
		</FormItem>

		<FormItem {...formItemLayout} >
		  <Button type="primary" style={{float: "right"}} htmlType="submit">Register</Button>
		</FormItem>
		</Form>
      </div>
    );
  }
}

export default UserRegister;
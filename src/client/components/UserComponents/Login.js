import React, {Component} from 'react';


import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class UserLogin extends Component {

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

    let url = '/api/user/login';
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

	// window.location = '/hi';


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
		  LOGIN
  	  </h2>

		<Form onSubmit={this.handleSubmit} style={{marginTop: '20px'}}>
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
		<FormItem {...formItemLayout} >
		  <Button type="primary" style={{float: "right"}} htmlType="submit">Login</Button>
		</FormItem>
		</Form>
      </div>
    );
  }
}

export default UserLogin;
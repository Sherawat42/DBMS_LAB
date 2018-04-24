import React, {Component} from 'react';


import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const role_map = {"client": 1, "owner": 2, "author": 3, "publisher": 4, "delivery boy": 5}



// class userRegister extends React.Component {
class UserUpdate extends Component {

	constructor(props){
		super(props);

		// this.handleFormFieldsChange = this.handleFormFieldsChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChangeOptions = this.onChangeOptions.bind(this);

		let roles = Object.keys(role_map)
		let roles_nums = Object.values(role_map)

		let role_ob_dis = roles.map(role=>{
			return {label: role, value: role}
		})

		this.state = {
	  		form_data:{},
	  		role_map: role_map,
	  		role_ob_dis: role_ob_dis,
	  	}
	}


	componentWillMount(){
		if(window.localStorage.authentication_data==""){
			window.url = '/user/login';
		}else{

			let url = '/api/user/loggedInCheck'
			var xhr = new XMLHttpRequest();
			xhr.open("POST", url, true);
			xhr.setRequestHeader('Content-Type', 'application/json')

			xhr.onreadystatechange = function() {
			    if (this.readyState==4 && this.status == 200) {
			    	console.log('______________-')
			    	let response=JSON.parse(this.response);
			    	if(!response.err){
			    		if(!response.data.logged_in){
			    			window.location = '/user/login';
			    		}
			    	}
			    }
			    if(this.status >= 400){
			    	console.log("ERROR OCCURRED, CHECK SEREVER LOGS")
			    }

			};
			xhr.onerror = function(){
				
			}
			let data = {};
			let authentication_data = window.localStorage.authentication_data || JSON.stringify({nothing:null});
			console.log(authentication_data);
			data.authentication_data = JSON.parse(authentication_data)
			console.log(data);
			xhr.send(JSON.stringify(data));
		}
	}


  handleSubmit(e){
    e.preventDefault();

    let url = '/api/user/updateRoles';
    let data = this.state.form_data;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader('Content-Type', 'application/json')

	xhr.onreadystatechange = function() {
	    if (this.readyState==4 && this.status == 200) {
			// window.location = '/user/login';

	    }

	    if(this.status >= 400){
	    	console.log("ERROR OCCURRED, CHECK SEREVER LOGS")
	    }

	};
	xhr.onerror = function(){
		
	}

	let authentication_data = JSON.parse(window.localStorage.authentication_data) || JSON.stringify({nothing:null});

	data.token = authentication_data.token;
	data.u_id = authentication_data.u_id;
	data.authentication_data = authentication_data;

	xhr.send(JSON.stringify(data));



  }

  onChangeOptions(e){
  	this.setState({
  		form_data: {
  			roles: e,
  		}
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
		  USER ROLE UPDATION FORM
  	  </h2>

		<Form onSubmit={this.handleSubmit} style={{marginTop: '20px'}}>
			<CheckboxGroup options={this.state.role_ob_dis}  onChange={this.onChangeOptions} />
		<FormItem {...formItemLayout} >
		  <Button type="primary" style={{float: "right"}} htmlType="submit">Update</Button>
		</FormItem>
		</Form>
      </div>
    );
  }
}

export default UserUpdate;
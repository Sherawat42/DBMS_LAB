import React, {Component} from 'react';
import 'antd/dist/antd.css'
// import {Route, IndexRoute, Link} from 'react-router'
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const handleMenuClick = (e)=>{
	if(e.key === 'logout'){
		console.log('lol')

		let url = '/api/user/logout'
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader('Content-Type', 'application/json')

		xhr.onreadystatechange = function() {
		    if (this.readyState==4 && this.status == 200) {
		    	window.localStorage.authentication_data = "undefined"
		    	window.location='/user/login';
		    }

		    if(this.status >= 400){
		    	console.log("ERROR OCCURRED, CHECK SEREVER LOGS")
		    }

		};
		xhr.onerror = function(){
			
		}
		let data = {};
		data.authentication_data = JSON.parse(window.localStorage.authentication_data)
		console.log(data);
		xhr.send(JSON.stringify(data));

		// window.location = '/hi';


	}else if(e.key == 'change_details'){
		window.location='/user/update';
	}
}

class Dashboard extends Component {

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
	render(){

	return (
			<div>

				<Menu
					mode="horizontal"
					float="right"
					onClick={(e)=>{handleMenuClick(e)}}
				>

					<Menu.Item key="BOOKS">
					  <Icon type="book" />BOOKS
					</Menu.Item>
					<Menu.Item key="app">
					  <Icon type="appstore" />My Orders
					</Menu.Item>
					<SubMenu title={<span><Icon type="setting" />User Settings</span>}>
					    <Menu.Item key="change_details" onClick={()=>{console.log('test');window.location='/user/update'}}>Change Details</Menu.Item>
					    <Menu.Item key="logout" onClick={(e)=>{console.log('click')}}>Logout</Menu.Item>
					</SubMenu>
				</Menu>
			</div>
		);
	}
};

export default Dashboard;

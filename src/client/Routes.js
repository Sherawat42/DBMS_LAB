import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Home from './components/Home';
// import UsersList from './components/UsersList';
// import ImageUpload from './components/ImageUpload';
import TestComponent from './components/TestComponent';



import UserRegister from './components/UserComponents/Register';
import UserLogin from './components/UserComponents/Login';
import Dashboard from './components/UserComponents/Dashboard';
import UserUpdate from './components/UserComponents/UpdationForm';

export default () =>{
	return (
		<div>
			<Switch>
				<Route exact path="/hi" component={TestComponent} />
				<Route exact path="/bye" component={()=>'Bye'} />



				<Route exact path="/dashboard" component={Dashboard} />

				<Route exact path="/user/register" component={UserRegister} />
				<Route exact path="/user/login" component={UserLogin} />
				<Route exact path="/user/update" component={UserUpdate} />


				
			</Switch>
		</div>
	);
}
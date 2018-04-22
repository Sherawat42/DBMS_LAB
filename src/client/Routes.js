import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Home from './components/Home';
// import UsersList from './components/UsersList';
// import ImageUpload from './components/ImageUpload';
import TestComponent from './components/TestComponent';



import UserRegister from './components/UserComponents/Register';

export default () =>{
	return (
		<div>
			<Switch>
				<Route exact path="/hi" component={TestComponent} />
				<Route exact path="/bye" component={()=>'Bye'} />


				<Route exact path="/user/register" component={UserRegister} />
			</Switch>
		</div>
	);
}
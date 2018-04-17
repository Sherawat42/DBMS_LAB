import React from 'react';
import {Route} from 'react-router-dom';
// import Home from './components/Home';
// import UsersList from './components/UsersList';
// import ImageUpload from './components/ImageUpload';

export default () =>{
			// <Route exact path="/" component={Home} />
			// <Route exact path="/users" component={UsersList} />
			// <Route exact path="/image_upload" component={ImageUpload} />
	return (
		<div>
			<Route exact path="/hi" component={()=>'Hi'} />
		</div>
	);
}
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import createPost from './pages/CreatePost';
import CreateStory from './pages/CreateStory';
import Home from './pages/HomePage';
import Profile from './pages/ProfilePage';
import Login from './pages/LoginPage';
import signup from './pages/SignupPage'
import EditPost from './components/EditPost'
import UpdateProfilePic from './components/UpdateProfilePic';
import UserProfile from './pages/UserProfilePage';
import Conversation from './pages/ConversationPage';
import { UserProvider } from './context/Context'

function App() {
	return (
		<div>
			<Router>
				<Route path="/" exact component={Login}></Route>
				<Route path="/signup" component={signup}></Route>
				<div className="container">
					<Switch>
						<Route path="/home" component={Home}></Route>
						<Route path="/createpost" component={createPost}></Route>
						<Route path="/createstory" component={CreateStory}></Route>
						<Route path="/editpost/:id" component={EditPost}></Route>
						<Route path="/chats" exact component={Conversation}></Route>

						<Route path="/profile" exact component={Profile}></Route>
						<Route path="/profile/updateProfilePic" component={UpdateProfilePic}></Route>
						<Route path="/profile/:id" exact component={UserProfile}></Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}


ReactDOM.render(
	<UserProvider>
		<App />
	</UserProvider>,
	document.getElementById('root')
);


// https://flaviocopes.com/axios-send-authorization-header/


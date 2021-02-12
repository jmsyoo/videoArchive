import React from 'react';
import App from '../pages/App';
import About from '../pages/About';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import MyVideo from '../pages/MyVideos';

const routes = [
	{
		Component: Home,
		key: 'Home',
		path: '/home'
	},
	{
		Component: Contact,
		key: 'Contact',
		path: '/contact'
	},
	{
		Component: MyVideo,
		key: 'MyVideo',
		path: '/myvideo'
	},
	{
		Component: About,
		key: 'About',
		path: '/about'
	},
	{
		Component: App,
		key: 'App',
		path: '/'
	}
];

export default routes;

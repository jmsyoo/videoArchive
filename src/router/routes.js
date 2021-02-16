import React from 'react';
import App from '../pages/App';
import About from '../pages/About';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import VideoPost from '../pages/VideoPost';
import MyVideo from '../pages/MyVideos';

const routes = [
	{
		Component: MyVideo,
		key: 'My Videos',
		path: '/myvideos'
	},
	{
		Component: About,
		key: 'About',
		path: '/about'
	},
	{
		Component: Contact,
		key: 'Contact',
		path: '/contact'
	},
	{
		Component: VideoPost,
		key: 'VideoPost',
		path: '/:id'
	},
	{
		Component: App,
		key: 'Search Videos',
		path: '/'
	}
];

export default routes;

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
		key: 'MyVideo',
		path: '/myvideo'
	},
	{
		Component: About,
		key: 'About',
		path: '/about'
	},
	{
		Component: VideoPost,
		key: 'VideoPost',
		path: '/:id'
	},
	{
		Component: App,
		key: 'Search Video',
		path: '/'
	}
];

export default routes;

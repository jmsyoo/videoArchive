import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import routes from './routes';
const AppRouter = props => {
	const logoImgUrl =
		'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/1004px-Logo_of_YouTube_%282015-2017%29.svg.png';
	return (
		<Router>
			<NavBar routes={routes} />
			<Container fluid className="AppPage">
				<div className={'logoDiv'}>
					<img src={logoImgUrl} style={{ height: '70px' }} />
					<h1 id="webTitle"> Archive</h1>
				</div>
				<Switch>
					{routes.map(({ Component, key, path }) => (
						<Route
							key={key}
							path={path}
							component={props => <Component page={key} {...props} />}
						></Route>
					))}
				</Switch>
			</Container>
		</Router>
	);
};

export default AppRouter;

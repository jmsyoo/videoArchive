import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import routes from './routes';
const AppRouter = props => {
	const logoImgUrl =
		'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/1004px-Logo_of_YouTube_%282015-2017%29.svg.png';

	const setBadgeType = category => {
		const badge = {
			code: 'info',
			music: 'warning',
			drama: 'primary',
			other: 'success'
		};
		for (let item in badge) {
			if (category == item) {
				return badge[item];
			}
		}
	};
	return (
		<Router>
			<NavBar routes={routes} logo={logoImgUrl} />
			<Container fluid className="AppPage">
				<Switch>
					{routes.map(({ Component, key, path }) => (
						<Route
							key={key}
							path={path}
							component={props => (
								<Component page={key} {...props} setBadge={setBadgeType} />
							)}
						></Route>
					))}
				</Switch>
			</Container>
			<div className="footer">
				<span>
					<strong>2021 </strong>School Project React JS App by James
				</span>
			</div>
		</Router>
	);
};

export default AppRouter;

import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Image } from 'react-bootstrap';

const NavBar = props => {
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Navbar.Brand href="/">
				<Image src={props.logo} fluid thumbnail />
				Youtube Archive
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					{props.routes
						.filter(item => !item.path.includes(':'))
						.map(({ key, path }) => {
							return (
								<Link key={key} to={path}>
									{key}
								</Link>
							);
						})}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;

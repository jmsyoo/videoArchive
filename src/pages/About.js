import React, { useState } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

export default function About(props) {
	return (
		<div className="AboutPage">
			<Jumbotron fluid>
				<Container>
					<h1>Personal Youtube Archive</h1>
					<p>
						This is an app which enables users to archives videos and add
						comments and rating.
					</p>
				</Container>
			</Jumbotron>
		</div>
	);
}

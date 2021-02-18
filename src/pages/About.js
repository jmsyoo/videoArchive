import React, { useState } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

export default function About(props) {
	return (
		<div className="AboutPage">
			<Jumbotron fluid>
				<Container>
					<h1>Personal Youtube Archive</h1>
					<p>
						This app will help the users to create their own Youtube video
						collection. The videos can be categolized and filtered. Users can
						add ratings and comments.
					</p>
				</Container>
			</Jumbotron>
		</div>
	);
}

import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

export default function PageTitle(props) {
	return (
		<Jumbotron fluid>
			<Container>
				<h1 className={'pageTitle'}>{props.page}</h1>
			</Container>
		</Jumbotron>
	);
}

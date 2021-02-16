import React, { useState } from 'react';
import PageTitle from '../components/PageTitle';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function Contact(props) {
	return (
		<div className="ContactPage">
			<PageTitle page={props.page} />
			<div className="contactForm">
				<Row>
					<Col lg={12} md={12} sm={12} xs={12}>
						<Form>
							<Form.Group>
								<Form.Label>Email address</Form.Label>
								<Form.Control type="email" placeholder="Enter email" />
								<Form.Text className="text-muted">
									We'll never share your email with anyone else.
								</Form.Text>
							</Form.Group>

							<Form.Group>
								<Form.Label>Message</Form.Label>
								<Form.Control as="textarea" rows={3} />
							</Form.Group>
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
					</Col>
				</Row>
			</div>
		</div>
	);
}

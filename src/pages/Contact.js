import React, { useRef, useState } from 'react';
import PageTitle from '../components/PageTitle';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function Contact(props) {
	const email = useRef(null);
	const message = useRef(null);
	const [confirm, setConfirm] = useState({
		isSubmited: false,
		message: 'You have subimited your contact information.'
	});

	const handleSubmit = async e => {
		e.preventDefault();
		const emailValue = email.current.value;
		const messageValue = message.current.value;
		try {
			const response = await fetch('/api/contacts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: emailValue,
					message: messageValue
				})
			});
			setConfirm({ ...confirm, isSubmited: true });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="ContactPage">
			<PageTitle page={props.page} />
			<div className="contactForm">
				<Row>
					<Col lg={12} md={12} sm={12} xs={12}>
						<Form onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type="email"
									placeholder="Enter email"
									ref={email}
								/>
								<Form.Text className="text-muted">
									We'll never share your email with anyone else.
								</Form.Text>
							</Form.Group>

							<Form.Group>
								<Form.Label>Message</Form.Label>
								<Form.Control as="textarea" rows={3} ref={message} />
							</Form.Group>
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
						<h2 className="confirmMessage">
							{confirm.isSubmited ? confirm.message : ''}
						</h2>
					</Col>
				</Row>
			</div>
		</div>
	);
}

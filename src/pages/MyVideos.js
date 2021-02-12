import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import {
	Container,
	Row,
	Col,
	InputGroup,
	FormControl,
	Button,
	Card
} from 'react-bootstrap';

export default function MyVideo(props) {
	const [videos, setVideo] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/videos');
				const data = await response.json();
				setVideo([...data]);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [videos]);

	return (
		<>
			{Object.keys(videos).length
				? videos.map((item, index) => {
						return (
							<Row key={item.id}>
								<Col md={12}>
									<Card>
										<Card.Body>
											<Row>
												<Col md={8} sm={12} xs={12}>
													<div className={'videowrapper'}>
														<YouTube videoId={item.id} />
													</div>
												</Col>
												<Col md={4} sm={12} xs={12}>
													<Card className={'videoDescrip'}>
														<Card.Header>
															<Card.Title className={'videoTitle'}>
																{item.title}
															</Card.Title>
															<Card.Title className={'channelTitle'}>
																{item.channelTitle}
															</Card.Title>
														</Card.Header>
														<Card.Body className={''}>
															<Card.Body>
																<Card.Text>{item.description}</Card.Text>
																{/* <small>
																	Video Date: {item.snippet.publishTime}
																</small> */}
															</Card.Body>
														</Card.Body>
														<Card.Footer>
															<form>
																<input type="text" value={item.id} />
																<Button
																	className={'addBtn'}
																	type="sumbit"
																	variant="danger"
																>
																	Add Comment
																</Button>
															</form>
														</Card.Footer>
													</Card>
												</Col>
											</Row>
										</Card.Body>
									</Card>
								</Col>
							</Row>
						);
				  })
				: ''}
		</>
	);
}

import React, { useRef } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import YouTube from 'react-youtube';

export default function VideoList({ videos }) {
	const id = useRef([]);
	const title = useRef([]);
	const channelTitle = useRef([]);
	const description = useRef([]);

	const handleSubmit = async e => {
		e.preventDefault();
		const index = e.currentTarget.id;

		const idValue = id.current[index].value;
		const titleValue = title.current[index].value;
		const channelTitleValue = channelTitle.current[index].value;
		const descriptionValue = description.current[index].value;

		try {
			const response = await fetch('/api/videos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: idValue,
					title: titleValue,
					channelTitle: channelTitleValue,
					description: descriptionValue
				})
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{Object.keys(videos).length > 0
				? videos[0].items.map((item, index) => {
						return (
							<Row key={`${item.id.videoId}${index}`}>
								<Col md={12}>
									<Card>
										<Card.Body>
											<Row>
												<Col md={8} sm={12} xs={12}>
													<div className={'videowrapper'}>
														<YouTube videoId={item.id.videoId} />
													</div>
												</Col>
												<Col md={4} sm={12} xs={12}>
													<Card className={'videoDescrip'}>
														<Card.Header>
															<Card.Title className={'videoTitle'}>
																{item.snippet.title}
															</Card.Title>
															<Card.Title className={'channelTitle'}>
																{item.snippet.channelTitle}
															</Card.Title>
														</Card.Header>
														<Card.Body className={''}>
															<Card.Body>
																<Card.Text>
																	{item.snippet.description}
																</Card.Text>
																<small>
																	Video Date: {item.snippet.publishTime}
																</small>
															</Card.Body>
														</Card.Body>
														<Card.Footer>
															<form onSubmit={handleSubmit} id={index}>
																<input
																	type="text"
																	value={item.id.videoId}
																	ref={e => (id.current[index] = e)}
																	className={'hide'}
																/>
																<input
																	type="text"
																	value={item.snippet.title}
																	ref={e => (title.current[index] = e)}
																	className={'hide'}
																/>
																<input
																	type="text"
																	value={item.snippet.channelTitle}
																	ref={e => (channelTitle.current[index] = e)}
																	className={'hide'}
																/>
																<input
																	type="text"
																	value={item.snippet.description}
																	ref={e => (description.current[index] = e)}
																	className={'hide'}
																/>
																<Button
																	className={'addBtn'}
																	type="sumbit"
																	variant="success"
																>
																	Add to Archive
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

import React from 'react';
import {
	Container,
	Row,
	Col,
	InputGroup,
	FormControl,
	Button,
	Card
} from 'react-bootstrap';
import YouTube from 'react-youtube';

export default function VideoList({ videos }) {
	return (
		<>
			{Object.keys(videos).length
				? videos[0].items.map((item, index) => {
						return (
							<Row key={item.id.videoId}>
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
															<form>
																<input type="text" value={item.id.videoId} />
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

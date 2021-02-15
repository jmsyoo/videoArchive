import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import { Row, Col, Button, Card, InputGroup } from 'react-bootstrap';

export default function VideoPost(props) {
	const [video, setVideo] = useState({});

	const name = useRef(null);
	const comment = useRef(null);
	const rating = useRef(null);
	const videoId = useRef(null);
	const commentId = useRef([]);

	const categoryOptions = ['code', 'music', 'drama'];

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/videos/${props.match.params.id}`);
				const data = await response.json();
				setVideo(data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [video]);

	const handleSubmit = async e => {
		e.preventDefault();
		const nameValue = name.current.value;
		const commentValue = comment.current.value;
		const ratingValue = rating.current.value;
		const videoIdValue = videoId.current.value;

		console.log('rating: ' + ratingValue);
		try {
			const response = await fetch(`/api/comments`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: nameValue,
					message: commentValue,
					rating: ratingValue,
					videoId: videoIdValue
				})
			});
			const data = await response.json();
			setVideo({ ...data });
		} catch (error) {
			console.error(error);
		}
	};
	const deleteComment = async e => {
		e.preventDefault();
		const index = e.currentTarget.id.replace('comment', '');
		const foundId = commentId.current[index].value;
		console.log(foundId);
		if (index != null) {
			try {
				const reponse = await fetch(`/api/comments/${foundId}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					}
				});
			} catch (error) {
				console.error(error);
			}
		}
	};
	return (
		<div className={'VideoPost'}>
			<div className={'showVideoDiv'}>
				<Card>
					<Card.Header>
						<Card.Title>{video.title ? video.title : ''}</Card.Title>
					</Card.Header>
					<Card.Body>
						<div className={'videowrapper'}>
							<YouTube videoId={video.id} />
						</div>
						<Card.Text className={'post_descrip'}>
							{video.description}
						</Card.Text>
					</Card.Body>
					<Card.Body>
						<h2 className={'commentTitle'}>Comments</h2>
						<ul>
							{video.comments && video.comments.length > 0
								? video.comments.map((item, index) => {
										return (
											<li key={`${item._id}`}>
												<p>
													<span className="name">
														<strong>{item.name}</strong>:{' '}
													</span>
													{item.message}
													<Button
														id={`comment${index}`}
														className={'cmDelBtn'}
														type="submit"
														variant="danger"
														ref={e => (commentId.current[index] = e)}
														value={item._id}
														onClick={deleteComment}
													>
														<i className="far fa-trash-alt"></i>
													</Button>
												</p>
												<h5>
													{(() => {
														const stars = [];
														for (let i = 0; i < item.rating; i++) {
															stars.push(
																<i className="fas fa-star text-warning"></i>
															);
														}
														return stars;
													})()}
												</h5>{' '}
												<small>{item.createdAt}</small>
											</li>
										);
								  })
								: ''}
						</ul>
					</Card.Body>
					<Card.Footer>
						<Row>
							<Col md={8} sm={12} xs={12}>
								<form className={'commentForm'} onSubmit={handleSubmit}>
									<input
										type="text"
										placeholder={'Enter user name'}
										ref={name}
									/>
									<input
										type="text"
										placeholder={'Enter comment'}
										ref={comment}
									/>
									<input
										type="text"
										placeholder={'Enter 0 ~ 5 for rating'}
										ref={rating}
									/>
									<input type="text" value={video._id} ref={videoId} />
									<InputGroup.Append>
										<Button variant="success" type="submit">
											Add comment
										</Button>
									</InputGroup.Append>
								</form>
							</Col>
							<Col md={4} sm={12} xs={12}>
								<select>
									{(() => {
										const arr = [];
										for (let i = 0; i < categoryOptions.length; i++) {
											arr.push(
												<option value={categoryOptions[i]}>
													{categoryOptions[i]}
												</option>
											);
										}
										return arr;
									})()}
								</select>
							</Col>
						</Row>
					</Card.Footer>
				</Card>
			</div>
		</div>
	);
}

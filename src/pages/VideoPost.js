import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import { Button, Card, InputGroup, Tabs, Tab, Badge } from 'react-bootstrap';

export default function VideoPost(props) {
	const [video, setVideo] = useState({});
	const [tabKey, setTabKey] = useState('comment');

	const name = useRef(null);
	const comment = useRef(null);
	const rating = useRef(null);
	const videoId = useRef(null);
	const commentId = useRef([]);
	const category = useRef(null);

	const categoryOptions = ['code', 'music', 'drama', 'other'];

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
	const updateVideoCategory = async e => {
		e.preventDefault();
		const id = props.match.params.id;
		console.log(id);
		try {
			const response = await fetch(`/api/videos/${props.match.params.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					category: category.current.value
				})
			});
			console.log(response);
			const data = await response.json();
			setVideo(data);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div className={'VideoPost'}>
			<div className={'showVideoDiv'}>
				<Card>
					<Card.Header>
						<Card.Title>
							{video.title ? video.title : ''}
							<Badge variant={props.setBadge(video.category)}>
								{video.category != null ? video.category : ''}
							</Badge>
						</Card.Title>
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
					<Card.Body className={'inputBody'}>
						<Tabs
							id="inputFormTab"
							activeKey={tabKey}
							onSelect={k => setTabKey(k)}
						>
							<Tab eventKey={'comment'} title="comment">
								<div className="commentFormDiv">
									<label className="formLabel">Comment Form</label>
									<form className={'form'} onSubmit={handleSubmit}>
										<input type="text" placeholder={'User name'} ref={name} />
										<input type="text" placeholder={'Comment'} ref={comment} />
										<input
											type="text"
											placeholder={'0 ~ 5 for rating'}
											ref={rating}
										/>
										<input
											type="text"
											value={video._id}
											ref={videoId}
											className={'hide'}
										/>
										<InputGroup.Append>
											<Button variant="success" type="submit">
												Add comment
											</Button>
										</InputGroup.Append>
									</form>
								</div>
							</Tab>
							<Tab eventKey={'category'} title="category">
								<div className="categoryFormDiv">
									<label className="formLabel">Category Form</label>
									<form className={'form'} onSubmit={updateVideoCategory}>
										<select ref={category}>
											{(() => {
												const tempArr = [];
												for (let i = 0; i < categoryOptions.length; i++) {
													tempArr.push(
														<option value={categoryOptions[i]}>
															{categoryOptions[i]}
														</option>
													);
												}
												return tempArr;
											})()}
										</select>
										<InputGroup.Append>
											<Button variant="success" type="submit">
												Update Category
											</Button>
										</InputGroup.Append>
									</form>
								</div>
							</Tab>
						</Tabs>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
}

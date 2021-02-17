import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import { Button, Card, InputGroup, Tabs, Tab, Badge } from 'react-bootstrap';

export default function VideoPost(props) {
	const [video, setVideo] = useState({});
	const [tabKey, setTabKey] = useState('comment');
	const [rate, setRate] = useState(0);

	const name = useRef(null); // login session
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

	const increment = () => {
		if (rate > 4) {
			setRate(5);
		} else {
			setRate(rate + 1);
		}
	};
	const decrement = () => {
		if (rate < 1) {
			setRate(0);
		} else {
			setRate(rate - 1);
		}
	};
	return (
		<div className={'VideoPost'}>
			<div className={'logoDiv'}>
				<h1 className={'pageTitle'}>{props.page}</h1>
			</div>
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
										<input
											className="commentInput"
											type="text"
											placeholder={'Username'}
											ref={name}
										/>
										<input
											className="commentInput"
											type="text"
											placeholder={'Comment'}
											ref={comment}
										/>
										<div className="ratingDiv">
											<button
												className="rateBtn"
												type="button"
												onClick={decrement}
											>
												<i class="fas fa-minus"></i>
											</button>
											<input
												className={'ratingInput'}
												type="text"
												placeholder={'0 ~ 5 for rating'}
												ref={rating}
												value={rate}
											/>
											<button
												className="rateBtn"
												type="button"
												onClick={increment}
											>
												<i class="fas fa-plus"></i>
											</button>
										</div>

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
											<Link className={'backTolistLink'} to={`/myvideos`}>
												Go back to my video list
											</Link>
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

import React, { useState, useEffect, useRef } from 'react';
import PageTitle from '../components/PageTitle';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import {
	Row,
	Col,
	Button,
	Card,
	Badge,
	OverlayTrigger,
	Tooltip
} from 'react-bootstrap';

export default function MyVideo(props) {
	const [videos, setVideo] = useState([]);
	const [category, setCategory] = useState([]);
	const delSelectVideo = useRef([]);
	const categories = useRef([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/videos');
				const data = await response.json();
				setVideo(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [props.tweets]);

	const handleDelete = async e => {
		const index = e.currentTarget.id.replace('delVideoBtn', '');
		const videoId = delSelectVideo.current[index].value;

		try {
			const response = await fetch(`/api/videos/${videoId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await response.json();
		} catch (error) {
			console.log(error);
		}
	};
	const checkWordsLength = (words, type) => {
		let reducedWords = '';
		const titleLength = 15;
		const descripLength = 70;

		if (type == 'title') {
			reducedWords = words.substring(0, titleLength);
		} else if ((type = 'descrip')) {
			reducedWords = words.substring(0, descripLength) + '...';
		}
		return reducedWords;
	};
	const handleCategoryFilter = async e => {
		const allCategory 

		const textValue = e.target.innerText.replace('#', '').toLowerCase();
		// console.log(textValue);
		if (textValue == 'all') {
			await setCategory(allCategory);
		} else {
			setCategory(textValue);
		}
	};
	const renderTooltip = props => (
		<Tooltip id="button-tooltip" {...props}>
			Click #hashtag to filter videos
		</Tooltip>
	);

	return (
		<div className={'MyVideo'}>
			<PageTitle page={props.page} />
			<Row className="hashTagRow">
				<Col md={6} sm={12} xs={12}>
					<div>
						{(() => {
							const upperCase = word => {
								const cap = word.split('').reduce((acc, item, index) => {
									if (index == 0) {
										item = item.toUpperCase();
									}
									return acc + item;
								}, '');
								return cap;
							};

							const tempArr = [];
							for (let item in props.badge) {
								tempArr.push(
									<Badge key={item} pill variant={props.badge[item]}>
										<OverlayTrigger
											placement="bottom"
											delay={{ show: 250, hide: 400 }}
											overlay={renderTooltip}
										>
											<span onClick={handleCategoryFilter}>{`#${upperCase(
												item
											)}`}</span>
										</OverlayTrigger>
									</Badge>
								);
							}
							return tempArr;
						})()}
					</div>
				</Col>
			</Row>
			<Row>
				{Object.keys(videos).length
					? videos
							.filter(value => value.category.includes(category))
							.map((item, index) => {
								return (
									<Col
										key={item._id}
										className={`myVideoCol ${item.category}`}
										md={3}
										sm={4}
										xs={12}
										ref={e => {
											categories.current[index] = e;
										}}
									>
										<Card>
											<Card.Header>
												<Card.Title className={'videoTitle'}>
													{checkWordsLength(item.title, 'title')}
													<Badge
														className={'videoCategory'}
														variant={props.setBadge(item.category)}
													>
														{item.category != null ? item.category : ''}
													</Badge>
												</Card.Title>
												<Card.Title className={'channelTitle'}>
													{item.channelTitle}
												</Card.Title>
											</Card.Header>
											<Card.Body>
												<div className={'videowrapper'}>
													<YouTube videoId={item.id} />
												</div>
												<Card.Text className={'videoDescrip'}>
													{checkWordsLength(item.description, 'descrip')}
												</Card.Text>
											</Card.Body>
											<Card.Footer>
												<Button
													className={'delVideoBtn'}
													type="button"
													variant="outline-danger"
													id={`delVideoBtn${index}`}
													onClick={handleDelete}
													value={item._id}
													ref={e => {
														delSelectVideo.current[index] = e;
													}}
												>
													Delete
												</Button>
												<Link to={`/${item._id}`}>
													<Button type="button" variant="outline-dark">
														Update
													</Button>
												</Link>
											</Card.Footer>
										</Card>
									</Col>
								);
							})
					: ''}
			</Row>
		</div>
	);
}

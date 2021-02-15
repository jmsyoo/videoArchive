import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import { Row, Col, Button, Card } from 'react-bootstrap';

export default function MyVideo(props) {
	const [videos, setVideo] = useState([]);
	const delSelectVideo = useRef([]);

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
	}, [videos]);

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
		const titleLength = 21;
		const descripLength = 100;

		if (type == 'title') {
			reducedWords = words.substring(0, titleLength);
		} else if ((type = 'descrip')) {
			reducedWords = words.substring(0, descripLength);
		}
		return reducedWords;
	};

	return (
		<div className={'MyVideo'}>
			<Row>
				{Object.keys(videos).length
					? videos.map((item, index) => {
							return (
								<Col className={'myVideoCol'} md={3} sm={4} xs={12}>
									<Card>
										<Card.Header>
											<Card.Title className={'videoTitle'}>
												{checkWordsLength(item.title, 'title')}
											</Card.Title>
											<Card.Title className={'channelTitle'}>
												{item.channelTitle}
											</Card.Title>
										</Card.Header>
										<Card.Body>
											<div className={'videowrapper'}>
												<YouTube videoId={item.id} />
											</div>
											<Card.Text>
												{checkWordsLength(item.description, 'descrip')}
											</Card.Text>
										</Card.Body>
										<Card.Footer>
											<Button
												className={'delVideoBtn'}
												type="button"
												variant="danger"
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
												<Button type="button" variant="warning">
													Show
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

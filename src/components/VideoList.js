import React, { useRef, useState } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import YouTube from 'react-youtube';

export default function VideoList({ videos }) {
	const id = useRef([]);
	const title = useRef([]);
	const channelTitle = useRef([]);
	const description = useRef([]);
	const archived = useRef([]);

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
					description: descriptionValue,
					category: ''
				})
			});
		} catch (error) {
			console.error(error);
		}
	};
	const handleClick = e => {
		const index = e.currentTarget.value;
		archived.current[index].innerText = 'Added to my archive';
	};
	const checkWordsLength = (words, type) => {
		let reducedWords = '';
		const titleLength = 21;
		const descripLength = 70;

		if (type == 'title') {
			reducedWords = words.substring(0, titleLength);
		} else if ((type = 'descrip')) {
			reducedWords = words.substring(0, descripLength);
		}
		return reducedWords;
	};

	return (
		<>
			<Row>
				{Object.keys(videos).length > 0
					? videos[0].items.map((item, index) => {
							return (
								<Col
									className={'resultCol'}
									key={`${item.id.videoId}${index}`}
									md={3}
									sm={4}
									xs={12}
								>
									<Card>
										<Card.Header>
											<Card.Title className={'videoTitle'}>
												{checkWordsLength(item.snippet.title, 'title')}
											</Card.Title>
											<Card.Title className={'channelTitle'}>
												{item.snippet.channelTitle}
											</Card.Title>
										</Card.Header>
										<Card.Body>
											<div className={'videowrapper'}>
												<YouTube videoId={item.id.videoId} />
											</div>
											<Card.Text>
												{checkWordsLength(item.snippet.description, 'descrip')}
											</Card.Text>
											<small>Video Date: {item.snippet.publishTime}</small>
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
												{/* <span>{message}</span> */}
												<span
													className={'text-danger archivedMessage'}
													ref={e => (archived.current[index] = e)}
												></span>
												<Button
													className={'addBtn'}
													type="sumbit"
													variant="success"
													onClick={handleClick}
													value={index}
												>
													Add to Archive
												</Button>
											</form>
										</Card.Footer>
									</Card>
								</Col>
							);
					  })
					: ''}
			</Row>
		</>
	);
}

import React, { useEffect, useState, useRef } from 'react';
import VideoList from '../components/VideoList';
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

export default function App(props) {
	var baseUrl = 'https://www.googleapis.com/youtube/v3/search?';
	var firstKey = 'IzaSyBFggNrF6KZY92a1JOR0ZwrjpTtytWMy3Y';
	// var secondKey = 'AIzaSyBvXnUrTm-SXh4ZVQfB8EhFeFi3-lbVCwg';

	const apiKeys = {
		opt1: 'IzaSyBFggNrF6KZY92a1JOR0ZwrjpTtytWMy3Y',
		opt2: 'AIzaSyBvXnUrTm-SXh4ZVQfB8EhFeFi3-lbVCwg'
	};
	const [query, updateQuery] = useState({
		q: '', // Search
		part: 'snippet',
		key: apiKeys.opt2,
		type: 'video',
		maxResults: 2
	});

	const [searchUrl, updateSearchUrl] = useState('');
	const searchTitle = useRef(null);
	const [videos, setVideos] = useState([]); // Video list

	useEffect(() => {
		(async () => {
			if (searchUrl) {
				try {
					const response = await fetch(searchUrl);
					const data = await response.json();
					console.log(data);
					await setVideos([{ ...data }]);
				} catch (error) {
					console.error(error);
				} finally {
					updateQuery({
						q: '', // Search
						part: 'snippet',
						key: apiKeys.opt2,
						type: 'video',
						maxResults: 2
					});
				}
			}
		})();
	}, [searchUrl]);

	const handleSubmit = async event => {
		event.preventDefault();

		for (let option in query) {
			baseUrl += option + '=' + query[option] + '&';
		}
		baseUrl = baseUrl.substr(0, baseUrl.length - 1);
		updateSearchUrl(baseUrl);
	};

	const handleChange = event => {
		updateQuery({ ...query, [event.target.id]: event.target.value });
	};

	return (
		<Container fluid className="AppPage">
			<div className={'search'}>
				<form onSubmit={handleSubmit}>
					<InputGroup>
						<input
							id="q"
							type="text"
							placeholder="Enter Video Title"
							ref={searchTitle}
							onChange={handleChange}
						/>
						<InputGroup.Append>
							<Button variant="light" type="submit">
								<i className="fas fa-search fa-2x"></i>
							</Button>
						</InputGroup.Append>
					</InputGroup>
				</form>
			</div>
			<VideoList videos={videos} />

			{/* <Row>
				<Col md={12} xs={12}>
					{Object.keys(videos).length ? (
						<Card>
							<h2>{videos[0].items[0].snippet.title}</h2>
							<img src={videos[0].items[0].snippet.thumbnails.high.url} />
						<Card/>
					) : (
						'no'
					)}
				</Col>
			</Row> */}
		</Container>
	);
}

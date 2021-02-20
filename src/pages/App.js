import React, { useEffect, useState, useRef } from 'react';
import VideoList from '../components/VideoList';
import PageTitle from '../components/PageTitle';
import { InputGroup, Button } from 'react-bootstrap';

export default function App(props) {
	var baseUrl = 'https://www.googleapis.com/youtube/v3/search?';

	const apiKeys = {
		opt1: 'AIzaSyBecvdGyXMfpfhARBOmTIoTzsDvEuNTxgg',
		opt2: 'AIzaSyBvXnUrTm-SXh4ZVQfB8EhFeFi3-lbVCwg',
		opt3: 'AIzaSyDjUyOpSIA0hOhohEFvuOAs8JPDtwu9FUg'
	};
	const [query, updateQuery] = useState({
		q: '', // Search
		part: 'snippet',
		chart: 'mostPopular',
		key: apiKeys.opt1,
		type: 'video',
		maxResults: 8
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
						chart: 'mostPopular',
						key: apiKeys.opt1,
						type: 'video',
						maxResults: 8
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
		<>
			<PageTitle page={props.page} />
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
		</>
	);
}

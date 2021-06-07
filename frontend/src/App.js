import React, { Fragment, useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [twitterUser, setTwitteruser] = useState('');
	const [userFound, setUserFound] = useState('No users found');

	const errorText = useRef(null);

	const getTwitterAPI = async (e) => {
		e.preventDefault();
		let twitterSearchUser = twitterUser.toLowerCase();
		console.log(twitterSearchUser);

		const response = await axios.get(`http://localhost:5000/${twitterSearchUser}`);

		try {
			console.log(response.data);
			setLoading(false);
			setData(response.data);
			errorText.current.classList.add('hide');
			errorText.current.classList.remove('show');
			setUserFound('User found');

			// Clear form search field
			setTwitteruser('');
		} catch (error) {
			console.log(error);
			// console.log(error);
		}
	};

	return (
		<Fragment>
			<div className="container">
				<h1>Twitter Feed</h1>
				<div className="tweet-search-form">
					<form onSubmit={(e) => getTwitterAPI(e)}>
						<div>
							<label>Search for a Twitter user (mkbhd)</label>
						</div>
						<div>
							<span>@</span>
							<input
								className="twitter-search-field"
								type="text"
								onChange={(e) => setTwitteruser(e.target.value)}
								value={twitterUser}
								required
							/>
						</div>
						<div>
							<input className="submit-button" type="submit" value="Ok" />
						</div>
						<div className="error-warning show" ref={errorText}>
							<p>{userFound}</p>
						</div>
					</form>
				</div>
				<main>
					{loading ? (
						// <div className="twitter-loading">
						// 	<div class="loader-ring">
						// 		<div className="loader-ring-light"></div>
						// 		<div className="loader-ring-track"></div>
						// 	</div>
						// </div>
						<div></div>
					) : (
						<div className="twitter-loaded">
							{data.slice(0, 10).map((tweets) => (
								<div key={tweets.conversation_id} className="twitter-tweets">
									<p>{tweets.text}</p>

									{!tweets.image ? (
										<div></div>
									) : (
										<div>
											<img src={tweets.image} alt="Tweet Image" />
										</div>
									)}
								</div>
							))}
						</div>
					)}
				</main>
			</div>
		</Fragment>
	);
};

export default App;

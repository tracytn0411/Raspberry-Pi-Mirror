import React, {Component} from "react";
import axios from 'axios';
import moment from 'moment';

class News extends Component {
	constructor(props) {
		// pass props to parent class
		super(props);
		// initial state
		this.state = {
			articles: [],
			date: moment().startOf('hour').fromNow()
		};
	}

	componentWillMount() {
		axios
			.get('/api/news')
			.then(res => {
				const articles = res.data.articles;
				this.setState({
					articles: articles
				})
				console.log(articles)
			})
			.catch(error => {
				console.log(error)
			});
	}

	render() {
		return (
			<div key>
				{this.state.articles.map((news, i) => {
					return (
						<div key={i}>
							<p>{news.title}</p>
						</div>	
					)
				})}
			</div>
		)
	}
}

export default News



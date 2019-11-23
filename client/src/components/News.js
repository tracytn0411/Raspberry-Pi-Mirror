import React, {Component} from "react";
import axios from 'axios';

class News extends Component {
	constructor(props) {
		// pass props to parent class
		super(props);
		// initial state
		this.state = {
			articles: []
		};

		this.apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=7&apiKey=3aeb437f441449bb99e5a5c0b96125b5`
	}

	componentWillMount() {
		axios.get(this.apiUrl).then(res => {
			const articles = res.data.articles;

			this.setState({articles: articles})
			console.log(articles)
		}).catch(error => {
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



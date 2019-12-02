import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

class News extends Component {
  constructor(props) {
    // pass props to parent class
    super(props);
    // initial state
    this.state = {
      articles: [],
      date: moment()
        .startOf("hour")
        .fromNow()
    };
  }

  componentDidMount() {
    // const result = getNews();
    getNews()
      .then( 
        articles => this.setState({articles})
      )

    setInterval(async () => {
      this.setState({
        articles: await getNews()
      });
    }, 600000);
  }

  render() {
    return (
      <div key>
        {this.state.articles.map((news, i) => {
          return (
            <div key={i}>
              <p>{news.title.replace(/\-[^\-]*$/, "").trim()}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

function getNews() {
  const result = axios
    .get("/api/news")
    .then(res => {
      const articles = res.data.articles;
      //   this.setState({
      // 	articles: articles
      //   });
      //   console.log('once');
      return articles;
    })
    .catch(error => {
      console.log(error);
      return null;
    });
  return result;
  /*
  return axios
    .get("/api/news")
    .then(res => {
      const articles = res.data.articles;
      //   this.setState({
      // 	articles: articles
      //   });
      //   console.log('once');
      return articles;
    })
    .catch(error => {
      console.log(error);
      return null;
    });
  */
}
export default News;

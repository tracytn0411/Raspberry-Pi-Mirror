import React, { Component } from "react";
import { FaRegNewspaper } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";
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
    getNews().then(articles => this.setState({ articles }));

    setInterval(async () => {
      this.setState({
        articles: await getNews()
      });
    }, 600000);
  }

  render() {
    return (
      <Row key className='News-row'>
        <Col xs={10} className="News-headline d-flex">
          <div className="mr-auto p-0">News</div>
        </Col>
        {this.state.articles.map((news, i) => {
          return (
            <Col xs={11} key={i}>
              <p className='News-title text-truncate m-1'>
                <FaRegNewspaper style={{color:'grey'}}/>{news.title.replace(/-[^-]*$/, "").trim()}
              </p>
              <p className='News-title text-truncate m-1' style={{fontStyle: 'italic'}}>- {news.source.name}</p>
            </Col>
          );
        })}
      </Row>
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

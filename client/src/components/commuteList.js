import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
//import DeleteBtn from "../components/DeleteBtn";

class commuteList extends Component {
  constructor(props) {
    super(props);
    //this.deleteBook = this.deleteBook.bind(this);
  }

  //deleteBook(bookID) {
    //pass the book id (to be deleted) from deleteBtn to Saved page (parent)
    //this.props.deleteBook(bookID);
  //}

  render() {
    const savedBooks = this.props.savedBooks;

    return (
      <Container fluid className="saveBooks">
        <Row className="m-1">
          <Col>
            <h3>Saved Books</h3>
          </Col>
        </Row>

        <Row>
          {savedBooks.map(book => (
            <Col md={6} lg={4} key={book.book_id} className="mt-3">
              <Card>
                <Card.Header>
                  <Card.Title className="bookTitle">{book.title}</Card.Title>
                  <p className="mb-1">
                    {/* Loop over authors array */}
                    by{" "}
                    <em className="bookAuthors">
                      {book.authors.map((author, i) => (
                        <span key={i}>{(i ? ", " : "") + author}</span>
                      ))}
                    </em>
                  </p>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={4} className="p-0">
                      <Card.Img src={book.image} />
                    </Col>
                    <Col md={8}>
                      <div className="bookDescription">
                        <Card.Text>{book.description}</Card.Text>
                      </div>
                      <Card.Link href={book.book_link} target="_blank">
                        Read more...
                      </Card.Link>

                      <Card.Footer className="text-right">
                        <DeleteBtn
                          bookID={book._id}
                          value={book.book_id}
                          data_book={book}
                          deleteBook={this.deleteBook}
                        />
                      </Card.Footer>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default commuteList;

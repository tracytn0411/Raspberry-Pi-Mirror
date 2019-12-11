import React, { Component } from "react";
import { Button } from "react-bootstrap";


class SaveDeleteMedia extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}
		this.deleteMedia = this.deleteMedia.bind(this);
		}
	
	deleteMedia(e) {
		var mediaID = e.target.id;
		console.log(`Deleted media that has id: ${mediaID}`);
		this.props.saveDeleteMedia(mediaID); 
		//pass the commute id to CustomMusic (parent)
	}

	render() {
		const mediaID = this.props.mediaID;
		console.log('datamedia', this.props.data_media)
		console.log('i need this', this.props)
		return (
			<div>

				{/* <Button 
					variant="outline-success"
					id={}
					onClick={}
				>
					Save
				</Button> */}
				<Button
					variant="outline-danger"
					id={mediaID}
					onClick={this.deleteMedia}
				>
					X
				</Button>
			</div>
		);
	}
}

export default SaveDeleteMedia;
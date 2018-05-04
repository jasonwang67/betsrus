import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Label from 'react-bootstrap/lib/Label';
import Image from 'react-bootstrap/lib/Image';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import './styles.css';

// This will be our main component container for the rest of our site
class League extends Component {

	componentDidMount () {
		this.props.getLeague();
	}

	componentWillUnmount () {
		this.props.clearLeague();
	}

  constructor (props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
        show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }





  render () {
    return (
      <div>
      	<h1>{ this.props.name } </h1>
				<h2>League Code (Share with Friends): { this.props.id }</h2>
      	<Grid>
      		<Row className="leagueGrid">
      			<Col md={8} mdOffset={2}>
      				<h1>
      					<Label bsStyle="primary">Upcoming Games</Label>{' '}
      				</h1>
      				<ListGroup>
  						<ListGroupItem>
  							<Grid>
  								<Row className="gameRow1">
  									<Col xs={4}>
  										<Image src="http://via.placeholder.com/125x125" />
  										<p>Team 1</p>
  									</Col>
  									<Col xs={4}>
  										<h2>
  										<Label bsStyle="danger">VS</Label>{' '}
  										</h2>
  										<Label bsStyle="success">1 PM(EDT) Saturday Apr. 21, 2018</Label>{' '}
                      <Button onClick={this.handleShow}> Place a Bet </Button>
  									</Col>
  									<Col xs={4}>
  										<Image src="http://via.placeholder.com/125x125" />
  										<p>Team 2</p>
  									</Col>
  								</Row>
  							</Grid>
  						</ListGroupItem>
  						<ListGroupItem>
  							<Grid>
  								<Row className="gameRow1">
  									<Col xs={4}>
  										<Image src="http://via.placeholder.com/125x125" />
  										<p>Team 3</p>
  									</Col>
  									<Col xs={4}>
  										<h2>
  										<Label bsStyle="danger">VS</Label>{' '}
  										</h2>
  										<Label bsStyle="success">3 PM(EDT) Sunday Apr. 22, 2018</Label>{' '}
                      <Button onClick={this.handleShow}> Place a Bet </Button>
  									</Col>
  									<Col xs={4}>
  										<Image src="http://via.placeholder.com/125x125" />
  										<p>Team 4</p>
  									</Col>
  								</Row>
  							</Grid>
  						</ListGroupItem>
					</ListGroup>
      			</Col>
      			<Col md={2}>
      				<h1>
      					<Label bsStyle="primary">Standings</Label>{' '}
      				</h1>
      				<ListGroup>
							{
								this.props.players.map(player => {
									return (<ListGroupItem key={player._id}>{ player.username } - { player.score }</ListGroupItem>)
								})
							}
					</ListGroup>
      			</Col>
      		</Row>
      	</Grid>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Placing Bet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

import { connect } from 'react-redux';
import { getLeagueThunk, clearLeagueActionCreator } from '../../actions/league';

const mapStateToProps = (state) => {
	return {
		id: state.league._id,
		players: state.league.players,
		name: state.league.name
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getLeague () {
			return dispatch(getLeagueThunk(ownProps.match.params.leagueId));
		},
		clearLeague () {
			return dispatch(clearLeagueActionCreator());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(League);

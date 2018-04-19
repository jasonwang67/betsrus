import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import './styles.css';

// This will be our main component container for the rest of our site
class Home extends Component {

	constructor (props) {
		super(props);

		this.state = {
			leagueId: ''
		}

		this.handleChange = this.handleChange.bind(this);
	}

  handleChange(evt) {
    this.setState({ leagueId: evt.target.value });
	}

	handleSubmit (evt) {
		evt.preventDefault();

		console.log('submitted');
	}

  render () {
    return (
      <div>
        <Jumbotron className="landing">
					<h1>Welcome to Bets R Us</h1>
					<p>
						"Do you have what it takes to rise to the top?" - Chirayu Poudel (Crystal Palace)
					</p>
					<form onSubmit={this.handleSubmit}>
						<FormGroup
							controlId="formBasicText"
						>
							<ControlLabel>Join Existing League</ControlLabel>
							<FormControl
								type="text"
								value={this.state.leagueId}
								placeholder="Enter League ID"
								onChange={this.handleChange}
							/>
							<FormControl.Feedback />
						</FormGroup>

						<Button type="submit">Join</Button>
					</form>
					<p>
						<Button bsStyle="primary">Create New League</Button>
					</p>
    	  </Jumbotron>

				<Jumbotron>
					<h2>My Leagues</h2>

					<Grid>
						<Row>
							<Col md={4}>
								Moo
							</Col>
							<Col md={4}>
								Moo
							</Col>
							<Col md={4}>
								Moo
							</Col>
						</Row>
					</Grid>
				</Jumbotron>
      </div>
    );
  }
}

export default Home;

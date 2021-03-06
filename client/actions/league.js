import axios from 'axios';
import { push } from 'react-router-redux';
import { addLeagueActionCreator } from './account';
import { receivePredictionsActionCreator, addPredictionActionCreator } from './games';

import socket from '../socket';

export const RECEIVE_LEAGUE = 'RECEIVE_LEAGUE';
export const CLEAR_LEAGUE = 'CLEAR_LEAGUE';
export const ADD_PLAYER = 'ADD_PLAYER';

export const addPlayerActionCreator = player => {
  return {
    type: ADD_PLAYER,
    player
  }
}

export const receiveLeagueActionCreator = league => {
  return {
    type: RECEIVE_LEAGUE,
    league,
  }
};

export const clearLeagueActionCreator = () => {
  return {
    type: CLEAR_LEAGUE
  }
}

export const getLeagueThunk = (id) => {
  return (dispatch, getState) => {
    Promise.all([axios.get(`/api/league/${id}`), axios.get(`/api/prediction/${id}`)])
    .then(reses => {
      const league = reses[0].data;
      const predictions = reses[1].data;

      dispatch(receiveLeagueActionCreator(league));
      dispatch(receivePredictionsActionCreator(predictions, getState().account._id));
    })
    .catch(err => {
      console.error(err);
    })
  }
}

export const joinLeagueThunk = (leagueID) => {
  axios.defaults.withCredentials = true;

  return (dispatch, getState) => {

    const account = getState().account;

    axios.post('/api/league/joinLeague', {
      leagueID,
      userID: account._id,
      username: account.username
    })
    .then(res => {
      const league = res.data;

      dispatch(push(`/leagues/${league._id}`));
      dispatch(addLeagueActionCreator(league));

      socket.emit('joinLeague', {
        leagueID,
        player: {
          _id: account._id,
          username: account.username,
          score: 0
        }
      })
    })
    .catch(err => {
      console.error(err);
    })
  }
}

export const createLeagueThunk = (name) => {
  axios.defaults.withCredentials = true;
  return (dispatch, getState) => {

    const account = getState().account;

    axios.post('/api/league/createLeague', {
      userID: account._id,
      username: account.username,
      name
    })
		.then(res => {
      const league = res.data;

      dispatch(push(`/leagues/${league._id}`));
      dispatch(addLeagueActionCreator(league));

      socket.emit('joinLeague', {
        leagueID: league._id,
        player: {
          _id: account._id,
          username: account.username,
          score: 0
        }
      })
		})
		.catch(err => {
			console.error(err);
		})
  }
};

export const mountSocketsThunk = () => {
  return (dispatch, getState) => {

    socket.on('joinLeague', player => {
      if (getState().account._id !== player._id) {
        dispatch(addPlayerActionCreator(player));
      }
    })

    socket.on('addPrediction', prediction => {
      dispatch(addPredictionActionCreator(prediction, getState().account._id));
    });
  }
}

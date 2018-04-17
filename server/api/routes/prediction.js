const router = require('express').Router();
const bcrypt = require('bcrypt');
const Prediction = require('../../db/models/Prediction');
ObjectId = require('mongodb').ObjectID;

// Here is where rest of routes fit in

//the submit route will indicate that the user has made a prediction.
//Upon posting, the data for the prediction is stored in the database.
router.post('/submit', (req, res) => {
  const predData = {
    scores: {home: req.body.homescore, away: req.body.awayscore},
    username: req.body.username,
		gameID: req.body.gameID,
		leagueID: ObjectId(req.body.leagueID),
    userID: ObjectId(req.body.userID)
  };

  Prediction.create(predData, (err, pred) => {
    if (err) {
      console.error(err);
      res.status(400).send(err);
    } else {
      res.status(200).end();
      // TODO: any logic necessary after logging the prediction in the database
    }
  });
});

router.get('/retrieve', (req, res) => {
  const username = req.body.userID;
  const gameID = req.body.gameID;

  Prediction.findOne({
    username: username,
		gameID: gameID
  }).then((prediction) => {
    // upon request for a prediction of a certain game, send that info back.
		res.status(200).send(prediction);

  }).catch((err) => {
    res.status(500).send(err);
  });
});

module.exports = router;
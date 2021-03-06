var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definition of league Schema
var LeagueSchema = new Schema({
  players: [{ playerID: {type: Schema.Types.ObjectId, ref: 'User'}, score: {type: Number}}],
  name: {type: String, required: true, default: 'New League'}
});

var League = mongoose.model('League', LeagueSchema);
module.exports = League;

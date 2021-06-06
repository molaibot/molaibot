const m = require('mongoose');

module.exports = m.model(
    'afk',
        new m.Schema({
        User: String,
        Reason: String
    })
)
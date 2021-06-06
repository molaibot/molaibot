const m = require('mongoose');

module.exports = m.model(
    'premium-guild',
        new m.Schema({
        Guild: String,
        Expire: Number,
        Permanant: Boolean
    })
)
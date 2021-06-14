const m = require('mongoose');

module.exports = m.model("supportCmd", new m.Schema({
    Guild: String,
    Message: String
}));
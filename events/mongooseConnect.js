const mongoose = require('mongoose');
module.exports = (mongodb) => {
	mongoose.set('useCreateIndex', true);

	mongoose
		.connect(mongodb, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})
		.then(() => {
			console.log('Connected To The MongoDB Database!');
		})
		.catch((err) => {
			console.log(err);
		});
};

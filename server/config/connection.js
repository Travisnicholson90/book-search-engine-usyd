const { connect, connection } = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });

const connectionString = process.env.MONGODB_URI || 'mongodb+srv://nicholsontravis:Grapes1234@cluster0.jm2nd7q.mongodb.net/googlebooks';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;

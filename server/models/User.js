
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    awsCredential: {
        AWS_ACCESS_KEY_ID: {
          type: String,
          trim: true
        },
        AWS_SECRET_ACCESS_KEY: {
          type: String,
          trim: true
        },
        AWS_REGION: {
          type: String,
          trim: true
        },
      },
})

module.exports = mongoose.model('User', userSchema);
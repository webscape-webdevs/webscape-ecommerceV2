const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    userName: {type: Schema.Types.String},
    email: {type: Schema.Types.String},
    address: {type: Schema.Types.String},
    contactNumber: {type: Schema.Types.Number},
    role:{type: Schema.Types.String, default:"user", enum:["user", "admin"]},
    refreshToken: {type: Schema.Types.String},
    password: {type: Schema.Types.String},
    createdAt: { type: Schema.Types.Date, default: Date.now },
})

const user = mongoose.model('user', userSchema)

module.exports = user;
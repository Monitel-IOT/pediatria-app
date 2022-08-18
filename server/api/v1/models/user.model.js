const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    dni: { type: String },
    phone: { type: String },
    level: { type: String }, // super_admin, admin, client
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);
module.exports = User;

/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    dni: { type: String },
    phone: { type: String },
    level: { type: String }, // super_admin, admin, client
    state: { type: Boolean, required: true },
    firebaseId: { type: String, required: true },
    patients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    }],
  },
  { timestamps: true },
);

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => { delete ret._id; },
});

const User = mongoose.model('User', userSchema);
module.exports = User;

const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// Before saving any user in the database with password filed
// => Hash the password then save the new hased password)
userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
});

// Create a new Collection following this schema
// users Collection []
// user Document {}
// [ { name, email }, { name, email} ]
const User = model('User', userSchema);

// const user = new User({ name: 'Ahmed', email: 'ahmed707hosny@gmail.com' });
// console.log(user);
// user.save().then(() => console.log('User created!'));

module.exports = User;

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var connection = mongoose.createConnection("mongodb://joshrkeck:Iu8DhkAFS2pl@ds035723.mongolab.com:35723/food_truck_finder_app");

autoIncrement.initialize(connection);

var UserSchema = new Schema({
    email: { type: String, required: true, index: { unique: true } },
    displayName: { type: String, required: true },
    userType: { type: String, default: "user" },
    password: { type: String, required: true }
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userID', startAt: 100, incrementBy: 1 });
module.exports = mongoose.model('User', UserSchema);
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Joan:1234@serviciodb-a44ht.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
})
    .then(db => console.log('Db is connected'))
    .catch(err => console.log(err));

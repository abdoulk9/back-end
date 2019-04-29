const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/formation', {useNewUrlParser: true});



//Cretaion  d'un schema pour notre model 
const UserSchema = new mongoose.Schema(
    {
        userName: String,
        password: String,
        login: {type: String, unique: true, require: true}//Contrainte
    }
);


//Exportation du module

module.exports = mongoose.model('users', UserSchema);
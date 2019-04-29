//importation de la biblio mangoos
const mongoose = require('mongoose');


//connexion à la base de données 
mongoose.connect('mongodb://localhost/formation', { useNewUrlParser: true });

//Importation d'une instance de  schema
const Schema = mongoose.Schema;

//Définir d'un shema pour les restaurants
const restaurantSchema = new Schema(
    {
        name: String,
        cuisine: String,
        borough: String
    }
);


//Creation d'un shema d'un model
const RestaurantModel = mongoose.model('primer-datas', restaurantSchema);

//Exportation du module
module.exports = RestaurantModel; 
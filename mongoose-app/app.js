const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

//Importation des models  
const RestaurantModel = require('./models/restaurants.models');
const UserModel = require('./models/user.model');



const todoRoutes = require('./routes/todo.route');


//middleware pour la 
app.use(cors());



//Utilisation de bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Importation des routes
app.use('/task', todoRoutes);




app.get('/', (req, res) => {
    let resto = new RestaurantModel(
        {
            name: 'Tonio\'s deli',
            cuisine: 'Italian',
            borough: 'Queens'
        }
    );
    res.json(resto.save());
});


app.get('/resto/liste', (req, res) => {
    RestaurantModel.find({ cuisine: 'Italian', borough: 'Bronx' }, 'name cuisine', (err, data) => {
        if (err) {
            console.log(err);
            res.json({ err: true, message: 'a marche pu' });
        } else {
            res.json(data);
        }
    });
});


app.use('/register', (req, res, next) => {
    if (req.method == 'POST') {
        console.log("Entrée 1");
        bcrypt.genSalt(10)
            .then(
                salt => {
                    return bcrypt.hash(req.body.password, salt);
                })
            .then(
                data => {
                    console.log(data);
                    req.hashedPass = data;
                    next();
                })
            .catch(err => {
                console.log(err);
                next(err);
            })
    } else {
        next();
    }

});


//Recuperation des valeurs du post envoyer par le formulaire
app.post('/register', (req, res) => {
    //Instanciation d'un nouveau userModel
    let user = new UserModel({
        userName: req.body.userName,
        login: req.body.login,
        password: req.hashedPass
    });

    //sauvegarde dans la bd
    user.save((err) => {
        if (err) {
            res.json({ success: false, error: err });
        } else {
            console.log(user);
            res.json({ success: true, data: user });
        }
    });
});

//authentification
app.post('/login', (req, res) => {
    console.log(req.body);
    UserModel.findOne(
        { login: req.body.login },
        (err, data) => {
            if (err) {
                //data vide
                res.json({ success: false, error: err });
            } else if (!data) {
                //pas de correspondance
                res.json({ success: false, message: "Utilisateur inconnu" });
            } else {
                // cas positif
                bcrypt.compare(req.body.password, data.password,
                    (err, hasMatch) => {
                        if (err) {
                            res.json({ success: false, error: err });
                        } else if (!hasMatch) {
                            res.json({ success: false, message: "Mot de passe incorrect" });
                        } else {
                            res.json({ success: true, user: data });
                        }
                    })
            }
        })
})
app.listen(3000, () => console.log('Server running on http://localhost:3000/'));
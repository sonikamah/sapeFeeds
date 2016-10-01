var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('feedsdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'feedsdb' database");
        db.collection('feeds', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'feeds' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});


/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var feeds = [
    {
        name: "CHATEAU DE SAINT COSME",
        year: "2009",
        grapes: "Grenache / Syrah",
        country: "France",
        region: "Southern Rhone",
        description: "The aromas of fruit and spice...",
        picture: "saint_cosme.jpg"
    },
    {
        name: "LAN RIOJA CRIANZA",
        year: "2006",
        grapes: "Tempranillo",
        country: "Spain",
        region: "Rioja",
        description: "A resurgence of interest in boutique vineyards...",
        picture: "lan_rioja.jpg"
    }];

    db.collection('feeds', function(err, collection) {
        collection.insert(feeds, {safe:true}, function(err, result) {});
    });

};

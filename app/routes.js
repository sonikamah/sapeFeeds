exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving feed: ' + id);
    db.collection('feeds', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('feeds', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addFeed = function(req, res) {
    var feed = req.body;
    console.log('Adding feed: ' + JSON.stringify(feed));
    db.collection('feeds', function(err, collection) {
        collection.insert(feed, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateFeed = function(req, res) {
    var id = req.params.id;
    var feed = req.body;
    console.log('Updating feed: ' + id);
    console.log(JSON.stringify(feed));
    db.collection('feeds', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, feed, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating feed: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(feed);
            }
        });
    });
}

exports.deleteFeed = function(req, res) {
    var id = req.params.id;
    console.log('Deleting feed: ' + id);
    db.collection('feeds', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}


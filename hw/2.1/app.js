/**
 * Created by askuznetsov on 1/27/14.
 */
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    var data = db.collection('data');

//    var cursor = data.find({});
//    cursor.sort('grade', 1);
//    cursor.limit(4);
//    cursor.skip(1);
//    cursor.sort([['grade', 1], ['student', -1]]);

    var query = {
        "Wind Direction" : {
            '$gte': 180,
            '$lte': 360
        }
    };
    var projecton = {
        _id: 0,
        State: 1,
        "Wind Direction" : 1,
        "Temperature" : 1
    };
    var options = { 'skip' : 0,
        'limit' : 4,
        'sort' : {"Temperature": 1}
    };
    var cursor = data.find(query, projecton, options);

    // order: sort -> skip -> limit TODO:remember

    cursor.each(function(err, doc) {
        if(err) throw err;
        if(doc == null) {
            return db.close();
        }
        console.dir(doc);
    });
});

/**
 * Created by askuznetsov on 1/28/14.
 */
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if (err) throw err


    var students = db.collection('students');

    var query = {};
    var projection = {
//        _id: 0,
//        "scores.type" : 0
    };
    var options = {
        limit: 5
    };

    students.find(query, projection, options).each(function(err, doc) {
        if (err) throw err
        if (doc == null) {
            return db.close();
        }

        var sc = 0;
        doc.scores = doc.scores.filter(function(e, n) {
//            console.log(e, n);
            if(e.type == "homework") {
                sc = e.score
                return e
            }
            return e;
        });

        console.log(doc.scores)

    });

});


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
        limit: 0
    };

    students.find(query, projection, options).each(function(err, doc) {
        if (err) throw err
        if (doc == null) {
            return db.close();
        }

        var removed = ''
        for(var i = 0; i < doc.scores.length; i++) {
            if(doc.scores[i].type == "homework") {
                if(removed && removed.score < doc.scores[i].score) {
                    break;
                }
                removed = doc.scores[i];
            }
        }

        doc.scores = doc.scores.filter(function(e, n) {
            var cond = e.type == "homework" && e.score == removed.score
            if(!cond) {
                return e;
            }
        });

        query['_id'] = doc['_id'];
        students.update(query, doc, function(err, updated) {
            if(err) throw err
            console.log(updated)
        });

    });

});


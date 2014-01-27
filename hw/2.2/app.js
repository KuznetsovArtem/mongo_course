/**
 * Created by askuznetsov on 1/27/14.
 */
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    var data = db.collection('data');

    var query = {};
    var projecton = {}
    /* var projecton = {
        _id: 0,
        State: 1,
        "Day" : 1,
        "Temperature" : 1
    };*/
    state = "State";
    var options = { 'skip' : 0,
//        'limit' : 15,
//        'sort' : {"Temperature": -1, "State": 1}
        'sort' : [[state, 1], ["Temperature" , -1]]
    };
    var cursor = data.find(query, projecton, options);

    // order: sort -> skip -> limit TODO:remember

    var curState = '';
    var doUpdate = true;
    cursor.each(function(err, doc) {
        if(err) throw err;
        if(doc == null) {
            return db.close();
        }
        if(curState != doc[state]) {
            curState = doc[state];
            console.dir(doc);
            if(doUpdate) {
                var localQuery = {};
                localQuery['_id'] = doc['_id'];
                doc['month_high'] = true;
                db.collection('data').update(localQuery, doc, function(err, updated) {
                    if(err) throw err;
                    console.dir(updated);
                })
            }
        }
    });
});

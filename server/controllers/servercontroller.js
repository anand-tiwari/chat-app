const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

/* Admin user */
module.exports.auth = function(req, res){
	console.log(req.body);
	Admin.find({ 'username': req.body.username,'password':req.body.password }, function(err, results){
		console.log(err, results, "log");
		if (err) {
            console.log('Signup error');
            return done(err);
        }
        //if user found.
        if (results.length!=0) {
        	return res.status(200).json({
        		status: 'Registration successful!'
      		});
        }
	});
};
/* End of Admin user section */


/*Book Collection */
module.exports.home = function(req, res){
	res.json({"successful":"true"});
};
/* End of Transaction */
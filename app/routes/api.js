var User = require('../models/user');
var Details = require('../models/details');
var config = require('../../config');

var secretKey = config.secretKey;

var jsonwebtoken = require('jsonwebtoken');

function createToken(user) {

	var token = jsonwebtoken.sign({
		id: user._id,
		name: user.name,
		username: user.username
	}, secretKey, {
		expiresIn: 1440
	});


	return token;

}

module.exports = function(app, express) {
var api = express.Router();
    //manually trying
    api.get('/all_details', function(req, res) {
		
		Details.find({}, function(err, details) {
			if(err) {
				res.send(err);
				return;
			}
			res.json(details);
		});
	});
    
    api.post('/issuebook',function(req,res){
        
        var details =new Details({
            name :req.body.name,
            bookname :req.body.bookname,
            empid :req.body.empid,
            issuedate :req.body.issuedate
        });
        details.save(function(err){
            if(err){
                res.send(err);
                return;
            }
            res.json({
                success:true,
                message: 'Details enter successfully..!'
            });
        });
    });
    
    ////////
    
api.post('/signup', function(req, res) {
    

		var user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		});
		
		user.save(function(err) {
			if(err) {
				res.send(err);
				return;
			}

			res.json({ 
				
				message: 'User has been created!',
				
			});
		});
	});

    api.get('/users', function(req, res) {

		User.find({}, function(err, users) {
			if(err) {
				res.send(err);
				return;
			}

			res.json(users);

		});
	});
    
    api.post('/login', function(req, res) {

		User.findOne({ 
			username: req.body.username
		}).select('name username password').exec(function(err, user) {

			if(err) throw err;

			if(!user) {

				res.send({ message: "User doenst exist"});
			} else if(user){ 

				var validPassword = user.comparePassword(req.body.password);

				if(!validPassword) {
					res.send({ message: "Invalid Password"});
				} else {

					///// token
					var token = createToken(user);

					res.json({
						success: true,
						message: "Successfuly login!",
						token: token
					});
				}
			}
		});
	});
    
    
	api.get('/me', function(req, res) {
		res.send(req.decoded);
	}); 
    
return api
  


};
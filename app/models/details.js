var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


var DetailsSchema = new Schema({
	
	name: String,
	bookname: { type: String, required: true},
    empid :{type :String,required:true},
    issuedate :{type :Date,defauly: Date.now}
	

});
module.exports = mongoose.model('Details', DetailsSchema);
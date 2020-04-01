var mongoose = require('mongoose');
const crypto =require('crypto');
const uuidv1 =require('uuid/v1');


var userSchema = new mongoose.Schema({
 name:{
     type: String,
     required:true,
     maxlength:32,
     trim:true
 },
 lastName:{
    type: String,
    maxlength:32,
    trim:true
},
userInfo:{
type:String,
trim:true
},
email:{
    type:String,
    required:true,
    unique:true,
    trim:true
},
encry_password:{
    type:String,
    required:true    
},
salt:String,
role:{
    type:Number,
    default:0
},
purchases:{
    type:Array,
    default:[]
}
});

userSchema.virtual("password")
.set(function(password){
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePasssword(password)
})
.get(function(){
    return this._password
})

userSchema.method = {
    securePasssword: function (pass) {
        if (!pass) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(pass)
                .digest('hex')
        } catch (err) {
            return "";
        }
    }
}
module.exports = mongoose.model('User',userSchema) 
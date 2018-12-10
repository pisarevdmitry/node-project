const jwt = require('jsonwebtoken');
const {
  jwt: { secret }
} = require('../../config');

class JwtService {
  constructor() {
    this.jwt = jwt;
    this.secret = secret;
  }

  genToken(data) {
    return this.jwt.sign(
      {
        ...data
      },
      secret
    );
  }
  parseToken(token) {
      try{
        return  this.jwt.verify(token, this.secret);
      } catch(e) {
        return null
      }
   
  }
}
module.exports = JwtService;

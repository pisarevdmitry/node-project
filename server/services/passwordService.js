const bcrypt = require('bcrypt');

class PasswordService {
  comparePasswords(password, comparedPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, comparedPassword, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
  genHash(password){
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            reject(err);
          }
          resolve(hash);
        });
      });
  }
}
module.exports = PasswordService;

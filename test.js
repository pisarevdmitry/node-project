const parse = require('./lib/parseDatabaseUrl');

const res = parse(
  'postgres://abzgnvwhnixkbo:3a7e54a97494bd8589cd0f4f4059176fbb3a73f656ee768881bb3499b2c10bbd@ec2-54-228-197-249.eu-west-1.compute.amazonaws.com:5432/desctkm7puhte3'
);

console.log(res)
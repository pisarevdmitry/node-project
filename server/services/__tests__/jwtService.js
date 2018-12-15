const JwtService = require('../JwtService');
const Service = new JwtService();

it('if token incorrect return null',() =>{
    const token = Service.parseToken('hsdbfhjdhjhfklfjjarkehijnakjhfkjenji')
    expect(token).toBeNull()
})
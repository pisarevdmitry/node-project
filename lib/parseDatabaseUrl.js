module.exports = (url) => {
    const reg =/postgres:\/\/([^:]+):([^@]+)@([^:@]+):(\d+)\/([^:]+)/gm

    const match = reg.exec(url);
    const [,user, password, host, port, db] = match
    return {
        user, password, host, port, db
    }
}
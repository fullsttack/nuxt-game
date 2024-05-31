export default defineEventHandler(async ({req}) => {
    const ip = req.connection.remoteAddress || req.socket.remoteAddress
    console.log(ip);
    return {
        'home.home':'test',
    };
})
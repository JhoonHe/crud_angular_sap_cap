module.exports = async (UserService) => {

    // UserService.on('READ', 'User', () => [
    //     { document: '1003', name: 'Jonathan', last_name: 'Herrera' }
    // ]);

    UserService.on('createUser', async req => {
        console.log(req.data);
    })
}

exports.setCookie = (context, key, value) => {
    context.cookies.set(key, value, {
        maxAge: 10 * 60 * 1000,
        domain: 'http://localhost:4000',
        expires: new Date(),
        httpOnly: false
    });
};
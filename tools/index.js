const path = require('path');
exports.setCookie = (context, key, value) => {
    context.cookies.set(key, value, {
        httpOnly: false
    });
};

exports.randomName = () => {
    let string = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
                    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
                    's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let name = '';
    let start = 6;
    while(start--) {
        name += string[Math.floor(Math.random()* 26)];
    }
    while(++start < 6) {
        name += Math.floor(Math.random()* 10);
    }
    return path.join(__dirname, '../images/avatar/', `${name}.jpg`);
};
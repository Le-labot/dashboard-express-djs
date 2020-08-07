module.exports = (init = false) => {
    if (init) {
        let process;
        try {
            global.process.env
            process = global.process;
        } catch (error) {
            process = require('process');
        };
        if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
        else process.env.PORT = '5000';
    };
    return {
        PORT: 5000
    }
}

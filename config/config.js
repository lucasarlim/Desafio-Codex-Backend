const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
        return {
            bd_string: 'mongodb+srv://admin:codextreinee123@cluster0.gpbfh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            jwt_pass: 'codextreinee123',
            jwt_expires_in: '1d'
        }

        case 'hml':
        return {    
            bd_string: 'mongodb+srv://admin:codextreinee123@cluster0.gpbfh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            jwt_pass: 'codextreinee123',
            jwt_expires_in: '1d'
        }

        case 'production':
        return {
            bd_string: 'mongodb+srv://admin:codextreinee123@cluster0.gpbfh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            jwt_pass: 'codextreinee123',
            jwt_expires_in: '1d'
        }
    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();
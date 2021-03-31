const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch(env){
        case 'dev':
        return{
            bd_url: 'mongodb+srv://admin:codextreinee123@cluster0.gpbfh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            jwt_key: 'codextreinee123',
            jwt_time: '1d',
        }
        case 'hml':
        return{
            bd_url: 'mongodb+srv://admin:codextreinee123@cluster0.gpbfh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            jwt_key: 'codextreinee123',
            jwt_time: '1d',
        }
        case 'prod':
        return{
            bd_url: 'mongodb+srv://admin:codextreinee123@cluster0.gpbfh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            jwt_key: 'codextreinee123',
            jwt_time: '1d',
        }
    }
}
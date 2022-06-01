class IngebraError extends Error{}

class InvalidCredentials extends IngebraError{
    constructor(){
        super();
        this.name = 'InvalidCredentials';
        this.errorCode = 403;
    }
}

class Unauthorized extends IngebraError{
    constructor(){
        super();
        this.name = 'Unauthorized';
        this.errorCode = 401;
    }
}

class TokenExpired extends IngebraError{
    constructor(){
        super();
        this.name = 'TokenExpired';
        this.errorCode = 401;
    }
}





module.exports = {
    IngebraError,
    InvalidCredentials,
    Unauthorized,
    TokenExpired
}
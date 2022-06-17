class Global{
    static api_url = 'http://127.0.0.1:8000/';
    static access_token= '';

    static updateAccessToken( newToken){
        this.access_token = newToken;
    }
}

export default Global;
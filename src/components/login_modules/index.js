/* eslint-disable */
 
const fn_login = require('./login')
const fn_qr = require('./qr')
const fn_verify = require('./verify')
const fn_publickey = require('./publickey')

// ------------------------------------------------------------------------------------
  
class server {

    constructor( _server_domain ) {
        
        this._server_domain = _server_domain;
         
    }

    server_domain() {
        return this._server_domain;
    }

    async admin_login ( user, pass, request ) {

 
        return fn_login.fn_admin_login( this._server_domain, user, pass, request )
    }
    
    async login  ( user, pass, request ) {
    
     
        return fn_login.fn_login( this._server_domain, user, pass, request )
    }
    
    async encrypt_login  ( encryption_data, sender_publicKey ) {
    
     
        return fn_login.fn_encrypt_login( this._server_domain, encryption_data, sender_publicKey )
    }

    async admin_encrypt_login  ( encryption_data, sender_publicKey ) {
    
     
        return fn_login.fn_admin_encrypt_login( this._server_domain, encryption_data, sender_publicKey )
    }
    
    async get_qr  ( request ) {
    
     
        return fn_qr.fn_get_qr( this._server_domain, request )
    }
    
    async admin_verify  ( token ) {
    
     
        return fn_verify.fn_admin_verify( this._server_domain, token )
    }
    
    async verify  ( token ) {
    
     
        return fn_verify.fn_verify( this._server_domain, token )
    }
    
    async create_connection_key  ( ) {
    
     
        return fn_publickey.fn_create_connection_key( this._server_domain )
    }

    async connection_server_key  ( ) {
    
     
        return fn_publickey.fn_server_connection_key( this._server_domain )
    }
    
}



// ------------------------------------------------------------------------------------

module.exports.server = server;
  
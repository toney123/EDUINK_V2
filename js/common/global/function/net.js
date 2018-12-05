/**
 * 网络部分常用的方法
 */
export default class Net{
    static codeMessage(code){
        let message;
        switch(code){
            case 'ERR_INVALID_APP_ID':
                message = 'Invalid App Id';
                break;
            case 'ERR_INVALID_SESSION_TOKEN':
                message = 'Invalid session token';
                break;
            case 'ERR_NO_PERMISSION':
                message = 'Currently User does not have permission to call this API';
                break;
            case 'ERR_INVALID_PARAM':
                message = 'Invalid parameter';
                break;
            case 'ERR_INVALID_SIGNIN':
                message = 'Unable to sign in with your login and password';
        }
        return message;
    }
}
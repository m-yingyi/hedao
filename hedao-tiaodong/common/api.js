const baseUrl = 'https://api.hedaoapp.com/api';

export default {
    BASEURI: baseUrl,
	advertisement: {

    },
    auth: {
        register: '/auth/register',
        login: '/auth/login',
        sendCode: '/auth/send-code',
        checkName: '/auth/check-name',
        refreshToken: '/auth/refresh-token',
        tikTokLogin: '/auth/tik-tok-login'
    },
    works: {
        trendsPage: '/works/trends-page',
    },
    find: {
        findPage: '/find/find-page-by-type',
    },
    collection: {
        collectionModel: '/collection/model',
    }
};
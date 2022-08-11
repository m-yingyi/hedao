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
        coreWorksPage: '/works/core-works-page',
    },
    find: {
        findPage: '/find/find-page-by-type',
    },
    collection: {
        collectionModel: '/collection/model',
    },
    user: {
        // creatorInfo: '/user/creator-info/3' //   暂时写死
        creatorInfo: '/user/creator-info/' //   {userId} 根据用户ID获取主页信息
    },
    member: {
        memberList: '/member/member-list', // 会员列表
    },
    information: {
        list: '/information/information-list'
    }
};
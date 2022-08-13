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
        findTypeList: '/find/find-type-list',
    },
    collection: {
        collectionModel: '/collection/model',
    },
    user: {
        // creatorInfo: '/user/creator-info/3' //   暂时写死
        creatorInfo: '/user/creator-info/', //   {userId} 根据用户ID获取主页信息
        creatorHome: '/user/creator-home/', //   {userId} 获取创作者主页综合信息
        focus: '/user/focus', // 关注创作者
    },
    member: {
        memberList: '/member/member-list', // 会员列表
        memberPlan: '/member/member-plan-by-plan-id/', // {palnid} 通过方案ID获取会员方案
    },
    information: {
        list: '/information/information-list'
    }
};
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
        creatorInfo: '/user/creator-info/', //   {userId} 根据用户ID获取主页信息
        creatorHome: '/user/creator-home/', //   {userId} 获取创作者主页综合信息
        idolconfig: '/user/idol-config/', // 根据创作者ID获取创作者配置
        focus: '/user/focus', // 关注创作者
    },
    member: {
        memberList: '/member/member-list', // 会员列表
        memberPlan: '/member/member-plan/', // {palnid} 通过方案ID获取会员方案
        memberPlanVoucher: '/member/plan-voucher', // 创建购买凭证
    },
    information: {
        list: '/information/information-list'
    },
    pay: {
        payPrepaId: '/pay/prepa-id', // 获取预支付信息
        payResult: '/pay/pay-result', // 查询订单支付结果
    }
};
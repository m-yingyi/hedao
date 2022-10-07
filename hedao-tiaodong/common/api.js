const baseUrl = 'https://testapi.hedaoapp.com/api';
// const baseUrl = 'https://api.hedaoapp.com/api';

export default {
    BASEURI: baseUrl,
	advertisement: {
        advertisementList: '/advertisement/advertisement-list',
    },
    auth: {
        register: '/auth/register',
        login: '/auth/login',
        sendCode: '/auth/send-code',
        checkName: '/auth/check-username/',
        refreshToken: '/auth/refresh-token',
        tikTokLogin: '/auth/tik-tok-login'
    },
    works: {
        trendsPage: '/works/trends-page',
        coreWorksPage: '/works/core-works-page',
        coreTrends: '/works/core-trends',
        trendsEdit: '/works/trends-edit/', // 根据动态id获取编辑页详情
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
        idolConfig: '/user/idol-config/', // 根据创作者ID获取创作者配置
        focus: '/user/focus', // 关注创作者
        addressList: '/user/user-address-list', // 获取用户地址集合
        addressEdit: '/user/user-address', // 编辑用户地址
        userInfo: '/user/user-info', // 编辑用户地址
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
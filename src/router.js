const routers = [
    {
        path: '/medical',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/demo',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/demo.vue'], resolve)
    },
    {
        path: '/iframeDemo',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/iframeDemo.vue'], resolve)
    },
];
export default routers;

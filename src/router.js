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
];
export default routers;

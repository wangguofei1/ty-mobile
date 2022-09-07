/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
  path: '/',
  component: () => import('@/views/home/index'),
  redirect: '/home',
  meta: {
    title: '首页',
    keepAlive: false
  },
  children: [{
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index'),
    meta: {
      title: '首页',
      keepAlive: false
    }
  }]
}, {
  path: '/dataAnalysis',
  name: 'DataAnalysis',
  component: () => import('@/views/data-analysis/index'),
  meta: {
    title: '数据分析',
    keepAlive: false
  }
}, {
  path: '/annual-sales',
  name: 'Annual-sales',
  component: () => import('@/views/annual-sales/index'),
  meta: {
    title: '数据统计',
    keepAlive: false
  }
}, {
  path: '/salesFlow',
  name: 'SalesFlow',
  component: () => import('@/views/sales-flow/index'),
  meta: {
    title: '销售流向',
    keepAlive: false
  }
}, {
  path: '/hospitalDataFlow',
  name: 'HospitalDataFlow',
  component: () => import('@/views/hospital-data-flow/index'),
  meta: {
    title: '医院数据流向',
    keepAlive: false
  }
}, {
  path: '/indexAchievementRate',
  name: 'IndexAchievementRate',
  component: () => import('@/views/index-achievement-rate/index'),
  meta: {
    title: '指标达成率',
    keepAlive: false
  }
}, {
  path: '/salesmanSales',
  name: 'SalesmanSales',
  component: () => import('@/views/salesman-sales/index'),
  meta: {
    title: '指标达成率',
    keepAlive: false
  }
}, {
  path: '/storeSales',
  name: 'StoreSales',
  component: () => import('@/views/store-sales/index'),
  meta: {
    title: '指标达成率',
    keepAlive: false
  }
}, {
  path: '/patientInfo',
  name: 'PatientInfo',
  component: () => import('@/views/patient-info/index'),
  meta: {
    title: '患者信息',
    keepAlive: false
  }
}, {
  path: '/patientAnalysis',
  name: 'PatientAnalysis',
  component: () => import('@/views/patient-analysis/index'),
  meta: {
    title: '新老患者分析',
    keepAlive: false
  }
}, {
  path: '/patientStructure',
  name: 'PatientStructure',
  component: () => import('@/views/patient-structure/index'),
  meta: {
    title: '患者结构分析',
    keepAlive: false
  }
}, {
  path: '/storeDetails',
  name: 'StoreDetails',
  component: () => import('@/views/store-details/index'),
  meta: {
    title: '门店详情',
    keepAlive: false
  }
}, {
  path: '/personalCenter',
  name: 'PersonalCenter',
  component: () => import('@/views/personal-center/index'),
  meta: {
    title: '个人中心',
    keepAlive: false
  }
}]

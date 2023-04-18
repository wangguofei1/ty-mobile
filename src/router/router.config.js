/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/login/index'),
    redirect: '/login',
    meta: {
      title: '登录',
      keepAlive: false
    },
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index'),
        meta: {
          title: '登录',
          keepAlive: false
        }
      }
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index'),
    meta: {
      title: '首页',
      keepAlive: false
    }
  },
  {
    path: '/dataAnalysis',
    name: 'DataAnalysis',
    component: () => import('@/views/data-analysis/index'),
    meta: {
      title: '数据分析',
      keepAlive: false
    }
  },
  {
    path: '/salesYearly',
    name: 'salesYearly',
    component: () => import('@/views/sales-yearly/index'),
    meta: {
      title: '销售汇总',
      keepAlive: false
    }
  },
  {
    path: '/salesFlow',
    name: 'SalesFlow',
    component: () => import('@/views/sales-flow/index'),
    meta: {
      title: '销售流向',
      keepAlive: false
    }
  },
  {
    path: '/hospitalDataFlow',
    name: 'HospitalDataFlow',
    component: () => import('@/views/hospital-data-flow/index'),
    meta: {
      title: '医院数据流向',
      keepAlive: false
    }
  },
  {
    path: '/indexAchievementRate',
    name: 'IndexAchievementRate',
    component: () => import('@/views/index-achievement-rate/index'),
    meta: {
      title: '指标达成率',
      keepAlive: false
    }
  },
  {
    path: '/salesmanSales',
    name: 'SalesmanSales',
    component: () => import('@/views/salesman-sales/index'),
    meta: {
      title: '业务员销售情况',
      keepAlive: false
    }
  },
  {
    path: '/storeSales',
    name: 'StoreSales',
    component: () => import('@/views/store-sales/index'),
    meta: {
      title: '门店销售情况',
      keepAlive: false
    }
  },
  {
    path: '/storeServiceDetail ',
    name: 'StoreServiceDetail',
    component: () => import('@/views/store-service-detail/index'),
    meta: {
      title: '门店服务详情',
      keepAlive: false
    }
  },
  {
    path: '/patientInfo',
    name: 'PatientInfo',
    component: () => import('@/views/patient-info/index'),
    meta: {
      title: '患者信息',
      keepAlive: false
    }
  },
  {
    path: '/patientAnalysis',
    name: 'PatientAnalysis',
    component: () => import('@/views/patient-analysis/index'),
    meta: {
      title: '新老患者分析',
      keepAlive: false
    }
  },
  {
    path: '/patientStructure',
    name: 'PatientStructure',
    component: () => import('@/views/patient-structure/index'),
    meta: {
      title: '患者结构分析',
      keepAlive: false
    }
  },
  {
    path: '/storeDetails',
    name: 'StoreDetails',
    component: () => import('@/views/store-details/index'),
    meta: {
      title: '门店详情',
      keepAlive: false
    }
  },
  {
    path: '/businessManagement',
    name: 'BusinessManagement',
    component: () => import('@/views/business-management/index'),
    meta: {
      title: '商务管理',
      keepAlive: false
    }
  },
  {
    path: '/clockIn',
    name: 'ClockIn',
    component: () => import('@/views/clock-in/index'),
    meta: {
      title: '签到',
      keepAlive: false
    }
  },
  {
    path: '/addTask',
    name: 'AddTask',
    component: () => import('@/views/add-task/index'),
    meta: {
      title: '新建拜访任务',
      keepAlive: false
    }
  },
  {
    path: '/visitTask',
    name: 'VisitTask',
    component: () => import('@/views/visit-task/index'),
    meta: {
      title: '拜访任务',
      keepAlive: false
    }
  },
  {
    path: '/inventoryCheck',
    name: 'InventoryCheck',
    component: () => import('@/views/inventory-check/index'),
    meta: {
      title: '进销存盘查',
      keepAlive: false
    }
  },
  {
    path: '/coldChainInspection',
    name: 'ColdChainInspection',
    component: () => import('@/views/cold-chain-inspection/index'),
    meta: {
      title: '冷链飞检',
      keepAlive: false
    }
  },
  {
    path: '/personalCenter',
    name: 'PersonalCenter',
    component: () => import('@/views/personal-center/index'),
    meta: {
      title: '个人中心',
      keepAlive: false
    }
  }
]

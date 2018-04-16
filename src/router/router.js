export default [
  {
    path: '/',
    name: 'Home',
    component: (resolve) => {
      require(['../view/HomeVip/index'], resolve)
    }
  },
  {
    path: '/BuyVip',
    name: 'BuyVip',
    component: (resolve) => {
      require(['../view/BuyVip/index'], resolve)
    }
  },
  {
    path: '/BookShelf',
    name: 'BookShelf',
    component: (resolve) => {
      require(['../view/BookShelf/index'], resolve)
    }
  },
  {
    path: '/AllBooks',
    name: 'AllBooks',
    component: (resolve) => {
      require(['../view/AllBooks/index'], resolve)
    }
  },
  {
    path: '/Collection',
    name: 'Collection',
    component: (resolve) => {
      require(['../view/Collection/index'], resolve)
    }
  },
  {
    path: '/Chapter',
    name: 'Chapter',
    component: (resolve) => {
      require(['../view/Chapter/index'], resolve)
    }
  },
  {
    path: '/Playing',
    name: 'Playing',
    component: (resolve) => {
      require(['../view/Playing/index'], resolve)
    }
  },
  {
    path: '/Answer',
    name: 'Answer',
    component: (resolve) => {
      require(['../view/Answer/index'], resolve)
    }
  },
  {
    path: '/Handouts',
    name: 'Handouts',
    component: (resolve) => {
      require(['../view/Handouts/index'], resolve)
    }
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: (resolve) => {
      require(['../view/wallet/index'], resolve)
    }
  },
  {
    path: '/VipCard',
    name: 'VipCard',
    component: (resolve) => {
      require(['../view/VipCard/index'], resolve)
    }
  },
  {
    path: '/Details',
    name: 'Details',
    component: (resolve) => {
      require(['../view/OrderDetails/index'], resolve)
    }
  },
  {
    path: '/PayResults',
    name: 'PayResults',
    component: (resolve) => {
      require(['../view/PayResults/index'], resolve)
    }
  },
  {
    path: '/testing',
    name: 'testing',
    component: (resolve) => {
      require(['../view/testing/index'], resolve)
    }
  },
  {
    path: '/Questions',
    name: 'Questions',
    component: (resolve) => {
      require(['../view/Questions/index'], resolve)
    }
  },
  {
    path: '/TestResult',
    name: 'TestResult',
    component: (resolve) => {
      require(['../view/TestResult/index'], resolve)
    }
  },
  {
    path: '/Binding',
    name: 'Binding',
    component: (resolve) => {
      require(['../view/Binding/index'], resolve)
    }
  },
  {
    path: '/Area',
    name: 'Area',
    component: (resolve) => {
      require(['../view/Area/index'], resolve)
    }
  },
  {
    path: '/Address',
    name: 'Address',
    component: (resolve) => {
      require(['../view/Address/index'], resolve)
    }
  },
  {
    path: '/Promotion',
    name: 'Promotion',
    component: (resolve) => {
      require(['../view/Promotion/index'], resolve)
    }
  },
  {
    path: '/PromCard',
    name: 'PromCard',
    component: (resolve) => {
      require(['../view/PromCard/index'], resolve)
    }
  },
  {
    path: '/Reflect',
    name: 'Reflect',
    component: (resolve) => {
      require(['../view/Reflect/index'], resolve)
    }
  },
  {
    path: '/Detailed',
    name: 'Detailed',
    component: (resolve) => {
      require(['../view/Detailed/index'], resolve)
    }
  },
  {
    path: '/CashDetailed',
    name: 'CashDetailed',
    component: (resolve) => {
      require(['../view/CashDetailed/index'], resolve)
    }
  },
  {
    path: '/Remind',
    name: 'Remind',
    component: (resolve) => {
      require(['../view/Remind/index'], resolve)
    }
  },
  {
    path: '/BookCard',
    name: 'BookCard',
    component: (resolve) => {
      require(['../view/BookCard/index'], resolve)
    }
  }
]

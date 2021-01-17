export const routes = [
  /**
   * Login route
   */
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  },
  /**
   * Layout routes
   */
  {
    path: '/',
    name: 'home',
    component: require('@/views/Layout.vue').default,
    redirect: '/dashboard',
    /**
     * Layout children routes
    */
    children: [
      /**
       * Dashboard
       */
      {
        meta: {
          title: 'Dashboard',
          authRoles: ['Admin', 'SuperAdmin']
        },
        path: 'dashboard',
        name: 'dashboard',
        component: require('@/views/layout/Home.vue').default
      },
      /**
       * Admins routes
       */
      {
        meta: {
          title: 'Admins',
          authRoles: ['SuperAdmin']
        },
        path: 'admins',
        name: 'admins',
        component: () => import(/* webpackChunkName: "admins" */ '@/views/layout/admin/Admins.vue')
      },
      {
        meta: {
          title: 'Create Admin',
          authRoles: ['SuperAdmin']
        },
        path: 'admins/create',
        name: 'admin-create',
        component: () => import(/* webpackChunkName: "admins" */ '@/views/layout/admin/AdminForm.vue')
      },
      {
        meta: {
          title: 'Edit Admin',
          authRoles: ['SuperAdmin']
        },
        path: 'admins/:adminId/edit',
        name: 'admin-edit',
        props: true,
        component: () => import(/* webpackChunkName: "admins" */ '@/views/layout/admin/AdminForm.vue')
      },
      /**
       * Employees routes
       */
      {
        meta: {
          title: 'Employees',
          authRoles: ['Admin', 'SuperAdmin']
        },
        path: 'employees',
        name: 'employees',
        component: () => import(/* webpackChunkName: "employees" */ '@/views/layout/employee/Employees.vue')
      },
      {
        meta: {
          title: 'Create Employee',
          authRoles: ['Admin', 'SuperAdmin']
        },
        path: 'employees/create',
        name: 'employee-create',
        component: () => import(/* webpackChunkName: "employees" */ '@/views/layout/employee/EmployeeForm.vue')
      },
      {
        meta: {
          title: 'Edit Employee',
          authRoles: ['Admin', 'SuperAdmin']
        },
        path: 'employees/:employeeId/edit',
        name: 'employee-edit',
        props: true,
        component: () => import(/* webpackChunkName: "employees" */ '@/views/layout/employee/EmployeeForm.vue')
      },
      /**
       * Clients Routes
       */
      {
        meta: {
          title: 'Clients',
          authRoles: ['Admin', 'SuperAdmin']
        },
        path: 'clients',
        name: 'clients',
        component: () => import(/* webpackChunkName: "clients" */ '@/views/layout/client/Clients.vue')
      },
      {
        meta: {
          title: 'Create Client',
          authRoles: ['Admin', 'SuperAdmin']
        },
        path: 'clients/create',
        name: 'client-create',
        component: () => import(/* webpackChunkName: "clients" */ '@/views/layout/client/ClientForm.vue')
      },
      {
        meta: {
          title: 'Edit Client',
          authRoles: ['Admin', 'SuperAdmin']
        },
        path: 'clients/:clientId/edit',
        name: 'client-edit',
        props: true,
        component: () => import(/* webpackChunkName: "clients" */ '@/views/layout/client/ClientForm.vue')
      },
      /**
       * Rest
       */
      {
        meta: {
          title: 'Profile'
        },
        path: 'profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/layout/Profile.vue')
      }
    ]
  },
  /**
  * Logout route
  */
  {
    path: '/unauthorized',
    name: 'logout',
    props: true,
    component: () => import(/* webpackChunkName: "logout" */ '@/views/Logout.vue')
  },
  /**
   * Everything else
   */
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue')
  }
]

export default routes

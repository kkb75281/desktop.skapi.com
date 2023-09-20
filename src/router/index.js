import { createRouter, createWebHistory, useRoute } from 'vue-router'
import Main from '@/views/Main.vue'
import Signup from '@/views/Signup.vue'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/DashboardView.vue'
import LandingPage from '@/views/LandingPage.vue'
import AccountSettings from '@/views/AccountSettings.vue'
import ServiceMain from '@/views/service/Main.vue'
import Service from '@/views/service/Service.vue'
import Users from '@/views/service/users/Users.vue'
import Records from '@/views/service/records/Records.vue'
import Mail from '@/views/service/Mail.vue'
import Subdomain from '@/views/service/subdomain/Subdomain.vue'

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '',
          name: 'home',
          component: LandingPage
        },
        {
          path: 'signup',
          name: 'signup',
          component: Signup
        },
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'forgotpassword',
          name: 'forgotpassword',
          component: () => import('@/views/ForgotPassword.vue')
        },
        // {
        //   path: 'deleteAccount',
        //   name: 'deleteAccount',
        //   component: () => import('@/views/dialog/deleteAccount.vue')
        // },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: 'accountSettings',
          name: 'accountSettings',
          component: AccountSettings
        },
        {
          path: 'confirmation',
          name: 'confirmation',
          component: () => import('@/views/ResendConfirmation.vue')
        },
        {
          path: 'success',
          name: 'success',
          component: () => import('@/views/EmailConfirmed.vue')
        },
        {
          path: 'bye',
          name: 'bye',
          component: () => import('@/views/Byebye.vue')
        },
      ]
    },
    {
      path: '/dashboard/:service',
      component: ServiceMain,
      children: [
        {
          path: '',
          name: 'service',
          component: Service
        },
        {
          path: 'users',
          name: 'users',
          component: Users
        },
        {
          path: 'records',
          name: 'records',
          component: Records
        },
        {
          path: 'mail',
          name: 'mail',
          component: Mail
        },
        {
          path: 'subdomain',
          name: 'subdomain',
          component: Subdomain
        }
      ]
    }
  ]
})

export default router

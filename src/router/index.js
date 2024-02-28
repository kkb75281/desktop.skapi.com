import { createRouter, createWebHistory, useRoute } from 'vue-router'
import Main from '@/views/Main.vue'
import Signup from '@/views/Signup.vue'
import Login from '@/views/Login.vue'
import MyServices from '@/views/MyServices.vue'
import Subscription from '@/views/Subscription/Subscription.vue'
import LandingPage from '@/views/LandingPage.vue'
import AccountSettings from '@/views/AccountSettings.vue'
import ServiceMain from '@/views/Service/Main.vue'
import Service from '@/views/Service/Service.vue'
import Users from '@/views/Service/Users/Users.vue'
import Records from '@/views/Service/Records/Records.vue'
import Mail from '@/views/Service/Mail.vue'
import Subdomain from '@/views/Service/Subdomain/Subdomain.vue'

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
        path: '/subscription/:service',
        name: 'subscription',
        component: Subscription
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: () => import('@/views/ResendConfirmation.vue')
    },
    {
      path: '/forgotpassword',
      name: 'forgotpassword',
      component: () => import('@/views/ForgotPassword.vue')
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('@/views/EmailConfirmed.vue')
    },
    {
      path: '/bye',
      name: 'bye',
      component: () => import('@/views/Byebye.vue')
    },
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '/experiment',
          name: 'experiment',
          component: () => import('@/views/experiment/experiment.vue')
        },
        {
          path: 'accountSettings',
          name: 'accountSettings',
          component: AccountSettings
        },
        {
          path: 'myServices',
          name: 'myServices',
          component: MyServices
        },
        {
          path: '/myServices/:service',
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
        },
      ]
    },
  ]
})

export default router

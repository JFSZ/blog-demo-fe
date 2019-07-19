import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/login'
import Home from '../page/home'
import ArticleList from '../page/articleList'
import PostArticle from '../page/postArticle'
import BlogDetail from '../page/blogDetail'
import UserMana from '../page/usermanage'
import CateMana from '../page/catemanage'
import DataCharts from '../page/datacharts'
import Unauthorized from '@/page/unauthorized.vue'
import Index from '@/page/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Index
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/home',
      name: '',
      component: Home
    },
    {
      path: '/home',
      name: '文章管理',
      component: Home,
      icon: 'fa fa-file-text-o',
      children: [
        {
          path: '/articleList',
          name: '文章列表',
          component: ArticleList,
          meta: {
            keepAlive: true
          }
        }, {
          path: '/postArticle',
          name: '发表文章',
          component: PostArticle,
          meta: {
            keepAlive: false
          }
        }, {
          path: '/blogDetail',
          name: '博客详情',
          component: BlogDetail,
          hidden: true,
          meta: {
            keepAlive: false
          }
        }, {
          path: '/editBlog',
          name: '编辑博客',
          component: PostArticle,
          hidden: true,
          meta: {
            keepAlive: false
          }
        }
      ]
    },
    {
      path: '/home',
      name: '用户管理',
      hidden: true,
      component: Home,
      children: [
        {
          path: '/usermanage',
          iconCls: 'fa fa-user-o',
          name: '用户管理',
          component: UserMana
        }
      ]
    },
    {
      path: '/home',
      name: '栏目管理',
      hidden: true,
      component: Home,
      children: [
        {
          path: '/catemanage',
          iconCls: 'fa fa-user-o',
          name: '栏目管理',
          component: CateMana
        }
      ]
    },
    {
      path: '/home',
      name: '数据统计',
      component: Home,
      iconCls: 'fa fa-bar-chart',
      children: [
        {
          path: '/charts',
          iconCls: 'fa fa-bar-chart',
          name: '数据统计',
          component: DataCharts
        }
      ]
    },
    {
      path: '/unauthorized',
      name: '404页面',
      component: Unauthorized
    }
  ]
})

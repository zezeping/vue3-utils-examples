import { createRouter, createWebHistory } from 'vue-router'
import { useRoutesDefine } from '@/utils/hooks/useRouterDefine'
import examples from './examples'

const routes = useRoutesDefine([
  { path: '/', name: 'Home', component: () => import('../views/home'), },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/notFound'), },
  examples,
])

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  next()
})

router.beforeResolve(async to => {
  return true
})

router.afterEach(async (to, from) => {
  const title = to.meta?.title
  document.title = `ViteApp${title ? `-${title}` : ''}`
})

const proxyRouter = new Proxy(router, {
  get(object, key) {
    if (key === 'getRoute') {
      return function(routeName) {
        const routes = object.getRoutes()
        return routes.find(route => route.name === routeName)
      }
    } else if (key === 'getParentRoute') {
      return function(route) {
        const parentRouteName = route.name?.split('/').slice(0, -1).join('/')
        return parentRouteName ? proxyRouter['getRoute'](parentRouteName) : null
      }
    } else {
      return Reflect.get(...arguments)
    }
  }
})

export default proxyRouter

import {computed} from 'vue'
import NProgress from 'nprogress'
//import store from '@/store'

export const useDefine = (route = {}) => {
  const { component, ...finalRoute } = route
  // meta
  finalRoute.meta = {
    ...finalRoute.meta,
    permission: computed(() => true),
  }
  
  // component
  if (typeof route['component'] === 'function') {
    finalRoute['component'] = () => {
      const result = route['component']()
      if (typeof result === 'object' && typeof result.then === 'function') {
        NProgress.start()
        result.finally(() => {
          NProgress.done()
        })
      }
      return result
    }
  } else {
    finalRoute['component'] = component
  }
  return finalRoute
}

export const useRoutesDefine = (routes) => {
  const iterateUseDefine = (route) => {
    if (route.children?.length) {
      route.children = route.children.map(route => iterateUseDefine(route))
    }
    return useDefine(route)
  }
  return routes.map(route => iterateUseDefine(route))
}
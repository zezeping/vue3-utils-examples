<template>
  <a-layout class="main-layout">
    <a-layout>
      <a-layout-sider v-if="isLeftMenuVisible" width="250">
        <NavMenu></NavMenu>
      </a-layout-sider>
      <a-layout-content>
        <slot></slot>
      </a-layout-content>
    </a-layout>
    <!--<a-layout-footer>Footer</a-layout-footer>-->
  </a-layout>
</template>

<script lang='jsx'>
import { reactive, toRefs, defineComponent, createVNode, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
//import ResetPassForm from '@/components/ResetPassForm'
//import { useModal } from '@/utils/hooks/useModal'
import NavMenu from './NavMenu'
import isInIframe from '@/utils/libs/isInIframe'

export default defineComponent({
  components: {
    NavMenu,
  },
  setup (props, ctx) {
    //const modal = useModal()
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const state = reactive({
      headerVisible: !isInIframe(),
      username: computed(() => store.getters['user/username']),
      isLeftMenuVisible: computed(() => {
        //const parentRoute = router.getParentRoute(route)
        //if (!parentRoute || parentRoute.name === 'home') {
        //  return false
        //}
        return true
      }),
    })
    return { ...toRefs(state) }
  },
})
</script>

<style lang="scss" scoped>
.main-layout {
  height: 100%;
}
</style>
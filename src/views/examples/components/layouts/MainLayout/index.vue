<template>
  <div class="main-layout flex-layout">
    <div class="left-panel" v-if="isLeftMenuVisible" style="width: 250px">
      <NavMenu></NavMenu>
    </div>
    <div class="right-panel">
      <slot></slot>
    </div>
  </div>
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
.flex-layout {
  height: 100%;
  background: #F6FAFF;

  .left-panel, .right-panel {
    height: 100%;
  }

  .right-panel {
    flex: 1;
    padding: 10px;
  }
}
</style>
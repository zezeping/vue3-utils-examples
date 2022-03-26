<template>
  <MainLayout>
    <div class="container">
      <PageBreadcrumb></PageBreadcrumb>
      <router-view></router-view>
    </div>
  </MainLayout>
</template>

<script lang='jsx'>
import { reactive, toRefs, defineComponent } from 'vue'
import MainLayout from './components/layouts/MainLayout'
import PageBreadcrumb from './components/layouts/PageBreadcrumb'

export default defineComponent({
  components: {
    MainLayout,
    PageBreadcrumb,
  },
  setup (props, ctx) {
    const state = reactive({})
    return { ...toRefs(state) }
  },
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  ::v-deep(.page-content) {
    background: #fff;
    padding: 10px;
    width: 100%;
    flex: 1;
    overflow: auto;
  }
}
</style>
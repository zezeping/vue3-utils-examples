<template>
  <div class="page-layout">
    <slot name="header"></slot>
    <slot name="mainBody">
      <div class="page-main-body">
        <PageBreadcrumb></PageBreadcrumb>
        <router-view></router-view>
      </div>
    </slot>
    <slot name="footer"></slot>
  </div>
</template>

<script lang='jsx'>
import { reactive, toRefs, defineComponent } from 'vue'
import PageBreadcrumb from './PageBreadcrumb'

export default defineComponent({
  components: {
    PageBreadcrumb
  },
  setup (props, ctx) {
    const state = reactive({})
    return { ...toRefs(state) }
  },
})
</script>

<style lang="scss" scoped>
.page-layout {
  height: 100%;
  overflow-y: auto;
  background: #F6FAFF;

  .page-main-body {
    padding: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    ::v-deep(.page-content) {
      flex: 1;
      padding: 10px;
      background: #fff;
      overflow: auto;
    }
  }
}
</style>
<template>
  <MainLayout>
    <PageLayout></PageLayout>
  </MainLayout>
</template>

<script lang='jsx'>
import { reactive, toRefs, defineComponent } from 'vue'
import MainLayout from './components/layouts/MainLayout'
import PageLayout from './components/layouts/PageLayout'

export default defineComponent({
  components: {
    MainLayout,
    PageLayout,
  },
  setup (props, ctx) {
    const state = reactive({})
    return { ...toRefs(state) }
  },
})
</script>

<style lang="scss" scoped>
</style>
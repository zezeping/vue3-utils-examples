<template>
  <a-menu :openKeys="openKeys" :selectedKeys="selectedKeys" mode="inline" theme="light" @click="onSelectMenu">
    <template v-for="(item, idx) in menus" :key="idx">
      <template v-if="item.children?.length">
        <a-sub-menu v-if="item.meta.permission" v-bind="{key: item.name, title: item.meta.title || '未定义'}">
          <!--<template #icon v-if="item.icon"></template>-->
          <template v-for="(iItem, iIdx) in item.children" :key="iIdx">
            <a-menu-item v-if="iItem.meta.permission" v-bind="{key: iItem.name}">
              <!--<template #icon v-if="iItem.icon"></template>-->
              <span>{{ iItem.meta.title }}</span>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
      <template v-else>
        <a-menu-item v-bind="{key: item.name}">
          <!--<template #icon v-if="item.icon"></template>-->
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>

<script lang='jsx'>
import { reactive, toRefs, defineComponent, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  setup (props, ctx) {
    const router = useRouter()
    const route = useRoute()

    const menus = [
      router.getRoute('examples'),
    ]

    console.log(menus)

    const state = reactive({
      menus,
      //openKeys: [router.getParentRoute(route)?.name],
      openKeys: menus.map(item => item.name), // 默认展开所有菜单
      selectedKeys: computed(() => {
        let keys = state.menus.filter(item => route.name.startsWith(item.name)).map(item => item.name)
        for(const menu of state.menus) {
          if (menu.children?.length) {
            keys = keys.concat(menu.children.filter(item => route.name.startsWith(item.name)).map(item => item.name))
          }
        }
        return keys
      }),
      onSelectMenu({ item, key, keyPath }) {
        router.push({ name: key })
      }
    })
    watch(() => router.currentRoute.value, nv => {
      if (nv) {
        const parentRoute = router.getParentRoute(nv)
        if (parentRoute && state.openKeys.indexOf(parentRoute.name) === -1) {
          state.openKeys.push(parentRoute.name)
        }
      }
    }, {immediate: true})
    return { ...toRefs(state) }
  },
})
</script>

<style lang="scss" scoped>
.ant-menu {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
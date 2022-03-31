<template>
  <easy-player
      v-if="isSdkLoaded"
      ref="videoRef"
      video-url="https://xxx.com/streamDelivery_HUZ01_85/playlist/59397c6abb167fe43171e90f35f0a9c6.m3u8"
      live="true"
      isresolution="true"
      resolutiondefault="sd"
  ></easy-player>
</template>

<script lang='jsx'>
import { reactive, toRefs, defineComponent, onMounted, nextTick} from 'vue'
import { loadScript } from '@/utils/libs/resourceLoader'
const skdLoaderPromise = new Promise(async resolve => {
  await loadScript('/easyPlayer/EasyPlayer-element.min.js')
  resolve()
})

export default defineComponent({
  setup (props, ctx) {
    const state = reactive({
      isSdkLoaded: false,
      vidoeRef: null,
      //url: 'https://flvplayer.js.org/assets/video/weathering-with-you.flv',
      url: 'https://xxx.com/streamDelivery_ZS01_82/playlist/864268c2a2c7b2bdb9bdc433d425ef07.m3u8',
    })


    onMounted(async () => {
      await skdLoaderPromise
      state.isSdkLoaded = true
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>

<style lang="scss" scoped>
#glplayer {
  width: 500px;
  height: 200px;
  border: 1px solid #f2f2f2;
}
</style>
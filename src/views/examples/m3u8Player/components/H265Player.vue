<template>
  <div id="h265-player"></div>
</template>

<script lang='jsx'>
import { reactive, toRefs, defineComponent, onMounted } from 'vue'
import { loadScript } from '@/utils/libs/resourceLoader'
const skdLoaderPromise = new Promise(async resolve => {
  await loadScript('/easyWasmPlayer/EasyWasmPlayer.js')
  resolve()
})

export default defineComponent({
  setup (props, ctx) {
    const state = reactive({
      //url: 'https://flvplayer.js.org/assets/video/weathering-with-you.flv',
      url: 'https://xxx.com/streamDelivery_ZS01_82/playlist/864268c2a2c7b2bdb9bdc433d425ef07.m3u8',
    })

    let player = null
    onMounted(async () => {
      await skdLoaderPromise
      player = new WasmPlayer(null, 'h265-player', (e) => {
        console.log('callbackfun', e)
      })
      // 调用播放
      player.play(state.url, 1)
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
<template>
  <div class="page-content m3u8-player">
    <HlsPlayer :src="hlsSrc" @update:hlsSize="size => hlsSize = size"></HlsPlayer>
    <a-divider></a-divider>
    <div>hlsSize: {{ hlsSize }}</div>
    <a-divider></a-divider>
    <json-view :data="m3u8List"></json-view>
  </div>
</template>

<script lang='jsx'>
import { reactive, toRefs, defineComponent } from 'vue'
import HlsPlayer from './components/HlsPlayer'

export default defineComponent({
  components: {
    HlsPlayer,
  },
  setup (props, ctx) {

    const m3u8List = [
      'https://zsvideo.hesc.com.cn:30031/streamDelivery_ZS01_82/1_0_78612/864268c2a2c7b2bdb9bdc433d425ef07.m3u8',
      'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
      'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
      'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    ]

    const state = reactive({
      hlsSrc: m3u8List[0],
      hlsSize: {
        'videoWidth': 1280,
        'videoHeight': 720,
      },
      m3u8List,
    })

    let currentIndex = 0
    setInterval(() => {
      currentIndex = (currentIndex + 1) % m3u8List.length
      state.hlsSrc = m3u8List[currentIndex]
    }, 10 * 1000)

    return {
      ...toRefs(state),
    }
  },
})
</script>

<style lang="scss" scoped>
.hls-player {
  width: 800px;
  height: 250px;
  background: #333;
}
</style>
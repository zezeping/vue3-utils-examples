<template>
  <video ref="videoRef" class="hls-player" v-bind="computedVideoOptions"></video>
</template>

<script lang='jsx'>
import { reactive, toRefs, defineComponent, computed, onMounted, watch } from 'vue'
import Hls from 'hls.js'

export default defineComponent({
  props: {
    hlsOptions: [Object],
    videoOptions: [Object],
    src: [String]
  },
  emits: ['update:hlsSize'],
  setup (props, ctx) {
    const hls = new Hls({
      debug: import.meta.env.NODE_ENV === 'development',
      enableWorker: true,
      lowLatencyMode: true,
      backBufferLength: 90,
      ...props.hlsOptions
    })

    const state = reactive({
      videoRef: null,
      computedVideoOptions: computed(() => {
        return {
          muted: true,
          playsinline: 'playsinline',
          'webkit-playsinline': true,
          controls: true,
          autoplay: true,
          ...props.videoOptions,
        }
      })
    })

    //hls.on(Hls.Events.MANIFEST_PARSED, () => {
    //  state.autoplay && state.videoRef?.play()
    //})
    hls.on(Hls.Events.ERROR, function (event, data) {
      console.error(event, data)
    })

    onMounted(() => {
      state.videoRef.ontimeupdate = () => {
        ctx.emit('update:hlsSize', { videoWidth: state.videoRef.videoWidth, videoHeight: state.videoRef.videoHeight })
      }

      hls.attachMedia(state.videoRef)
      watch(() => props.src, nv => {
        if (nv) {
          hls.loadSource(nv)
        } else {
          state.videoRef.stop()
        }
      }, {immediate: true});
    })

    return { ...toRefs(state) }
  },
})
</script>

<style lang="scss" scoped>
</style>
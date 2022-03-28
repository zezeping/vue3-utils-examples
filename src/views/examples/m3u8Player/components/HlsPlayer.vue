<template>
  <video ref="videoRef" class="hls-player" v-bind="computedVideoOptions"></video>
</template>

<script lang='jsx'>
import { reactive, toRefs, defineComponent, computed, onMounted, onUnmounted, watch } from 'vue'
import Hls from 'hls.js'

export default defineComponent({
  props: {
    src: [String],
    hlsSize: [Object],
    hlsOptions: [Object],
    videoOptions: [Object],
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
      currentHlsSize: computed({
        get() {
          return props.hlsSize
        },
        set(nv) {
          ctx.emit('update:hlsSize', nv)
        }
      }),
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
      const videoRef = state.videoRef
      videoRef.ontimeupdate = () => {
        const size = { videoWidth: videoRef?.videoWidth, videoHeight: videoRef?.videoHeight }
        if (state.currentHlsSize?.videoWidth !== size.videoWidth || state.currentHlsSize?.videoHeight !== size.videoHeight) {
          state.currentHlsSize = size
        }
      }

      hls.attachMedia(state.videoRef)
      watch(() => props.src, nv => {
        videoRef.pause()
        if (nv) {
          hls.loadSource(nv)
        }
      }, {immediate: true});
    })

    onUnmounted(() => {
      hls.destroy()
    })

    return { ...toRefs(state) }
  },
})
</script>

<style lang="scss" scoped>
</style>
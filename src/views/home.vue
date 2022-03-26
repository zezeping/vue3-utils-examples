<template>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <i-svg-help style="font-size: 50px; fill: red;" />
  <i-svg-inline-foo class="svg-icon inherit-color" style="font-size: 50px; color: red;" />
  <i-svg2-foo />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <hr />
  <table class="table border text-overflow-ellipsis" style="width: 200px; margin: 0 auto;">
    <tr>
      <th style="flex-grow: 0.5;">序号</th>
      <th>内容</th>
    </tr>
    <tr>
      <td style="flex-grow: 0.5;">1</td>
      <td>你好世界</td>
    </tr>
  </table>
  <hr>
  <hr />
  <div>Home</div>
  <a-button @click="$router.push({name: 'examples'})">examples</a-button>
</template>
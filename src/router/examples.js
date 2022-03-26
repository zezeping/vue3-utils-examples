export default {
  path: '/examples',
  name: 'examples',
  //redirect: '/communityManage/communities',
  meta: { title: 'examples', checkPermission: true },
  component: () => import('@/views/examples'),
  children: [
    {path: 'm3u8Player', name: 'examples/m3u8Player', meta: {title: 'm3u8Player', checkPermission: true}, component: () => import('@/views/examples/m3u8Player')},
  ]
}
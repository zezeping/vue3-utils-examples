export default function() {
  //1. window.location !== window.parent.location
  //2. window.self !== window.top
  //3. !!window.frameElement
  return window.self !== window.top
}
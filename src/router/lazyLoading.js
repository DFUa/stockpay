export default (name) => () => import(`@/components/views/${name}.vue`)

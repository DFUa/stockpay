<template>
  <hollow-dots-spinner
    :animation-duration="1000"
    :dot-size="15"
    :dots-num="3"
    :color="'#006344'"/>
</template>

<script>
import { HollowDotsSpinner } from 'epic-spinners'

export default {
  name: 'UiSpinner',

  components: {
    HollowDotsSpinner
  }
}
</script>

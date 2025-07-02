# 🌐 网络

<script setup>
import { useData } from 'vitepress'
import { computed, h } from 'vue'


const { theme, page } = useData()


const sidebar = computed(() => theme.value.sidebar.find(item=>item.link.includes('src/network'))['items'])

</script>

<div>
  <template v-for="(item, index) in sidebar">
    <p>
      <a :href="'.' + item.link.match(/[^\/src\/network]*\/([^\/]+\/[^\/]+)(?=\.[^\/]+$)/)[0]">{{  item.text }}</a>
    </p>
  </template>
</div>

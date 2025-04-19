# 💡 目录

仅展示一级目录

<script setup>
import { useData } from 'vitepress'
import { computed, h } from 'vue'


const { theme, page } = useData()

const sidebar = computed(() => theme.value.sidebar.slice(1, -1))
</script>

<div :class="$style.wrapper">
  <template v-for="(item, index) in sidebar">
    <p>
      {{ index + 1 }}. <a :href="'.' + item.link.slice(4, -3)">{{  item.text }}</a>
    </p>
  </template>
</div>

<style module>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
</style>

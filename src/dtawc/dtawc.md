# <div class="title" style="display: flex; align-items: center;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d32727" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pickaxe-icon lucide-pickaxe"><path d="M14.531 12.469 6.619 20.38a1 1 0 1 1-3-3l7.912-7.912"/><path d="M15.686 4.314A12.5 12.5 0 0 0 5.461 2.958 1 1 0 0 0 5.58 4.71a22 22 0 0 1 6.318 3.393"/><path d="M17.7 3.7a1 1 0 0 0-1.4 0l-4.6 4.6a1 1 0 0 0 0 1.4l2.6 2.6a1 1 0 0 0 1.4 0l4.6-4.6a1 1 0 0 0 0-1.4z"/><path d="M19.686 8.314a12.501 12.501 0 0 1 1.356 10.225 1 1 0 0 1-1.751-.119 22 22 0 0 0-3.393-6.319"/></svg>&nbsp;奇技淫巧</div>

> diabolic tricks and wicked craft

<script setup>
import { useData } from 'vitepress'
import { computed, h } from 'vue'


const { theme, page } = useData()


const sidebar = computed(() => theme.value.sidebar.find(item=>item.link.includes('src/dtawc'))?.items)

</script>

<div>
  <template v-for="(item, index) in sidebar">
    <p>
      <a :href="item.link.split('/src/dtawc/')[1].split('.md')[0]">{{  item.text }}</a>
    </p>
  </template>
</div>

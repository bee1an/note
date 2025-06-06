# 类型体操

<script setup>
import { useData } from 'vitepress'
import { computed, h } from 'vue'


const { theme, page } = useData()

const findLinkInclude = (arr, str) => arr.find(i => i.link.includes(str))


const aboutTypeChallenges = computed(() => findLinkInclude(findLinkInclude(theme.value.sidebar,'ts.md').items, 'type-challenges.md').items)
</script>

<h1>
  <template v-for="(item, index) in aboutTypeChallenges">
    <p>
      <a :href="'.' + item.link.slice(23, -3)">{{  item.text }}</a>
    </p>
  </template>
</h1>

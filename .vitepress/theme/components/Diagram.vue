<script setup>
import { useData } from "vitepress";

const { isDark } = useData();

defineProps({
  name: {
    type: String,
    required: true,
  },

  className: {
    type: String,
    default: "diagram",
  },
});
</script>

<template>
  <img
    :src="isDark ? `/diagrams/${name}-dark.svg` : `/diagrams/${name}-light.svg`"
    :alt="name"
    :class="className"
  />
</template>

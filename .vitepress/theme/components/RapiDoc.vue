<script setup lang="ts">
import "rapidoc";
import { useData } from "vitepress";
import { onMounted, ref, watch } from "vue";

const { isDark } = useData();
const rapidocRef = ref();

function injectSwaggerStyles() {
  const root = rapidocRef.value?.shadowRoot;

  if (!root) return;

  if (root.querySelector("#swagger-method-colors")) {
    return;
  }

  const style = document.createElement("style");

  style.id = "swagger-method-colors";

  style.textContent = `
    .endpoint-head .method.post {
      background:#49cc90 !important;
      border-color:#49cc90 !important;
      color:white !important;
    }

    .endpoint-head .method.get {
      background:#61affe !important;
      border-color:#61affe !important;
      color:white !important;
    }

    .endpoint-head .method.put {
      background:#fca130 !important;
      border-color:#fca130 !important;
      color:white !important;
    }

    .endpoint-head .method.patch {
      // background:#50e3c2 !important;
      // border-color:#50e3c2 !important;
      background:#827717 !important;
      border-color:#827717 !important;
      color:white !important;
    }

    .endpoint-head .method.delete {
      background:#f93e3e !important;
      border-color:#f93e3e !important;
      color:white !important;
    }
  `;

  root.appendChild(style);
}

onMounted(() => {
  setTimeout(injectSwaggerStyles, 500);
});

watch(isDark, () => {
  setTimeout(() => {
    injectSwaggerStyles();
  }, 100);
});
</script>

<template>
  <div class="rapidoc-wrapper">
    <rapi-doc
      ref="rapidocRef"
      :key="isDark ? 'dark' : 'light'"
      spec-url="/openapi/swagger.json"
      :theme="isDark ? 'dark' : 'light'"
      render-style="view"
      expand-paths="false"
      show-header="false"
      allow-try="true"
      schema-style="table"
      sort-tags="true"
      sort-endpoints-by="path"
    />
  </div>
</template>

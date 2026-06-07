<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import "swagger-ui-dist/swagger-ui.css";

const props = defineProps<{
  specUrl?: string;
}>();

const container = ref<HTMLElement | null>(null);

let ui: any = null;

onMounted(async () => {
  if (!container.value) return;

  const { default: SwaggerUI } = await import(
    "swagger-ui-dist/swagger-ui-es-bundle"
  );

  ui = SwaggerUI({
    domNode: container.value,
    url: props.specUrl || "/openapi/swagger.json",
    deepLinking: false,
    docExpansion: "list",
    persistAuthorization: true,
  });
});

// onUnmounted(() => {
//   ui?.destroy?.();
//   ui = null;
// });

onUnmounted(() => {
  console.log("Swagger unmount");

  try {
    console.log("ui =", ui);

    ui?.destroy?.();

    if (container.value) {
      container.value.innerHTML = "";
    }

    console.log("destroy success");
  } catch (error) {
    console.error("Swagger destroy error:", error);
  }

  ui = null;
});
</script>

<template>
  <div class="swagger-wrapper">
    <div ref="container" />
  </div>
</template>

<!-- <style scoped>
.swagger-page {
  margin-top: 1rem;
  background: #ffffff;
  padding: 16px;
  border-radius: 12px;
}
</style> -->

<template>
  <v-btn-toggle
    v-model="toggle"
    color="primary"
    mandatory
    rounded="100"
    variant="text"
    density="compact"
  >
    <v-btn density="compact">週</v-btn>
    <v-btn density="compact">月</v-btn>
  </v-btn-toggle>
</template>

<script lang="ts" setup>
import { useUserStore } from "../../stores/userStoreNew";
const store = useUserStore();
const viewMode = computed(() => store.getViewMode());
const toggle = ref(viewMode.value);

watch(toggle, (oldValue) => {
  store.updateViewMode(toggle.value);
});
</script>

<style></style>

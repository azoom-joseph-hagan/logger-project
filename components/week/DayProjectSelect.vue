<template>
  <v-sheet class="mx-auto" max-width="800">
    <h4 class="pl-10">{{ title }}</h4>
    <v-slide-group
      v-model="model"
      class="pa-4"
      center-active
      selected-class="bg-white elevation-9 selected"
      show-arrows
    >
      <v-slide-group-item
        v-for="(project, index) in projectData"
        :key="project.name"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <v-card
          :color="project.color"
          :class="['ma-2 my-5', selectedClass]"
          height="100"
          width="150"
          @click="toggle"
          :title="project.name"
        >
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
    <v-expand-transition>
      <ProjectAddTime
        :model="model"
        :selected="projectData[model || 0].name"
        :color="projectData[model || 0].color"
      />
    </v-expand-transition>
  </v-sheet>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const props = defineProps<{
  projectData: { name: string; color: string }[];
  title: string;
}>();

const model = ref(null);
</script>

<style scoped>
.selected {
  border-width: 2px;
  border-style: solid;
  border-color: black;
}
</style>

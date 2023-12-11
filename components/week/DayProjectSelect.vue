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
          :class="['ma-1 my-2 size-class', selectedClass]"
          @click="toggle"
          :title="project.name"
        >
          <!--          height="100"
          width="150" -->
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

@media (min-width: 576px) {
  .size-class {
    width: 100;
    height: 50;
  }
}

@media (min-width: 768px) {
  .size-class {
    width: 150px;
    height: 75px;
  }
}

@media (min-width: 992px) {
  .size-class {
    width: 200px;
    height: 100px;
  }
}

@media (min-width: 1200px) {
  .size-class {
    width: 250px;
    height: 125px;
  }
}
</style>

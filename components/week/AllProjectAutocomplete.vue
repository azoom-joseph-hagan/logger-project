<template>
  <v-sheet class="mx-auto px-2" max-width="800">
    <h3 class="my-2">Recent Projects:</h3>
    <v-slide-group
      v-model="model"
      class="pa-1"
      center-active
      selected-class="bg-white elevation-3 selected"
      show-arrows
    >
      <v-slide-group-item
        v-for="(project, index) in recentProjects"
        :key="project.name"
        v-slot="{ isSelected, toggle, selectedClass }"
        :value="project"
      >
        <v-card
          :color="project.color"
          :class="['ma-1 my-2 size-class', selectedClass]"
          @click="toggle"
          :title="project.name"
        >
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
    <h3 class="my-2">All Projects:</h3>
    <div>
      <v-autocomplete
        v-model="model"
        auto-select-first
        density="comfortable"
        hide-details="auto"
        clearable
        placeholder="Select a project"
        :items="projectData"
        item-title="name"
        item-value="name"
        return-object
        variant="outlined"
      ></v-autocomplete>
      <v-form
        class="d-flex align-center mt-2"
        @submit.prevent="handleSubmit(+textInput)"
      >
        <v-text-field
          class="flex-grow-1 mr-2"
          clearable
          label="Tracked Time"
          v-model.number="textInput"
          density="comfortable"
          hide-details
          variant="outlined"
        ></v-text-field>
        <v-btn color="success" variant="flat" @click="handleSubmit(+textInput)"
          >Add</v-btn
        >
      </v-form>
    </div>
  </v-sheet>
</template>

<script lang="ts" setup>
const textInput = ref("");
const model = ref<{ name: string; color: string } | null>(null);
const props = defineProps<{
  projectData: { name: string; color: string }[];
  recentProjects: { name: string; color: string }[];
  addProjectPercentage: (mins: number, project: string, color: string) => void;
}>();

const handleSubmit = (input: number) => {
  if (model.value) {
    props.addProjectPercentage(
      input,
      model.value.name,
      `bg-${model.value.color}`
    );
  }
  textInput.value = "";
};
</script>

<style scoped>
.selected {
  border-width: 3px;
  border-style: solid;
  border-color: black;
}

@media (min-width: 500px) {
  .size-class {
    width: 100;
    height: 50;
  }
}

@media (min-width: 600px) {
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

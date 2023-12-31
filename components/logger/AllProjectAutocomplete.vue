<template>
  <v-sheet class="mx-auto px-2" max-width="800">
    <h3 class="my-2">Recent Projects:</h3>
    <v-slide-group
      v-model="model"
      class="pa-0 pa-sm-1"
      center-active
      selected-class="elevation-3 selected"
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
        class="d-flex align-center mt-3"
        @submit.prevent="handleSubmit(textInput)"
      >
        <v-text-field
          class="flex-grow-1 pr-2"
          clearable
          label="Tracked Time"
          v-model="textInput"
          density="comfortable"
          hint="Enter a number in (Minutes: 60. Hours: 1h, 1:30, or Percentage: 25%)"
          variant="outlined"
          :disabled="!projectSelected"
          ref="textFieldRef"
        ></v-text-field>
        <v-btn
          class="align-self-stretch"
          height="47"
          color="success"
          variant="flat"
          @click="handleSubmit(textInput)"
          :disabled="!projectSelected"
          >Add</v-btn
        >
      </v-form>
    </div>
  </v-sheet>
</template>

<script lang="ts" setup>
import { generateTime } from "../../util/timeGenerator";
const textInput = ref("");
const model = ref<{ name: string; color: string; trueColor: string } | null>(
  null
);
const projectSelected = ref(false);
const textFieldRef = ref<HTMLInputElement | null>(null);

watch(model, async (oldVal) => {
  if (model.value) {
    projectSelected.value = true;
    await nextTick();
    if (textFieldRef.value) {
      textFieldRef.value.focus();
    }
  } else {
    projectSelected.value = false;
  }
});

const props = defineProps<{
  projectData: { name: string; color: string; trueColor: string }[];
  recentProjects: { name: string; color: string; trueColor: string }[];
  addProjectPercentage: (
    mins: number,
    project: string,
    color: string,
    trueColor: string
  ) => void;
  totalLoggedHours: number;
}>();

const emit = defineEmits(["setError"]);

const handleSubmit = (input: string | number) => {
  if (!model.value) {
    emit("setError", "Please select a project");
    textInput.value = "";
    return;
  }
  if (input == 0) {
    emit("setError", "Enter a number greater than 0");
    textInput.value = "";
    return;
  }
  const normalizedMins = generateTime(input, props.totalLoggedHours);
  if (!normalizedMins) {
    emit(
      "setError",
      "Enter in the correct formats: (Minutes: 60. Hours: 1h, 1:30, or Percentage: 25%)"
    );
    return;
  } else {
    if (model.value) {
      props.addProjectPercentage(
        normalizedMins.time,
        model.value.name,
        `bg-${model.value.color}`,
        model.value.trueColor
      );
    }
  }
  textInput.value = "";
};
</script>

<style>
/* MOBILE ONLY */
@media (max-width: 500px) {
  .v-slide-group__prev {
    display: none !important;
  }
  .v-slide-group__next {
    display: none !important;
  }
}
</style>

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

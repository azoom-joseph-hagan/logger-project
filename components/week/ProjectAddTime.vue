<template>
  <v-sheet v-if="model != null">
    <v-row class="d-flex flex-column w-75 mx-auto">
      <v-col>
        <h3 class="text-h6">Allocate time to: {{ selected }}</h3>
      </v-col>
      <v-col class="d-flex">
        <v-text-field
          label="Tracked Time"
          v-model.number="input"
        ></v-text-field>
        <v-btn @click="handleSubmit(input)">Add</v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts" setup>
import { generateVuetifyColorFunction } from "../../util/randomColor";
const props = defineProps<{
  model: number | null | undefined;
  selected: string;
}>();

const input = ref("");
const addProjectPercentage = inject("addProjectPercentage");

const handleSubmit = (percent: number) => {
  addProjectPercentage(percent, props.selected, generateVuetifyColorFunction());
  input.value = "";
};
</script>

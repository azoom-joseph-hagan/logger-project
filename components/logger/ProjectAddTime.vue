<template>
  <v-sheet v-if="model != null">
    <v-row class="d-flex flex-column mx-auto">
      <v-col>
        <h3 class="text-body-2">Allocate time to: {{ selected }}</h3>
      </v-col>
      <v-col>
        <v-form
          class="d-flex align-center"
          @submit.prevent="handleSubmit(+input)"
        >
          <v-text-field
            class="flex-grow-1 mr-2"
            clearable
            label="Tracked Time"
            v-model.number="input"
            density="comfortable"
            hide-details
          ></v-text-field>
          <v-btn @click="handleSubmit(+input)">Add</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts" setup>
const props = defineProps<{
  model: number | null | undefined;
  color: string;
  selected: string;
}>();

const input = ref("");
const addProjectPercentage = inject<
  (mins: number, project: string, color: string) => void
>("addProjectPercentage");

const handleSubmit = (percent: number) => {
  if (addProjectPercentage)
    addProjectPercentage(percent, props.selected, `bg-${props.color}`);
  input.value = "";
};
</script>

<template>
  <v-row
    justify="center"
    class="mt-3"
  >
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          outlined
          color="blue-grey"
        >
          Add new task
          <v-icon class="ml-2">mdi-plus-circle-outline</v-icon>
        </v-btn>
      </template>
      <v-card class="pt-2 px-2 pb-5">
        <FormComponent @add-task-item="addTaskItem($event)" />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import FormComponent from './FormComponent.vue'

@Component({
  components: {
    FormComponent
  }
})
export default class AddTaskDialog extends Vue {
  dialog = false

  private addTaskItem (tasks: { [key: string]: any }): void {
    this.$emit('add-task-item', tasks)
  }
}
</script>

<style scoped lang="scss">
</style>

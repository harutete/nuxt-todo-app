<template>
  <v-row
    justify="center"
    class="mt-3"
  >
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ on }">
        <v-btn
          outlined
          color="accent"
          v-on="on"
        >
          Add new task
          <v-icon class="ml-2">
            mdi-plus-circle-outline
          </v-icon>
        </v-btn>
      </template>
      <v-card class="pt-2 px-2 pb-5">
        <div class="d-flex flex-row-reverse">
          <v-btn
            fab
            outlined
            small
            class="mr-3"
            @click="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
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

    this.dialog = false
  }

  private close (): void {
    this.dialog = false
  }
}
</script>

<style scoped lang="scss">
</style>

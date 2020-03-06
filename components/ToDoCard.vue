<template>
  <v-card
    draggable="true"
    @dragstart="moveItem"
    @dragend="fixItem(task)"
  >
    <v-card-title>
      <span @click="showModal">
        {{ task.title }}<v-icon>mdi-dock-window</v-icon>
      </span>
    </v-card-title>
    <v-card-text>
      <div class="mt-n2 ml-n2">
        <v-chip
          v-for="(tag, index) in task.tags"
          :key="`tag${index}`"
          class="ma-2"
          :color="tag.color"
          outlined
          label
          :text-color="tag.color"
        >
          <v-icon left>mdi-label</v-icon>
          {{ tag.name }}
        </v-chip>
      </div>
      <div
        v-if="task.description"
        class="text--primary"
      >
        {{ task.description }}
      </div>
      <v-container>
        <v-row
          align="center"
          justify="space-between"
        >
          <v-col cols="6">
            <p class="mb-0">
              {{ $dateFormat(task.ended_date.seconds, 'YYYY/MM/DD hh時mm分') }}
            </p>
          </v-col>
          <v-col cols="6">
            <v-btn
              @click="removeTaskItem(task.id)"
              class="float-right"
              icon
            >
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class TodoCard extends Vue {
  @Prop({ type: Object })
  task!: { [key: string]: any }

  private showModal () {
    this.$emit('show-modal')
  }

  private removeTaskItem (taskId: string | number): void {
    this.$emit('remove-task-item', taskId)
  }

  private moveItem (): void {
    this.$emit('move-item')
  }

  private fixItem (task: { [key: string]: any }): void {
    this.$emit('fix-item', task)
  }
}
</script>

<style lang="scss" scoped>
.list-color-chip {
  list-style: none;
  padding: 0;
  li + li {
    margin-top: 10px;
  }
}
.color-chip {
  cursor: pointer;
  border-radius: 5px;
  color: #FFFFFF;
  padding: 5px 10px;
}
</style>

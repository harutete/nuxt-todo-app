<template>
  <v-card
    outlined
    color="accent"
    @dragenter="dragEnter"
  >
    <h2 class="title font-weight-bold mx-3 pt-3 white--text">
      {{ panelTitle }}
    </h2>
    <v-container>
      <v-row>
        <template v-if="tasks.length">
          <v-col
            v-for="(task, index) in tasks"
            :key="`task${index}`"
            cols="12"
          >
            <ToDoCard
              :task="task"
              @show-modal="showModal($event)"
              @drag-start="dragStart($event)"
              @drag-end="dragEnd($event)"
              @remove-task-item="removeTaskItem($event)"
            />
          </v-col>
        </template>
        <v-col
          v-else
          cols="12"
        >
          <p class="white--text">
            タスクはありません
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { TaskDetail } from '~/types'
import ToDoCard from '~/components/ToDoCard.vue'

@Component({
  components: {
    ToDoCard
  }
})
export default class TaskPanel extends Vue {
  @Prop({ type: String })
  panelTitle!: string

  @Prop({ type: Array })
  tasks!: { [key: string]: any }[]

  @Prop({ type: String })
  status!: string

  isDialogOpen = false

  private showModal (task: TaskDetail) {
    this.$emit('show-modal', task)
  }

  private removeTaskItem (taskId: string): void {
    this.$emit('remove-task-item', taskId)
  }

  private dragEnter () {
    this.$emit('drag-enter')
  }

  private dragStart (task: { [key: string]: any }): void {
    this.$emit('drag-start', task)
  }

  private dragEnd (): void {
    this.$emit('drag-end')
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

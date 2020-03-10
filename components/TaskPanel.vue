<template>
  <v-card
    @dragover.prevent="movePanel"
    @drop.prevent="changeStatus"
  >
    <h2 class="title font-weight-bold mx-3 pt-3">
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
              @show-modal="showModal"
              @move-item="moveItem"
              @fix-item="fixItem($event)"
              @remove-task-item="removeTaskItem($event)"
            />
          </v-col>
        </template>
        <v-col
          v-else
          cols="12"
        >
          <p>タスクはありません</p>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
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

  private showModal () {
    this.isDialogOpen = true
  }

  private removeTaskItem (taskId: string): void {
    this.$emit('remove-task-item', taskId)
  }

  private movePanel () {
  }

  private changeStatus () {
    this.$emit('change-status')
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

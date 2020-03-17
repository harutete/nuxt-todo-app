<template>
  <v-card
    outlined
    draggable="true"
    class="card-task"
    :class="{ 'is-done': task.status === 'done' }"
    @dragstart="dragStart($event, task)"
    @dragend="dragEnd"
  >
    <v-card-title
      :class="{'d-flex justify-space-between title-modal-open': task.description}"
      @click="showModal(task)"
    >
      <div>
        {{ task.title }}
      </div>
      <div v-if="task.description">
        <v-icon>mdi-dock-window</v-icon>
      </div>
    </v-card-title>
    <v-card-text>
      <div class="mt-n2 ml-n2">
        <v-chip
          v-for="(tag, index) in task.tags"
          :key="`tag${index}`"
          class="mt-1 mx-1"
          :color="tag.color"
          outlined
          label
          :text-color="tag.color"
        >
          <v-icon left>
            mdi-label
          </v-icon>
          {{ tag.name }}
        </v-chip>
      </div>
      <div
        v-if="task.description"
        class="mt-4 text--primary card-description"
      >
        {{ task.description }}
      </div>
      <v-container>
        <v-row
          align="center"
          justify="space-between"
        >
          <v-col
            cols="6"
            class="py-0 pl-0"
          >
            <p
              class="mb-0"
              :class="{ 'red--text': task.is_expired }"
            >
              {{ $dateFormat(task.ended_date.seconds, 'YYYY/MM/DD hh時mm分') }}
            </p>
          </v-col>
          <v-col
            cols="6"
            class="py-0 pr-0"
          >
            <v-btn
              class="float-right"
              icon
              @click="removeTaskItem(task.id)"
            >
              <v-icon>
                mdi-trash-can-outline
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { TaskDetail } from '~/types'

@Component
export default class TodoCard extends Vue {
  @Prop({ type: Object })
  task!: { [key: string]: any }

  private showModal (task: TaskDetail) {
    this.$emit('show-modal', task)
  }

  private removeTaskItem (taskId: string): void {
    this.$emit('remove-task-item', taskId)
  }

  private dragStart (event: any, task: { [key: string]: any }): void {
    event.target.style.opacity = '.6'
    this.$emit('drag-start', task)
  }

  private dragEnd (event: any): void {
    event.target.style.opacity = '1'
    this.$emit('drag-end')
  }
}
</script>

<style lang="scss" scoped>
.title-modal-open {
  cursor: pointer;
}
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
.card-task {
  overflow: hidden;
}
.is-done {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(102, 102, 102, .6);
    width: 100%;
    height: 100%;
  }
}
.card-description {
  position: relative;
  overflow: hidden;
  height: 45px;
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.9) 80%, #FFFFFF 100%);
    width: 100%;
    height: 100%;
    max-height: 20px;
  }
}
</style>

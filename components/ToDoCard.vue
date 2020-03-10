<template>
  <v-card
    draggable="true"
    @dragstart="moveItem"
    @dragend="fixItem(task)"
    :class="{ 'is-done': task.status === 'done' }"
  >
    <v-card-title
      class="d-flex justify-space-between"
      @click="showModal"
    >
      <div>
        {{ task.title }}
      </div>
      <div>
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
        class="mt-4 text--primary"
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

@Component
export default class TodoCard extends Vue {
  @Prop({ type: Object })
  task!: { [key: string]: any }

  private showModal () {
    this.$emit('show-modal')
  }

  private removeTaskItem (taskId: string): void {
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
.is-done {
  background: #ECECEC;
}
</style>

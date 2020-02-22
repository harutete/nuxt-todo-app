<template>
  <v-card>
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
          label
          text-color="white"
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
              @click="removeTask(task.id)"
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
export default class TaskCard extends Vue {
  @Prop({ type: Object })
  task!: { [key: string]: any }

  private showModal () {
    this.$emit('show-modal')
  }

  private removeTask (): void {
    this.$emit('remove-task', this.task.id)
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

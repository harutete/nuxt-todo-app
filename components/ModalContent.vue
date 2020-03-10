<template>
  <v-overlay>
    <div class="d-flex flex-row-reverse">
      <v-btn
        icon
        @click="closeModal"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <v-container>
      <v-row justify="center">
        <v-card light>
          <v-card-title>
            {{ task.title }}
          </v-card-title>
          <v-divider />
          <v-card-text>
            {{ task.description }}
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </v-overlay>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import { SortedTaskDetail } from '~/types'

@Component
export default class ModalContent extends Vue {
  @Prop({ type: Object })
  task!: SortedTaskDetail

  private closeModal (): void {
    this.$emit('close-modal')
  }
}
</script>

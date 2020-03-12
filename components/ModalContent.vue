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
    <v-container class="modal-content-wrap">
      <v-row justify="center">
        <v-col cols="12">
          <v-card light>
            <v-card-title>
              {{ task.title }}
            </v-card-title>
            <v-divider />
            <v-card-text>
              {{ task.description }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-overlay>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import { TaskDetail } from '~/types'

@Component
export default class ModalContent extends Vue {
  @Prop({ type: Object })
  task!: TaskDetail

  private closeModal (): void {
    this.$emit('close-modal')
  }
}
</script>

<style scoped lang="scss">
.modal-content-wrap {
  max-width: 90%;
  min-width: 280px;
}
</style>

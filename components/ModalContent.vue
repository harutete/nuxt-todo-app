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
          <v-card-title>やることタイトル(必須)</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p>ここに備考が入る</p>
            <!-- TODO slotに置き換える -->
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </v-overlay>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class ModalContent extends Vue {
  private closeModal (): void {
    this.$emit('close-modal')
  }
}
</script>

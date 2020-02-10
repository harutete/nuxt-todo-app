<template>
  <!-- <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-card-title>やることタイトル(必須)</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p>ここに備考が入る</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row> -->
  <v-row justify="center">
    <v-dialog
      v-model="isDialogOpen"
      scrollable
      max-width="300px"
    >
      <v-card>
        <v-card-title>やることタイトル(必須)</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p>ここに備考が入る</p>
          <!-- TODO slotに置き換える -->
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="isDialogOpen = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'

@Component
export default class ModalContent extends Vue {
  @Prop({ type: Boolean, required: true, default: false })
  isDialogOpen = false
}
</script>

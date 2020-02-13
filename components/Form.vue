<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col
          align="center"
          cols="12"
          md="6"
        >
          <v-text-field
            name="title"
            label="Title"
          ></v-text-field>
          <v-textarea
            name="remarks"
            label="備考"
          ></v-textarea>
          <v-text-field
            name="tagText"
            label="Tag"
            v-model="tagText"
          ></v-text-field>
          <!-- TODO 動的にタグテキストが入るようにする -->
          <ColorChip
            :text="setTagText"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-date-picker v-model="picker"></v-date-picker>
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-select
                :items="hours"
                label="Hours"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-select
                :items="minutes"
                label="Minutes"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-btn
      :loading="loading"
      :disabled="loading"
      x-large
      color="blue-grey"
      dark
    >Submit</v-btn>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ColorChip from './ColorChip.vue'

@Component({
  components: {
    ColorChip
  }
})
export default class FormComponent extends Vue {
  picker = new Date().toISOString().substr(0, 10)
  hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  tagText = ''

  get setTagText (): string {
    return this.tagText === '' ? 'タグテキスト' : this.tagText
  }
}
</script>

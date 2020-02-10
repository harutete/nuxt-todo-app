<template>
  <v-form>
    <v-text-field
      name="title"
      label="Title"
    ></v-text-field>
    <v-textarea
      name="remarks"
      label="備考"
    ></v-textarea>
    <v-container fluid>
      <v-row>
        <v-col
          align="center"
          cols="12"
          md="6"
        >
          <v-date-picker v-model="picker"></v-date-picker>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
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

@Component
export default class FormComponent extends Vue {
  picker = new Date().toISOString().substr(0, 10)
  hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
}
</script>

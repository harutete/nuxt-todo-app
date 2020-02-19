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
            v-model="title"
          ></v-text-field>
          <v-textarea
            name="remarks"
            label="備考"
            v-model="description"
          ></v-textarea>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            name="tagText"
            label="Tag"
            v-model="tagText"
          ></v-text-field>
          <ColorChip
            :text="setTagText"
          />
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateFormatted"
                label="Date"
                hint="MM/DD/YYYY"
                persistent-hint
                prepend-icon="mdi-calendar-clock"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-select
                :items="hours"
                label="Hours"
                v-model="hour"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-select
                :items="minutes"
                label="Minutes"
                v-model="minute"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center">
      <v-btn
        x-large
        color="blue-grey"
        dark
        class="mx-auto"
        @click="addTask"
      >Submit</v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import ColorChip from './ColorChip.vue'

@Component({
  components: {
    ColorChip
  }
})
export default class FormComponent extends Vue {
  hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  tagText = ''
  menu = false
  date = new Date().toISOString().substr(0, 10)
  dateFormatted = this.formatDate(new Date().toISOString().substr(0, 10))
  title: string | null = null
  description: string | null = null
  tags: { [key: string]: any }[] | [] = []
  hour: string | null = null
  minute: string | null = null

  @Watch('date')
  watchDate (): void {
    this.dateFormatted = this.formatDate(this.date)
  }

  get setTagText (): string {
    return this.tagText === '' ? 'タグテキスト' : this.tagText
  }

  get computedDateFormatted (): string | null {
    return this.formatDate(this.date)
  }

  get setTaskItem (): { [key: string]: any } {
    const date = this.date.split('-')
    const year = parseInt(date[0], 10)
    const month = parseInt(date[1], 10)
    const day = parseInt(date[2], 10)
    const hour = this.hour !== null ? parseInt(this.hour, 10) : 0
    const minute = this.minute !== null ? parseInt(this.minute, 10) : 0

    return {
      id: 0,
      title: this.title,
      description: this.description,
      status: 'before',
      ended_date: new Date(year, month, day, hour, minute),
      tags: this.tags
    }
  }

  private formatDate (date: string): string | null {
    if (!date) {
      return null
    }
    const [year, month, day] = date.split('-')
    return `${month}/${day}/${year}`
  }

  private parseDate (date: string): string | null {
    if (!date) {
      return null
    }
    const [month, day, year] = date.split('/')
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }

  private addTask (): void {
    this.$emit('add-task', this.setTaskItem)
  }
}
</script>

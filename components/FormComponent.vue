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
            v-model="title"
            name="title"
            label="Title"
          />
          <v-textarea
            v-model="description"
            name="remarks"
            label="備考"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="tagText"
            name="tagText"
            label="Tag"
          />
          <ul
            v-show="tagList.length"
            class="list-tag"
          >
            <li
              v-for="(tag, index) in tagList"
              :key="`tag${index}`"
            >
              <v-chip
                :color="tag.color"
                :text-color="tag.color"
                outlined
                label
              >
                <v-icon left>
                  mdi-label
                </v-icon>
                {{ tag.name }}
              </v-chip>
            </li>
          </ul>
          <ColorChip
            :text="setTagText"
            @append-custom-tag="appendCustomTag($event)"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
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
              />
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu = false"
            />
          </v-menu>
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-select
                v-model="hour"
                :items="hours"
                label="Hours"
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-select
                v-model="minute"
                :items="minutes"
                label="Minutes"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center">
      <v-btn
        class="mx-auto"
        outlined
        color="blue-grey"
        @click="addTaskItem"
      >
        Submit
      </v-btn>
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
  hour: string | null = null
  minute: string | null = null
  tagList: [] | { [key: string]: any }[] = []

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
    const month = parseInt(date[1], 10) - 1 // Dateオブジェクトに変換される際に`monthIndex`として扱われるので1引く
    const day = parseInt(date[2], 10)
    const hour = this.hour !== null ? parseInt(this.hour, 10) : 0
    const minute = this.minute !== null ? parseInt(this.minute, 10) : 0

    console.log(new Date(year, month, day, hour, minute))
    return {
      id: 0,
      title: this.title,
      description: this.description,
      status: 'before',
      ended_date: new Date(year, month, day, hour, minute),
      tags: this.tagList
    }
  }

  private initTaskItem (): void {
    this.title = ''
    this.description = ''
    this.tagList = []
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

  private addTaskItem (): void {
    this.$emit('add-task-item', this.setTaskItem)

    this.initTaskItem()
  }

  private appendCustomTag (colorCode: string): void | boolean {
    if (this.tagText === '') {
      window.alert('テキストを入力してください')

      return false
    }

    this.tagList.push({
      name: this.tagText,
      color: colorCode
    })

    this.tagText = ''
  }
}
</script>

<style lang="scss" scoped>
.list-tag {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 10px 0 0 -10px;
  padding: 0;
  li {
    border-radius: 4px;
    color: #FFFFFF;
    font-size: 1rem;
    margin: 10px 0 0 10px;
  }
}
</style>

<template>
  <v-card>
    <h2 class="title font-weight-bold mx-3 pt-3">
      {{ panelTitle }}
    </h2>
    <v-container>
      <v-row>
        <template v-if="tasks.length">
          <v-col
            v-for="(task, index) in tasks"
            :key="`task${index}`"
            cols="12"
          >
            <ToDoCard
              :task="task"
              @show-modal="showModal"
            />
          </v-col>
        </template>
        <v-col
          v-else
          cols="12"
         >
          <p>作業前のタスクはありません</p>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ToDoCard from '~/components/ToDoCard.vue'

@Component({
  components: {
    ToDoCard
  }
})
export default class TaskCard extends Vue {
  @Prop({ type: String })
  panelTitle!: string

  @Prop({ type: Object })
  tasks!: { [key: string]: any }[]

  private showModal () {
    this.$emit('show-modal')
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

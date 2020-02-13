<template>
  <ul class="list-color-chip">
    <li
      v-for="(color, index) in colors"
      :key="`color${index}`"
    >
      <input :id="`color-${color.name}`" type="radio" name="color" hidden>
      <div class="color-chip" :style="`background: ${color.code}`">
        <label :for="`color-${color.name}`">
          {{ text }}
        </label>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class ColorChip extends Vue {
  @Prop({ type: String, required: true })
  text: string

  colors = [
    {
      name: 'red',
      code: '#dc143c'
    },
    {
      name: 'green',
      code: '#2e8b57'
    },
    {
      name: 'blue',
      code: '#191970'
    },
    {
      name: 'orange',
      code: '#ff8c00'
    },
    {
      name: 'pink',
      code: '#c71585'
    },
    {
      name: 'gray',
      code: '#666666'
    }
  ]
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

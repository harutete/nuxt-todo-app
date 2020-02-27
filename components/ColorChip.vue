<template>
  <ul class="list-color-chip">
    <li
      v-for="(color, index) in colors"
      :key="`color${index}`"
    >
      <input
        :id="`color-${color.name}`"
        type="radio"
        name="color"
        hidden
      >
      <div
        @click="appendCustomTag(color.code)"
        :style="`background: ${color.code}`"
        class="color-chip"
      >
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
  @Prop({ type: String })
  text!: string

  isSelect = false

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

  private sleep (ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  private async appendCustomTag (selectColor: string): Promise<void> {
    this.isSelect = true
    await this.sleep(500)
    this.isSelect = false

    this.$emit('append-custom-tag', selectColor)
  }
}
</script>

<style lang="scss" scoped>
.list-color-chip {
  list-style: none;
  margin-top: 10px;
  padding: 0;
  li {
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

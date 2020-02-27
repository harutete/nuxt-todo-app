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
        @click="appendCustomTag(color)"
        :style="`background: ${color.code}`"
        class="color-chip d-flex"
      >
        <label :for="`color-${color.name}`">
          {{ text }}
        </label>
        <v-spacer />
        <transition name="fade">
          <v-icon v-show="color.isSelect">
            mdi-check-circle-outline
          </v-icon>
        </transition>
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

  colors = [
    {
      name: 'red',
      code: '#dc143c',
      isSelect: false
    },
    {
      name: 'green',
      code: '#2e8b57',
      isSelect: false
    },
    {
      name: 'blue',
      code: '#191970',
      isSelect: false
    },
    {
      name: 'orange',
      code: '#ff8c00',
      isSelect: false
    },
    {
      name: 'pink',
      code: '#c71585',
      isSelect: false
    },
    {
      name: 'gray',
      code: '#666666',
      isSelect: false
    }
  ]

  private sleep (ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  private async appendCustomTag (colorDetail: { [key: string]: string | boolean }): Promise<void> {
    colorDetail.isSelect = true
    await this.sleep(500)
    colorDetail.isSelect = false

    this.$emit('append-custom-tag', colorDetail.code)
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
  &__inner {
    cursor: pointer;
    border-radius: 5px;
    color: #FFFFFF;
    padding: 5px 10px;
  }
}
.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity .5s;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>

// Copyright 2021 Sony Group Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// @ts-nocheck

import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart,
  Decimation,
  DoughnutController,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  LogarithmicScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip
} from 'chart.js'

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
)

// eslint-disable-next-line
export function generateChart (chartId: string, chartType: string): any {
  return {
    // eslint-disable-next-line
    render: function (createElement: any) {
      return createElement(
        'div',
        {
          style: this.styles,
          class: this.cssClasses
        },
        [
          createElement('canvas', {
            attrs: {
              id: this.chartId,
              width: this.width,
              height: this.height
            },
            ref: 'canvas'
          })
        ]
      )
    },

    props: {
      chartId: {
        default: chartId,
        type: String
      },
      width: {
        default: 400,
        type: Number
      },
      height: {
        default: 400,
        type: Number
      },
      cssClasses: {
        type: String,
        default: ''
      },
      styles: {
        type: Object
      },
      plugins: {
        type: Array,
        default (): [] {
          return []
        }
      }
    },

    // eslint-disable-next-line
    data () {
      return {
        _chart: null,
        _plugins: this.plugins
      }
    },

    methods: {
      addPlugin (plugin): void {
        this.$data._plugins.push(plugin)
      },
      // eslint-disable-next-line
      generateLegend () {
        if (this.$data._chart) {
          return this.$data._chart.generateLegend()
        }
      },
      renderChart (data, options): void {
        if (this.$data._chart) this.$data._chart.destroy()
        if (!this.$refs.canvas) {
          throw new Error(
            'Please remove the <template></template> tags from your chart' +
            ' component. See' +
            ' https://vue-chartjs.org/guide/#vue-single-file-components'
          )
        }
        this.$data._chart = new Chart(this.$refs.canvas.getContext('2d'), {
          type: chartType,
          data: data,
          options: options,
          plugins: this.$data._plugins
        })
      }
    },
    beforeDestroy (): void {
      if (this.$data._chart) {
        this.$data._chart.destroy()
      }
    }
  }
}

export const Bar = generateChart('bar-chart', 'bar')
export const HorizontalBar = generateChart(
  'horizontalbar-chart',
  'horizontalBar'
)
export const Doughnut = generateChart('doughnut-chart', 'doughnut')
export const Line = generateChart('line-chart', 'line')
export const Pie = generateChart('pie-chart', 'pie')
export const PolarArea = generateChart('polar-chart', 'polarArea')
export const Radar = generateChart('radar-chart', 'radar')
export const Bubble = generateChart('bubble-chart', 'bubble')
export const Scatter = generateChart('scatter-chart', 'scatter')

export default {
  Bar,
  HorizontalBar,
  Doughnut,
  Line,
  Pie,
  PolarArea,
  Radar,
  Bubble,
  Scatter
}

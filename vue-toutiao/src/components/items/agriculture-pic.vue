<template>
    <div class="item agriculture-pic">
        <h3>
          农业，查猪价
        </h3>
        <echarts :options="chartOptions"/>
        <div>
          <label> 输入地区：</label>
          <input type="text" v-on:input="onInput" />
          <span>地区为： {{ area }}</span>
          <ol>
            <li v-for="(price, idx) in priceList" v-bind:key="idx">
              {{ price.price | currency }}
            </li>
          </ol>
        </div>
    </div>
</template>
<script>

export default {
    name: 'agrpic',
    props: {
      title: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        area: '',
        priceList: [],
        debounce: this.createDebounce(3000)
      }
    },
    created () {
      this.$watch('area', area => {
        this.debounce(this.queryPrice)
      })
    },
    filters: {
      currency (val) {
        return `$${val}`
      }
    },
    computed: {
      chartOptions() {
        return  {
          tooltip: {},
          legend: {
            data:['价格']
          },
          xAxis: {
            data: ['猪肉价格']
          },
          yAxis: {},
          series: [{
            name: '价格',
            type: 'bar',
            data: this.priceList.map(info => info.price)
          }]
        }
      }
    },
    methods: {
      onInput (evt) {
        this.area = evt.target.value
      },
      queryPrice () {
          fetch('/price')
            .then(res => res.json())
            .then(priceRes => {
              this.priceList = priceRes.infos
            })
      }
    }
}
</script>
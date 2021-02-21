<template>
  <article>
    <keep-alive>
      <component
          v-bind:is="page"
          v-bind:tabs="tabs"
          v-bind:curTab.sync="curTab"
          v-on:switchTab="switchTab"
          v-on:more="showMoreTab"
      >
        <template v-slot:content="{list}">
          <component
              v-for="item in list"
              v-bind:key="item.name"
              v-bind:is="item.type | convertTypeToModuleName"
              v-bind="item.data"
          />
        </template>
      </component>
    </keep-alive>
  </article>
</template>
<script>
/**
 * Constant
 */
import { TABS } from '../config'

/**
 * Subcomponents
 */
import * as Pics from '../components/items/index'
import Tab from '../components/tab.vue'
import Loading from '../components/loading.vue'
import Setting from '../components/setting.vue'

/**
 * Data tranform utils
 */
const convertModule2Obj = components => {
  let result = {}
  for (let property in components) {
    result[property] = components[property]
  }
  return result
}

const constructTabs = tabs => {
  let result = {};
  for (let name in tabs) {
    result[name] = {
      label: tabs[name],
      index: 0,
      list: [],
      page: 'tab'
    }
  }
  return result;
}

export default {
  name: 'main-app',
  data () {
    return {
      list: [],
      page: 'tab',
      curTab: 'agriculture',
      tabs: constructTabs(TABS)
    }
  },
  components: {
    ...convertModule2Obj(Pics),
    Tab,
    Loading, 
    Setting
  },
  methods: {
    getListData(tabName) {
      const tab = this.tabs[this.curTab]

      return fetch(
        `/list?tab=${tabName}&index=${tab.index}`
      )
        .then(res => res.json())
        .then(res => res.data)
    },

    onReachBottom() {
      this.getListData(this.curTab)
        .then(listData => {
          this.setTabsData(this.curTab, {
            list: this.tabs[this.curTab].list.concat(listData)
          })
        })
    },

    setTabsData(tabName, data) {
      this.$set(this.tabs, tabName, {
          ...this.tabs[tabName],
          ...data
      })
    },

    switchTab(tabName) {
        this.curTab = tabName;
        if (!this.tabs[tabName].list.length) {
          this.getListData(tabName)
            .then(listData => {
              this.setTabsData(this.curTab, {
                list: listData
              })
            })
        }
    },

    showMoreTab(event) {
      if (event === 'hide') {
        this.page = 'tab'
      } else {
        this.page = 'setting'
      }
    }
  },
  filters: {
    convertTypeToModuleName: type => type
      .replace(/^\w/g, w => w.toUpperCase())
  },
 
  watch: {
    curTab (tabName) {
      this.switchTab(tabName)
    }
  },

  created() {
    this.getListData(this.curTab)
      .then(listData => {
        this.setTabsData(this.curTab, {
          list: listData
        })
      })
    
  }
}
</script>
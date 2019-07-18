<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    max-width: 900px;
    margin-top: 60px;
    margin-left: auto;
    margin-right: auto;
  }
</style>

<template>
  <div id="app">
    <div v-if="state.initialLoading">
      Загрузка
    </div>

    <div v-else-if="state.searchActive">
      Идет поиск
    </div>

    <template v-else>
      <search-form
        :state="state"
        @search="onSearch"
        style="margin-bottom: 30px"
      />

      <search-result
        v-if="state.searchResult"
        :searchResult="state.searchResult"
      />
    </template>
  </div>
</template>

<script>
  import ApiService from './services/api'
  import SearchForm from './components/search-form/SearchForm'
  import SearchResult from './components/search-result/SearchResult'

  const service = new ApiService()

  export default {
    components: {
      SearchForm,
      SearchResult
    },

    data: () => ({
      state: {
        initialLoading: true,
        login: null,
        searchConfig: null,
        searchForm: {
          departureCode: 'MOW',
          arrivalCode: 'KGD',
          date: '2019-08-24',
          class: 'E'
        },
        searchActive: false,
        searchResult: null
      },
    }),

    async created() {
      this.timeout = null

      this.state.login = await service.login()
      this.state.searchConfig = await service.getSearchConfig(this.state)
      this.state.initialLoading = false
    },

    beforeDestroy() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
    },

    methods: {
      async onSearch() {
        this.state.searchActive = true
        const requestId = await service.search(this.state)
        this.state.searchResult = await service.checkOffer(this.state, requestId)
        this.state.searchActive = false
      }
    }
  }
</script>
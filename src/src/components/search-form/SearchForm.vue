<template>
  <div>
    <form @submit.prevent="onSearch">
      <input type="text" v-model="form.departureCode" placeholder="IATA код аэропорта вылета" required>
      <input type="text" v-model="form.arrivalCode" placeholder="IATA код аэропорта прилета" required>
      <input type="date" v-model="form.date" placeholder="Дата вылета" required>

      <select v-model="form.class" required>
        <option v-for="klass, key in classes" :value="key">
          {{ klass }}
        </option>
      </select>

      <button>Искать</button>
    </form>
  </div>
</template>

<script>
  export default {
    props: [
      'state'
    ],

    computed: {
      classes() {
        return this.state.searchConfig.classes
      },

      form() {
        return this.state.searchForm
      }
    },

    methods: {
      onSearch() {
        this.$emit('search')
      }
    }
  }
</script>
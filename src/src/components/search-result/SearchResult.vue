<template>
  <div>
    <template v-if="!carriers.length">
      <p>
        <strong>Предложений нет</strong>
      </p>
    </template>

    <template v-else>
      <div v-for="carrier in carriers" style="margin-bottom: 20px">
        <a href="javascript:void(0)" @click="toggleCarrier(carrier)">
          <img
            :src="carrier.carrier_logo"
            :alt="carrier.carrier_name"
            style="width: 100px; float: left; margin-right: 20px"
          >
          <p>
            {{ carrier.carrier_name }}
          </p>
        </a>

        <div v-if="openedCarrier === carrier">
          <search-result-item
            v-for="offer in openedCarrierOffers"
            :offer="offer"
            :key="offer.segment_id"
            style="margin-bottom: 30px"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import SearchResultItem from './SearchResultItem'

  export default {
    props: [
      'searchResult'
    ],

    components: {
      SearchResultItem
    },

    computed: {
      carriers() {
        return this.searchResult.offers
      },

      openedCarrierOffers() {
        if (!this.openedCarrier && !this.openedCarrier.offers.length) {
          return []
        }

        return this.openedCarrier.offers[0].segments
      }
    },

    data: () => ({
      openedCarrier: null
    }),

    methods: {
      toggleCarrier(carrier) {
        if (this.openedCarrier && this.openedCarrier === carrier) {
          this.openedCarrier = null
        } else {
          this.openedCarrier = carrier
        }
      }
    }
  }
</script>
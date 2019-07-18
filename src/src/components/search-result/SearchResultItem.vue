<template>
  <div>
    <p>
      Аэропорт вылета: <strong>{{ offer.departure_airport }}</strong>
      Аэропорт прилета: <strong>{{ offer.arrival_airport }}</strong>
    </p>
    <p>
      Дата вылета: {{offer.departure_date}} {{ offer.departure_time }}
      Дата прилета: {{offer.arrival_date}} {{ offer.arrival_time }}
    </p>
    <p>
      Цена: {{ offer.price }} Р.
    </p>
    <p>
      Время в пути {{ offer.duration_formated }}
    </p>
  </div>
</template>

<script>
  export default {
    props: [
      'offer'
    ]
  }
</script>
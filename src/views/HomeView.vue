<template>
  <header>
    <SearchComponent v-model="location" @update:filters="handleUpdateFilters" :filters="filters" />
  </header>
  <main>
    <aside class="filter-section">
      <FiltersSection @update:filters="handleUpdateFilters" :filters="filters" />
    </aside>
    <ul v-if="Boolean(filteredItems.length)">
      <li v-for="(item, index) in filteredItems" :key="index">
        <CardComponent
          :id="item.Id"
          :img="item.ThumbnailURL"
          :title="item.Title"
          :location="item.Location"
          :details="`${item.Bedrooms} Bedrooms | ${item.Bathrooms} Bathrooms | ${item.Parking} Parking`"
          :price="item['Sale Price']"
        />
      </li>
    </ul>
    <div class="noItems" v-if="!Boolean(filteredItems.length)">
      <img src="no-results.png" alt="No Results" />
      <h1>Sorry, no result found {{ ':(' }}</h1>
      <p>
        Sorry, but we couldn't find any items that match your current filters. Please consider
        adjusting your filter criteria and searching again.
      </p>
    </div>
  </main>
</template>

<script setup>
import CardComponent from '../components/CardComponent.vue'
import FiltersSection from '../sections/FiltersSection.vue'
import SearchComponent from '../components/SearchComponent.vue'

import propertyList from '../models/propertyList.json'

import { computed, ref } from 'vue'

const location = ref('')
const filters = ref({
  bathrooms: [],
  bedrooms: [],
  parking: [],
  priceRange: [0, 1000000]
})

const filteredItems = computed(() =>
  propertyList.filter((item) => {
    const itemLocation = item.Location.toLowerCase()
    const locationFilter = itemLocation.startsWith(location.value.toLowerCase())

    const { bedrooms, bathrooms, parking, priceRange } = filters.value

    const priceFilter = item['Sale Price'] >= priceRange[0] && item['Sale Price'] <= priceRange[1]
    let bedFilter = bedrooms.length ? bedrooms.includes(item.Bedrooms) : true
    let bathFilter = bathrooms.length ? bathrooms.includes(item.Bathrooms) : true
    let parkingFilter = parking.length ? parking.includes(item.Parking) : true

    if (bedrooms.includes(4)) {
      bedFilter = bedFilter || item.Bedrooms >= 4
    }

    if (bathrooms.includes(4)) {
      bathFilter = bathFilter || item.Bathrooms >= 4
    }

    if (parking.includes(4)) {
      parkingFilter = parkingFilter || item.Parking >= 4
    }

    return locationFilter && bedFilter && bathFilter && parkingFilter && priceFilter
  })
)

const handleUpdateFilters = (val) => {
  filters.value = val
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: center;
  padding: 2rem;
  width: 100%;
  max-width: 1024px;
}

main {
  display: flex;
  justify-content: center;
  padding: 2rem;
  width: 100%;

  aside {
    display: none;
    padding-right: 2rem;
    border-right: 1px solid #ddd;

    @media (min-width: 768px) {
      display: flex;
      margin-right: 4rem;
    }
  }
}

ul {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 2.4rem;

  li {
    list-style: none;
  }
}

.noItems {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  text-align: center;
  gap: 1.6rem;

  img {
    width: 20rem;
  }

  p {
    max-width: 75rem;
  }
}
</style>

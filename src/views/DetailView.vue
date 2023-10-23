<template>
  <header>
    <div class="title">
      <h1>{{ item.Title }}</h1>
      <span>{{ item.Location }}</span>
    </div>

    <div class="price">
      <h1>{{ format(item['Sale Price']) }}</h1>
      <span
        >Date Listed:
        {{
          new Date(item.DateListed).toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        }}</span
      >
    </div>

    <button>Save Property</button>
  </header>
  <main>
    <div class="content">
      <img :src="item.PictureURL" :alt="item.Title" />

      <ul>
        <li v-for="{ name, value } in infos" :key="name">
          <h1>{{ value }}</h1>
          <span>{{ name }}</span>
        </li>
      </ul>

      <p>{{ item.Description }}</p>
    </div>

    <ContactSection />
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

import ContactSection from '../sections/ContactSection.vue'
import { format } from '../utils/currencyFormatter'

import propertyList from '../models/propertyList.json'

const route = useRoute()

const item = ref(propertyList.find((item) => item.Id == route.params.id))

const infos = ref([
  { name: 'bed', value: item.value.Bedrooms },
  { name: 'bath', value: item.value.Bathrooms },
  { name: 'parking', value: item.value.Parking },
  { name: 'sqft', value: item.value.Sqft },
  { name: 'year built', value: item.value.YearBuilt }
])
</script>

<style scoped lang="scss">
button {
  padding: 0.8rem 3.2rem;
  border: none;
  background-color: black;
  color: white;

  border-radius: 0.8rem;
}

header {
  padding: 1.6rem 0.8rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1024px;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.6rem;

  .title {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    justify-content: center;

    h1 {
      max-width: 40rem;
    }
  }

  .price {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    align-items: flex-end;
    justify-content: center;
  }
}

main {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 0.8rem;
  max-width: 1024px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-width: 76.8rem;

  p {
    margin-top: 1.6rem;
    line-height: 2.8rem;
    font-size: 1.8rem;
  }

  img {
    width: 100%;
    border-radius: 0.8rem;
    object-fit: cover;

    @media (min-width: 768px) {
      max-height: 40rem;
    }
  }

  ul {
    background-color: #eee;
    padding: 0.8rem 1.6rem;
    display: flex;
    width: 100%;
    border-radius: 0.8rem;
    justify-content: space-between;

    list-style: none;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      font-size: 1rem;

      @media (min-width: 425px) {
        font-size: 1.6rem;
      }
    }

    span {
      text-transform: uppercase;
      color: #666;
    }
  }
}
</style>

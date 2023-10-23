<template>
  <div class="container">
    <img :src="img" :alt="alt" />
    <div class="content">
      <div class="details">
        <h1>{{ title }}</h1>
        <p>{{ location }}</p>
        <span>{{ details }}</span>
      </div>
      <footer>
        <h2>{{ format(price) }}</h2>
        <button type="button" @click="handleClick">View Details</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { format } from '../utils/currencyFormatter'

const router = useRouter()

const { price, id } = defineProps(['id', 'img', 'alt', 'title', 'location', 'details', 'price'])

const handleClick = () => {
  router.push(`/details/${id}`)
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: white;
  box-shadow: 0.4rem 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
  border-radius: 0.8rem;

  max-height: 35rem;
  overflow: hidden;

  @media (min-width: 1024px) {
    max-width: 24rem;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.6rem;

    padding: 0.8rem;
  }
}

h1 {
  font-size: 2.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  text-transform: capitalize;
}

h2 {
  font-size: 2.4rem;
}

span {
  color: #666;
  font-size: 1.4rem;
}

img {
  object-fit: cover;
  height: 15rem;
  width: 100%;
}

button {
  padding: 0.8rem;
  margin-top: 0.8rem;
  display: flex;
  width: 100%;
  border: none;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;

  background-color: black;

  font-weight: bold;
  color: white;
}
</style>

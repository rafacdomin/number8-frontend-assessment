<template>
  <form @submit.prevent="handleSubmit" class="contact">
    <h1>Contact Agent</h1>
    <fieldset>
      <input v-model="name" type="text" placeholder="Full Name *" />
      <small v-show="validation.name">{{ validation.name }}</small>
    </fieldset>
    <fieldset>
      <input v-model="email" type="email" placeholder="Email *" />
      <small v-show="validation.email">{{ validation.email }}</small>
    </fieldset>
    <fieldset>
      <input
        type="text"
        placeholder="Phone Number *"
        v-maska="phone"
        data-maska="+1 ### ###-##-##"
      />
      <small v-show="validation.phone">{{ validation.phone }}</small>
    </fieldset>
    <fieldset>
      <textarea v-model="comments" placeholder="Comments *" rows="4" cols="50"></textarea>
      <small v-show="validation.comments">{{ validation.comments }}</small>
    </fieldset>
    <fieldset>
      <button type="submit">Contact Now</button>
      <small class="success" v-show="successMessage">{{ successMessage }}</small>
    </fieldset>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { vMaska } from 'maska'

const name = ref('')
const email = ref('')
const comments = ref('')
const phone = reactive({})

const validation = ref({
  name: false,
  email: false,
  phone: false,
  comments: false
})

const successMessage = ref(false)

const handleSubmit = () => {
  validation.value = {
    name: false,
    email: false,
    phone: false,
    comments: false
  }

  successMessage.value = false

  if (!name.value.match(/^([^ ]+[\s]+[^ ]+)$/)) {
    validation.value.name = 'Your full name must contain at least one first name and one last name'
  }

  if (!name.value.match(/^[a-zA-Z ]+$/)) {
    validation.value.name = 'Your full name must contain only letters and spaces'
  }

  if (!email.value.length) {
    validation.value.email = 'This field is required'
  }

  if (!phone.unmasked || !phone.unmasked.match(/^\d{10,}$/)) {
    validation.value.phone = 'Your phone number must be at least 10 digits long'
  }

  if (!comments.value.match(/^.{1,}$/)) {
    validation.value.comments = 'This field is required'
  }

  if (
    !validation.value.name &&
    !validation.value.email &&
    !validation.value.phone &&
    !validation.value.comments
  ) {
    successMessage.value = 'Message sent successfully!'
  }
}
</script>

<style scoped lang="scss">
button {
  padding: 0.8rem 3.2rem;
  border: none;
  background-color: black;
  color: white;

  border-radius: 0.8rem;
}
.contact {
  background-color: #eee;
  padding: 2.4rem 1.6rem;
  border-radius: 0.8rem;
  width: 100%;
  height: fit-content;
  min-width: 35rem;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;

  input,
  textarea {
    width: 100%;
    border: none;
    padding: 0.8rem;
    border-radius: 0.8rem;

    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
  }

  fieldset {
    border: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    button {
      width: 100%;
    }
  }

  small {
    color: red;
  }

  .success {
    color: green;
    align-self: center;
  }
}
</style>

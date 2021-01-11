<template>
  <div class="404 p-5 m-5 has-text-centered">
    <p>Oops..!!, the page you are looking for is not found</p>
    <p>
      Please <router-link :to="{ name: 'home' }">click here</router-link> to
      return to home page
    </p>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

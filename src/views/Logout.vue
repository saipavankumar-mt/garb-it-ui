<template>
  <div class="unauthorized p-5 m-5 has-text-centered" v-if="!isLogout">
    <p>This page needs <b>Super Admin</b> rights,</p>
    <p>
      Please
      <a role="button" class="is-primary" @click.prevent="logout()"
        >click here</a
      >
      to login with Super Admin credentials ,
    </p>
    <span>Or</span>
    <p>return back to <router-link to="/">home page</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'Logout',
  props: {
    isLogout: {
      type: Boolean,
      default: false
    }
  },
  created () {
    if (this.isLogout) { this.logout() }
  },
  methods: {
    logout () {
      this.$store.dispatch('user/DESTROY_USER')
      this.$router.push({ name: 'login' })
      this.$router.go()
    }
  }
}
</script>

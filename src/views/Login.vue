<template>
  <section class="section hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-third">
            <div class="card">
              <div class="card-content p-4">
                <h1
                  class="is-size-3 has-text-centered has-text-weight-semibold has-text-primary"
                >
                  GarbIt
                </h1>
                <hr class="mt-3 mb-3" />
                <b-field label="Login to GarbIt Admin Dashboard" />
                <b-field
                  v-if="errorObj.hasError"
                  type="is-danger"
                  :message="errorObj.errors"
                />
                <form @submit.prevent="login">
                  <b-field
                    label="Username"
                    custom-class="is-small"
                    :type="errorObj.hasError ? 'is-danger' : ''"
                  >
                    <b-input
                      size="is-small"
                      type="text"
                      ref="username"
                      placeholder="Username"
                      name="username"
                      v-model="userInfo.username"
                      required
                    />
                  </b-field>
                  <b-field
                    label="Password"
                    custom-class="is-small"
                    :type="errorObj.hasError ? 'is-danger' : ''"
                  >
                    <b-input
                      size="is-small"
                      type="password"
                      placeholder="Password"
                      name="password"
                      v-model="userInfo.password"
                      required
                      password-reveal
                    />
                  </b-field>
                  <b-field
                    label="Role"
                    custom-class="is-small"
                    :type="errorObj.hasError ? 'is-danger' : ''"
                    grouped
                    group-multiline
                  >
                    <div v-for="(v,k) in userRoles" class="control" :key="k">
                      <b-radio
                        size="is-small"
                        v-model="userInfo.role"
                        :native-value="v"
                      >
                        {{ v }}
                      </b-radio>
                    </div>
                  </b-field>
                  <router-link to="/" :class="{'is-size-7': !errorObj.hasError}"
                    >Forgot password ?</router-link
                  >
                  <hr class="mt-3 mb-3" />
                  <b-field class="has-text-centered">
                    <b-button
                      native-type="submit"
                      type="is-primary"
                      expanded
                      :disabled="isLoading"
                    >
                      {{ isLoading ? 'Logging in...' : 'Login' }}
                    </b-button>
                  </b-field>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      userInfo: {
        username: '',
        password: '',
        role: null
      },
      errorObj: {
        hasError: false,
        errors: []
      },
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('user', ['userRoles'])
  },
  mounted () {
    this.$refs.username.focus()
  },
  methods: {
    async login () {
      //
      this.isLoading = true
      const result = await this.$store.dispatch('user/userLogin', this.userInfo)
      //
      if (result && result.errors) {
        this.isLoading = false
        this.errorObj.hasError = true
        this.errorObj.errors.push(...result.errors)
      } else {
        this.isLoading = false
        this.$router.push('/')
      }
    }
  }
}
</script>

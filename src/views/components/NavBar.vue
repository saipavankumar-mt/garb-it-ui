<template>
  <nav v-show="isNavBarVisible" id="navbar-main" class="navbar is-fixed-top">
    <div class="navbar-brand">
      <a
        class="navbar-item is-hidden-desktop"
        @click.prevent="menuToggleMobile"
      >
        <b-icon :icon="menuToggleMobileIcon" />
      </a>
      <div class="navbar-item has-control">
        <div class="control">
          <!-- <input class="input" placeholder="Search everywhere..." /> -->
        </div>
      </div>
    </div>
    <div class="navbar-brand is-right">
      <div class="navbar-item navbar-item-menu-toggle is-hidden-desktop">
        <a @click.prevent="menuNavBarToggle">
          <b-icon :icon="menuNavBarToggleIcon" custom-size="default" />
        </a>
      </div>
    </div>
    <div
      class="navbar-menu fadeIn animated faster"
      :class="{'is-active':isMenuNavBarActive}"
    >
      <div class="navbar-end">
        <div class="navbar-item">
          <span class="tag is-light">
            Location : {{userAddress.location || 'N/A'}}
          </span>
        </div>
        <div class="navbar-item">
          <span class="tag is-light">
            Muncipality : {{userAddress.municipality || 'N/A'}}
          </span>
        </div>
        <nav-bar-menu class="has-user-avatar">
          <b-icon class="is-user-avatar" icon="account" />
          <div class="is-user-name">
            <span>{{ username }}</span>
          </div>

          <div slot="dropdown" class="navbar-dropdown">
            <!-- <router-link
              to="/profile"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon icon="account" custom-size="default"></b-icon>
              <span>My Profile</span>
            </router-link> -->
            <!-- <a class="navbar-item">
              <b-icon icon="settings" custom-size="default"></b-icon>
              <span>Settings</span>
            </a> -->
            <!-- <hr class="navbar-divider" /> -->
            <a class="navbar-item" @click.prevent="logout">
              <b-icon icon="logout" custom-size="default"></b-icon>
              <span>Log Out</span>
            </a>
          </div>
        </nav-bar-menu>
      </div>
    </div>
  </nav>
</template>

<script>
import NavBarMenu from '@/views/components/NavBarMenu'
import { mapState } from 'vuex'
import { SESSION_EXP_MSG } from '@/constants'

export default {
  name: 'NavBar',
  components: {
    NavBarMenu
  },
  data () {
    return {
      isMenuNavBarActive: false
    }
  },
  computed: {
    menuNavBarToggleIcon () {
      return (this.isMenuNavBarActive) ? 'close' : 'dots-vertical'
    },
    menuToggleMobileIcon () {
      return this.isAsideMobileExpanded ? 'backburger' : 'forwardburger'
    },
    ...mapState('user', {
      username: state => state.username,
      userAddress: state => state.userAddress
    }),
    ...mapState([
      'isNavBarVisible',
      'isAsideMobileExpanded'
    ])
  },
  mounted () {
    this.$router.afterEach(() => {
      this.isMenuNavBarActive = false
    })
    this.setSessionTTL()
  },
  methods: {
    menuToggleMobile () {
      this.$store.commit('ASIDE_MOBILE_STATE_TOGGLE')
    },
    menuNavBarToggle () {
      this.isMenuNavBarActive = (!this.isMenuNavBarActive)
    },
    logout () {
      this.$router.push({ name: 'logout', params: { isLogout: true } })
    },
    setSessionTTL () {
      const expiry = window.localStorage.getItem('expiration')
      const timeDiff = expiry * 1 - 50 - Math.floor(new Date().getTime())
      setTimeout(() => {
        if (expiry * 1 - 10 < Math.floor(new Date().getTime())) {
          alert(SESSION_EXP_MSG)
          this.logout()
        }
      }, timeDiff)
    }
  }
}
</script>

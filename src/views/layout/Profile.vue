<template>
  <section class="section">
    <title-bar>
      Profile
      <router-link to="/" class="button is-primary" slot="button">
        Dashboard
      </router-link>
    </title-bar>

    <tiles>
      <profile-update-form class="tile is-child"/>
      <card-component title="Profile" icon="account" class="tile is-child">
        <div class="image is-user-avatar has-max-width is-aligned-center">
          <img :src="userAvatar" :alt="username"/>
        </div>
        <hr>
        <b-field label="Name">
          <b-input :value="username" custom-class="is-static" readonly/>
        </b-field>
        <b-field label="E-mail">
          <b-input :value="userEmail" custom-class="is-static" readonly/>
        </b-field>
      </card-component>
    </tiles>

    <password-update-form/>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '@/views/components/CardComponent'
import TitleBar from '@/views/components/TitleBar'
import ProfileUpdateForm from '@/views/components/ProfileUpdateForm'
import PasswordUpdateForm from '@/views/components/PasswordUpdateForm'
import Tiles from '@/views/components/Tiles'

export default {
  name: 'Profile',
  components: { Tiles, PasswordUpdateForm, ProfileUpdateForm, TitleBar, CardComponent },
  computed: {
    ...mapState([
      'userAvatar',
      'username',
      'userEmail'
    ])
  }
}
</script>

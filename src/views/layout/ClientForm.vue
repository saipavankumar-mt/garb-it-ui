<template>
  <section class="section">
    <b-modal
      v-if="!clientId"
      :active.sync="modalActive"
      has-modal-card
      :can-cancel="true"
      :on-cancel="goBack"
    >
      <div class="modal-card">
        <section class="modal-card-body">
          <p class="modal-card-title">
            Successfully generated QR code for client Id:
            <strong>{{clientObj.id}}</strong>
          </p>
          <hr />
          <qr-generator :value="clientObj.qrCodeId" level="H" :size="200" />
        </section>
      </div>
    </b-modal>
    <title-bar>
      {{ clientId ? 'Edit Client' : 'Create Client' }}
      <router-link to="/clients" class="button is-small is-dark" slot="button">
        back
      </router-link>
    </title-bar>
    <tiles :cols="clientId ? ['is-7', 'is-5'] : ['is-12']">
      <card-component
        :title="clientId ? 'Edit client details' : 'Fill client details'"
        icon="ballot"
        class="tile is-child"
      >
        <form @submit.prevent="submit">
          <div class="columns">
            <b-field
              class="column is-4"
              label="Personal Information"
              custom-class="has-text-centered"
            />
            <div class="column is-8">
              <b-field
                v-if="clientId"
                label="Client ID"
                custom-class="is-small"
                expanded
              >
                <b-input v-model="clientForm.id" :disabled="true" />
              </b-field>
              <b-field label="Full name" custom-class="is-small">
                <b-input
                  v-model="clientForm.name"
                  placeholder="Enter full name..."
                  name="name"
                  required
                />
              </b-field>

              <b-field grouped>
                <b-field label="Gender" custom-class="is-small" expanded>
                  <b-select
                    v-model="clientForm.gender"
                    placeholder="Select gender..."
                    expanded
                    name="gender"
                    required
                  >
                    <option v-for="(v,k) in gender" :value="v" :key="k">
                      {{v}}
                    </option>
                  </b-select>
                </b-field>
                <b-field
                  label="Marital Status"
                  custom-class="is-small"
                  expanded
                >
                  <b-select
                    v-model="clientForm.married"
                    placeholder="Click to elect..."
                    expanded
                    name="married"
                    required
                  >
                    <option v-for="(v,k) in maritalStatus" :value="v" :key="k">
                      {{v}}
                    </option>
                  </b-select>
                </b-field>
              </b-field>
              <b-field label="DOB" custom-class="is-small">
                <datepicker
                  v-model="clientForm.dateOfBirth"
                  placeholder="Click to select..."
                  icon="calendar-today"
                  position="is-bottom-left"
                  :years-range="[-100, 100]"
                  trap-focus
                  name="dateOfBirth"
                  required
                >
                </datepicker>
              </b-field>
              <b-field label="Mobile Number" custom-class="is-small" expanded>
                <p class="control">
                  <a class="button is-static">+91</a>
                </p>
                <b-input
                  v-model="clientForm.phoneNumber"
                  placeholder="Enter mobile number..."
                  name="phoneNumber"
                  required
                />
              </b-field>
            </div>
          </div>
          <hr class="mb-4 mt-4" />
          <div class="columns">
            <b-field
              class="column is-4"
              label="Contact Information"
              custom-class="has-text-centered"
            />
            <div class="column is-8">
              <b-field label="Address" custom-class="is-small">
                <b-input
                  v-model="clientForm.address"
                  placeholder="Enter address..."
                  name="address"
                  required
                  maxlength="200"
                  type="textarea"
                />
              </b-field>
              <b-field label="Location" custom-class="is-small">
                <b-input
                  v-model="clientForm.location"
                  placeholder="Enter location..."
                  name="location"
                  required
                />
              </b-field>
              <b-field label="Municipality" custom-class="is-small">
                <b-input
                  v-model="clientForm.municipality"
                  placeholder="Enter municipality..."
                  name="municipality"
                  required
                />
              </b-field>
              <b-field grouped>
                <b-field label="City" custom-class="is-small" expanded>
                  <b-input
                    v-model="clientForm.city"
                    placeholder="Enter city..."
                    name="city"
                    required
                  />
                </b-field>
                <b-field label="State" custom-class="is-small" expanded>
                  <b-input
                    v-model="clientForm.state"
                    placeholder="Enter state..."
                    name="state"
                    required
                  />
                </b-field>
                <b-field label="Country" custom-class="is-small" expanded>
                  <b-input
                    v-model="clientForm.country"
                    placeholder="Enter country..."
                    name="country"
                    required
                  />
                </b-field>
              </b-field>
            </div>
          </div>
          <hr class="mb-4 mt-4" />
          <div class="buttons is-centered">
            <button
              v-if="clientId"
              type="submit"
              class="button is-primary"
              :class="{'is-loading':isLoading}"
            >
              update client
            </button>
            <button
              v-else
              type="submit"
              class="button is-primary"
              :class="{'is-loading':isLoading}"
            >
              create client
            </button>
          </div>
        </form>
      </card-component>
      <card-component
        v-if="clientId"
        title="QR code of the client"
        class="tile is-child"
        :style="{height: 'max-content'}"
      >
        <qr-generator :value="clientForm.qrCodeId" level="H" :size="200" />
      </card-component>
    </tiles>
  </section>
</template>

<script>
import Datepicker from '@/views/components/Datepicker'
import TitleBar from '@/views/components/TitleBar'
import CardComponent from '@/views/components/CardComponent'
import Tiles from '@/views/components/Tiles'
import QrGenerator from '@/views/components/qr/QrGenerator'

import _ from 'lodash'
import { objectTransform } from '@/utils/helper'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'ClientForm',
  components: { Datepicker, CardComponent, Tiles, QrGenerator, TitleBar },
  props: {
    clientId: { type: String, default: null }
  },
  data () {
    return {
      modalActive: false,
      isLoading: false,
      clientForm: {},
      createClientKeys: [
        'name',
        'phoneNumber',
        'gender',
        'dateOfBirth',
        'married',
        'address',
        'location',
        'municipality',
        'city',
        'state',
        'country'
      ]
    }
  },
  computed: {
    ...mapGetters(['gender', 'maritalStatus']),
    ...mapState('client', {
      clientObj: state => _.cloneDeep(state.clientObj)
    })
  },
  watch: {
    clientObj (newValue) {
      this.clientForm = newValue
    }
  },
  created () {
    if (this.clientId) {
      this.getClient()
    } else {
      this.clientForm = objectTransform({}, this.createClientKeys)
    }
  },
  methods: {
    submit () {
      if (this.clientId) {
        this.updateClient()
      } else {
        this.createClient()
      }
    },
    //
    async createClient () {
      try {
        this.isLoading = true
        await this.$store.dispatch('client/registerClient',
          objectTransform(this.clientForm, this.createClientKeys)
        )
        this.isLoading = false
        this.modalActive = true
      } catch (error) {
        this.isLoading = false
        this.modalActive = true
      }
    },
    //
    async updateClient () {
      try {
        this.isLoading = true
        await this.$store.dispatch('client/updateClient',
          this.clientForm
        )
        await this.getClient()
        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Client updated successfully with client Id: ' + this.clientForm.id,
          position: 'is-bottom',
          type: 'is-success',
          queue: false,
          duration: 5000
        })
      } catch (error) {
        this.isLoading = false
      }
    },
    //
    async getClient () {
      await this.$store.dispatch('client/getClientByQrId', this.$route.query.code)
    },
    //
    goBack () {
      this.$router.push('/clients')
    }
  }
}
</script>

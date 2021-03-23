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
            Successfully generated QR code for Household Id:
            <strong>{{clientObj.id}}</strong>
          </p>
          <hr />
          <qr-generator :value="clientObj.qrCodeId" level="H" :size="200" />
        </section>
      </div>
    </b-modal>
    <title-bar>
      {{ clientId ? 'Edit Household' : 'Create Household' }}
      <router-link to="/clients" class="button is-info" slot="button">
        <span>go back</span>
      </router-link>
    </title-bar>
    <b-loading :is-full-page="false" v-model="isLoading" :can-cancel="false" />
    <tiles :cols="clientId ? ['is-8', 'is-4'] : ['is-12']">
      <card-component
        :title="clientId ? 'Edit Household details' : 'Fill Household details'"
        icon="ballot"
        class="tile is-child"
      >
        <form @submit.prevent="submit">
          <div class="columns">
            <b-field
              class="column is-4"
              label="Household Owner Information"
              custom-class="has-text-centered"
            />
            <div class="column is-8">
              <b-field
                v-if="clientId"
                label="Household ID"
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
                  type="is-only-date"
                  trap-focus
                  :years-range="[-100, 100]"
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
                <b-input v-model="clientForm.location" :disabled="true" />
              </b-field>
              <b-field label="Municipality" custom-class="is-small">
                <b-input v-model="clientForm.municipality" :disabled="true" />
              </b-field>
              <b-field grouped>
                <b-field label="City" custom-class="is-small" expanded>
                  <b-input v-model="clientForm.city" :disabled="true" />
                </b-field>
                <b-field label="State" custom-class="is-small" expanded>
                  <b-input v-model="clientForm.state" :disabled="true" />
                </b-field>
                <b-field label="Country" custom-class="is-small" expanded>
                  <b-input v-model="clientForm.country" :disabled="true" />
                </b-field>
              </b-field>
            </div>
          </div>
          <hr class="mb-4 mt-4" />
          <div class="columns">
            <div class="column is-offset-4 buttons">
              <router-link to="/clients" class="button" slot="button">
                cancel
              </router-link>
              <button
                v-if="clientId"
                type="submit"
                class="button is-primary"
                :class="{'is-loading':isLoading}"
              >
                update household
              </button>
              <button
                v-else
                type="submit"
                class="button is-primary"
                :class="{'is-loading':isLoading}"
              >
                create household
              </button>
            </div>
          </div>
        </form>
      </card-component>
      <card-component
        v-if="clientId"
        title="QR code of the Household"
        class="tile is-child"
        :style="{height: 'max-content'}"
      >
        <qr-generator
          v-if="clientForm.qrCodeId"
          :value="clientForm.qrCodeId"
          level="H"
          :size="200"
          @click-download-qr="downloadQR()"
        />
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
      this.clientForm = _.cloneDeep(newValue)
    }
  },
  created () {
    if (this.clientId) {
      this.getClient()
    } else {
      this.clientForm = objectTransform({}, this.createClientKeys)
      this.$store.dispatch('client/setClientFormDefaults', this.clientForm)
    }
  },
  methods: {
    downloadQR () {
      const canvas = document.getElementById('qr-code').children[0]
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream')
      const downloadLink = document.createElement('a')
      const fileName = `${this.clientObj.id}_${this.clientObj.name}`
      downloadLink.href = pngUrl
      downloadLink.download = `${fileName.trim()}.png`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    },
    //
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
        await this.$store.dispatch('dashboard/getClientCount')
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
          message: 'Household updated successfully with household Id: ' + this.clientForm.id,
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
      this.isLoading = true
      await this.$store.dispatch('client/getClientByQrId', this.$route.query.code)
      this.isLoading = false
      if (!this.clientForm.qrCodeId) {
        this.$buefy.snackbar.open({
          message: 'Could not fetch household details',
          position: 'is-bottom',
          type: 'is-danger',
          queue: false,
          duration: 5000
        })
        this.goBack()
      }
    },
    //
    goBack () {
      this.$router.push('/clients')
    }
  }
}
</script>

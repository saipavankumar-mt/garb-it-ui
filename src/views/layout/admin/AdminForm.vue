<template>
  <section class="section">
    <modal-box
      v-if="adminId && adminForm.name"
      :is-active="modalActive"
      :trash-object-name="adminForm.name"
      @confirm="deleteAdmin"
      @cancel="modalActive = false"
    />
    <title-bar>
      {{ adminId ? 'Edit Admin' : 'Create Admin' }}
      <router-link to="/admins" class="button is-info" slot="button">
        <span>go back</span>
      </router-link>
    </title-bar>
    <card-component
      :title="adminId ? 'Edit admin details' : 'Fill admin details'"
      icon="ballot"
      :header-btn-text="adminId && 'delete this admin'"
      header-btn-class="is-danger is-light"
      @header-btn-click="modalActive = !modalActive"
    >
      <form @submit.prevent="submit">
        <div class="columns">
          <b-field
            class="column is-4"
            label="Employment Information"
            custom-class="has-text-centered"
          />
          <div class="column is-8">
            <b-field grouped>
              <b-field
                v-if="adminId"
                label="Admin ID"
                custom-class="is-small"
                expanded
              >
                <b-input v-model="adminForm.id" :disabled="true" />
              </b-field>
              <b-field
                v-if="adminId"
                label="Reports To"
                custom-class="is-small"
                expanded
              >
                <b-input v-model="adminForm.reportsToName" :disabled="true" />
              </b-field>
            </b-field>
            <b-field label="Designation" custom-class="is-small">
              <b-input
                v-model="adminForm.designation"
                placeholder="Enter designation..."
                required
                name="designation"
              />
            </b-field>
            <b-field label="Department" custom-class="is-small">
              <b-input
                v-model="adminForm.department"
                placeholder="Enter department..."
                required
                name="department"
              />
            </b-field>
            <b-field label="Role" custom-class="is-small">
              <b-input v-model="adminForm.role" :disabled="true" />
            </b-field>
          </div>
        </div>
        <hr class="mb-4 mt-4" />
        <div class="columns">
          <b-field
            class="column is-4"
            label="Personal Information"
            custom-class="has-text-centered"
          />
          <div class="column is-8">
            <b-field label="Full name" custom-class="is-small">
              <b-input
                v-model="adminForm.name"
                placeholder="Enter full name..."
                name="name"
                required
              />
            </b-field>

            <b-field grouped>
              <b-field label="Gender" custom-class="is-small" expanded>
                <b-select
                  v-model="adminForm.gender"
                  placeholder="Select gender..."
                  expanded
                >
                  <option v-for="(v,k) in gender" :value="v" :key="k">
                    {{v}}
                  </option>
                </b-select>
              </b-field>
              <b-field label="Marital Status" custom-class="is-small" expanded>
                <b-select
                  v-model="adminForm.married"
                  placeholder="Click to elect..."
                  expanded
                >
                  <option v-for="(v,k) in maritalStatus" :value="v" :key="k">
                    {{v}}
                  </option>
                </b-select>
              </b-field>
              <b-field label="DOB" custom-class="is-small">
                <datepicker
                  v-model="adminForm.dateOfBirth"
                  placeholder="Click to select..."
                  icon="calendar-today"
                  position="is-bottom-left"
                  type="is-only-date"
                  trap-focus
                  :years-range="[-100, 100]"
                >
                </datepicker>
              </b-field>
            </b-field>
            <b-field label="Mobile Number" custom-class="is-small" expanded>
              <p class="control">
                <a class="button is-static">+91</a>
              </p>
              <b-input
                v-model="adminForm.phoneNumber"
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
            <b-field label="Location" custom-class="is-small">
              <b-input
                v-model="adminForm.location"
                placeholder="Enter location..."
                name="location"
                required
              />
            </b-field>
            <b-field label="Municipality" custom-class="is-small">
              <b-input
                v-model="adminForm.municipality"
                placeholder="Enter municipality..."
                name="municipality"
                required
              />
            </b-field>
            <b-field grouped>
              <b-field label="City" custom-class="is-small" expanded>
                <b-input
                  v-model="adminForm.city"
                  placeholder="Enter city..."
                  name="city"
                  required
                />
              </b-field>
              <b-field label="State" custom-class="is-small" expanded>
                <b-input
                  v-model="adminForm.state"
                  placeholder="Enter state..."
                  name="state"
                  required
                />
              </b-field>
              <b-field label="Country" custom-class="is-small" expanded>
                <b-input
                  v-model="adminForm.country"
                  placeholder="Enter country..."
                  name="country"
                  required
                />
              </b-field>
            </b-field>
          </div>
        </div>
        <hr class="mb-4 mt-4" />
        <div class="columns">
          <b-field
            class="column is-4"
            label="User credentials"
            custom-class="has-text-centered"
          />
          <div class="column is-8">
            <b-field label="Username" custom-class="is-small">
              <b-input
                v-model="adminForm.userName"
                placeholder="Enter username..."
                name="userName"
                required
                :disabled="adminId"
              />
            </b-field>
            <b-field label="Password" custom-class="is-small">
              <b-input
                v-model="adminForm.password"
                placeholder="Enter password..."
                name="password"
                required
                :disabled="adminId"
              />
            </b-field>
          </div>
        </div>
        <hr class="mb-4 mt-4" />
        <div class="columns">
          <div class="column is-offset-4 buttons">
            <router-link to="/admins" class="button" slot="button">
              cancel
            </router-link>
            <button
              v-if="adminId"
              type="submit"
              class="button is-primary"
              :class="{'is-loading':isLoading}"
            >
              update admin
            </button>
            <button
              v-else
              type="submit"
              class="button is-primary"
              :class="{'is-loading':isLoading}"
            >
              create admin
            </button>
          </div>
        </div>
      </form>
    </card-component>
  </section>
</template>

<script>
import Datepicker from '@/views/components/Datepicker'
import TitleBar from '@/views/components/TitleBar'
import CardComponent from '@/views/components/CardComponent'
import ModalBox from '@/views/components/ModalBox'

import _ from 'lodash'
import { objectTransform } from '@/utils/helper'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'AdminForm',
  components: { Datepicker, CardComponent, TitleBar, ModalBox },
  props: {
    adminId: { type: String, default: null }
  },
  data () {
    return {
      modalActive: false,
      isLoading: false,
      adminForm: {},
      createAdminKeys: [
        'name',
        'phoneNumber',
        'gender',
        'dateOfBirth',
        'married',
        'role',
        'designation',
        'department',
        'location',
        'municipality',
        'city',
        'state',
        'country',
        'userName',
        'password'
      ]
    }
  },
  computed: {
    ...mapGetters(['gender', 'maritalStatus']),
    ...mapState('admin', {
      adminObj: state => _.cloneDeep(state.adminObj)
    }),
    ...mapState('user', {
      userAddress: state => state.userAddress
    })
  },
  watch: {
    adminObj (newValue) {
      this.adminForm = _.cloneDeep(newValue)
    }
  },
  mounted () {
    if (this.adminId) {
      this.getAdmin()
    } else {
      this.adminForm = objectTransform({}, this.createAdminKeys)
      this.$store.dispatch('admin/setAdminFormDefaults', this.adminForm)
    }
  },
  methods: {
    submit () {
      if (this.adminId) {
        this.updateAdmin()
      } else {
        this.createAdmin()
      }
    },
    //
    async createAdmin () {
      try {
        this.isLoading = true
        await this.$store.dispatch('admin/addAdmin',
          objectTransform(this.adminForm, this.createAdminKeys)
        )
        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Admin created successfully with admin Id: ' + this.adminForm.id,
          position: 'is-bottom',
          type: 'is-success',
          queue: false,
          duration: 5000
        })
        this.goBack()
      } catch (error) {
        this.isLoading = false
      }
    },
    //
    async updateAdmin () {
      try {
        this.isLoading = true
        await this.$store.dispatch('admin/updateAdmin',
          this.adminForm
        )
        await this.getAdmin()
        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Admin updated successfully with admin Id: ' + this.adminForm.id,
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
    async deleteAdmin () {
      try {
        this.isLoading = true
        await this.$store.dispatch('admin/deleteAdmin',
          this.adminForm.id
        )
        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Admin deleted successfully with admin Id: ' + this.adminForm.id,
          position: 'is-bottom',
          type: 'is-success',
          queue: false,
          duration: 5000
        })
        this.goBack()
      } catch (error) {
        this.isLoading = false
      }
    },
    //
    async getAdmin () {
      await this.$store.dispatch('admin/getAdminById', this.adminId)
    },
    //
    goBack () {
      this.$router.push('/admins')
    }
  }
}
</script>

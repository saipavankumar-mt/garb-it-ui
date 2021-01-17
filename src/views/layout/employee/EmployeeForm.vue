<template>
  <section class="section">
    <modal-box
      v-if="employeeId && employeeForm.name"
      :is-active="modalActive"
      :trash-object-name="employeeForm.name"
      @confirm="deleteEmployee"
      @cancel="modalActive = false"
    />
    <title-bar>
      {{ employeeId ? 'Edit Employee' : 'Create Employee' }}
      <router-link
        to="/employees"
        class="button is-small is-dark"
        slot="button"
      >
        back
      </router-link>
    </title-bar>
    <card-component
      :title="employeeId ? 'Edit employee details' : 'Fill employee details'"
      icon="ballot"
      :header-btn-text="employeeId && 'delete this employee'"
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
                v-if="employeeId"
                label="Employee ID"
                custom-class="is-small"
                expanded
              >
                <b-input v-model="employeeForm.id" :disabled="true" />
              </b-field>
              <b-field
                v-if="employeeId"
                label="Reports To"
                custom-class="is-small"
                expanded
              >
                <b-input
                  v-model="employeeForm.reportsToName"
                  :disabled="true"
                />
              </b-field>
            </b-field>
            <b-field label="Designation" custom-class="is-small">
              <b-input v-model="employeeForm.designation" :disabled="true" />
            </b-field>
            <b-field label="Department" custom-class="is-small">
              <b-input v-model="employeeForm.department" :disabled="true" />
            </b-field>
            <b-field label="Role" custom-class="is-small">
              <b-input v-model="employeeForm.role" :disabled="true" />
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
                v-model="employeeForm.name"
                placeholder="Enter full name..."
                name="name"
                required
              />
            </b-field>

            <b-field grouped>
              <b-field label="Gender" custom-class="is-small" expanded>
                <b-select
                  v-model="employeeForm.gender"
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
              <b-field label="Marital Status" custom-class="is-small" expanded>
                <b-select
                  v-model="employeeForm.married"
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
              <b-field label="DOB" custom-class="is-small">
                <datepicker
                  v-model="employeeForm.dateOfBirth"
                  placeholder="Click to select..."
                  icon="calendar-today"
                  position="is-bottom-left"
                  type="is-only-date"
                  trap-focus
                  name="dateOfBirth"
                  required
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
                v-model="employeeForm.phoneNumber"
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
              <b-input v-model="employeeForm.location" :disabled="true" />
            </b-field>
            <b-field label="Municipality" custom-class="is-small">
              <b-input v-model="employeeForm.municipality" :disabled="true" />
            </b-field>
            <b-field grouped>
              <b-field label="City" custom-class="is-small" expanded>
                <b-input
                  v-model="employeeForm.city"
                  placeholder="Enter city..."
                  name="city"
                  required
                />
              </b-field>
              <b-field label="State" custom-class="is-small" expanded>
                <b-input
                  v-model="employeeForm.state"
                  placeholder="Enter state..."
                  name="state"
                  required
                />
              </b-field>
              <b-field label="Country" custom-class="is-small" expanded>
                <b-input
                  v-model="employeeForm.country"
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
                v-model="employeeForm.userName"
                placeholder="Enter username..."
                name="userName"
                required
              />
            </b-field>
            <b-field label="Password" custom-class="is-small">
              <b-input
                v-model="employeeForm.password"
                placeholder="Enter password..."
                password-reveal
                name="password"
                required
              />
            </b-field>
          </div>
        </div>
        <hr class="mb-4 mt-4" />
        <div class="buttons is-centered">
          <button
            v-if="employeeId"
            type="submit"
            class="button is-primary"
            :class="{'is-loading':isLoading}"
          >
            update employee
          </button>
          <button
            v-else
            type="submit"
            class="button is-primary"
            :class="{'is-loading':isLoading}"
          >
            create employee
          </button>
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
  name: 'EmployeeForm',
  components: { Datepicker, CardComponent, TitleBar, ModalBox },
  props: {
    employeeId: { type: String, default: null }
  },
  data () {
    return {
      modalActive: false,
      isLoading: false,
      employeeForm: {},
      createEmpKeys: [
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
    ...mapState('employee', {
      empObj: state => _.cloneDeep(state.empObj)
    }),
    ...mapState('user', {
      location: state => state.userLocation,
      municipality: state => state.userMunicipality
    })
  },
  watch: {
    empObj (newValue) {
      this.employeeForm = newValue
    }
  },
  created () {
    if (this.employeeId) {
      this.getEmployee()
    } else {
      this.employeeForm = objectTransform({}, this.createEmpKeys)
      this.employeeForm.designation = this.employeeForm.department = this.employeeForm.role = 'Employee'
      this.employeeForm.location = this.location
      this.employeeForm.municipality = this.municipality
    }
  },
  methods: {
    submit () {
      if (this.employeeId) {
        this.updateEmployee()
      } else {
        this.createEmployee()
      }
    },
    //
    async createEmployee () {
      try {
        this.isLoading = true
        await this.$store.dispatch('employee/addEmployee',
          objectTransform(this.employeeForm, this.createEmpKeys)
        )
        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Employee created successfully with employee Id: ' + this.employeeForm.id,
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
    async updateEmployee () {
      try {
        this.isLoading = true
        await this.$store.dispatch('employee/updateEmployee',
          this.employeeForm
        )
        await this.getEmployee()
        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Employee updated successfully with employee Id: ' + this.employeeForm.id,
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
    async deleteEmployee () {
      try {
        this.isLoading = true
        await this.$store.dispatch('employee/deleteEmployee',
          this.employeeForm.id
        )
        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Employee deleted successfully with employee Id: ' + this.employeeForm.id,
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
    async getEmployee () {
      await this.$store.dispatch('employee/getEmployeeById', this.employeeId)
    },
    //
    goBack () {
      this.$router.push('/employees')
    }
  }
}
</script>

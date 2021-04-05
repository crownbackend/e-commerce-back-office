<template>
  <div>
    <CCard>
      <CCardHeader>
        Ajouter un utilisateur.
      </CCardHeader>
      <CCardBody>
        <div>
          <form method="post" @submit.prevent="submitForm" @change="checkFormValid">
            <input id="email" style="display:none" type="text" name="fakeusernameremembered">
            <input id="firstName" style="display:none" type="password" name="fakepasswordremembered">
            <input id="lastName" style="display:none" type="password" name="fakepasswordremembered">
            <input id="city" style="display:none" type="password" name="fakepasswordremembered">
            <input id="address" style="display:none" type="password" name="fakepasswordremembered">
            <input id="telephone" style="display:none" type="password" name="fakepasswordremembered">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="firstName">Nom*</label>
                  <input type="text" v-model="firstName" autocomplete="nope" @keyup="checkFirstName(firstName)" :class="{'is-valid': firstNameValidate}" class="form-control" id="real-firstName">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="lastName">Prénom*</label>
                  <input type="text" v-model="lastName" autocomplete="nope" @keyup="checkLastName(lastName)" :class="{'is-valid': lastNameValidate}" class="form-control" id="real-lastName">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email*</label>
              <input type="email" id="real-email" class="form-control" autocomplete="nope" v-model="email" @keyup="validEmail(email)" :class="{'is-valid': emailValidate, 'is-invalid': emailNotValid}" aria-describedby="emailHelp">
              <div id="validationServer03Feedback" class="invalid-feedback">
                {{emailMessageError}}
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="address">Adresse*</label>
                  <input type="text" v-model="address" autocomplete="nope" @keyup="checkAddress(address)" :class="{'is-valid': addressValidate}" class="form-control" id="real-address">
                  <div class="spinner-border" v-if="spinner" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  <div v-if="cites.length !== 0">
                    <div class="content-address">
                      <ul>
                        <li v-for="city in cites" v-bind:key="city.properties.id">
                          <div class="address" @click="getCity(city.properties.city, city.properties.name)">
                            {{city.properties.label}}
                          </div>
                        </li>
                        <li class="address" @click="hideCites">Vitre adresse ne figure pas parmis la liste</li>
                      </ul>
                    </div>
                    <hr>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="city">Ville*</label>
                  <input type="text" v-model="city" @keyup="checkCity(city)" autocomplete="nope" :class="{'is-valid': cityValidate}" class="form-control" id="real-city">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="telephone">Téléphone*</label>
              <input type="text" v-model="telephone" autocomplete="nope" @keyup="checkTelephone(telephone)" :class="{'is-valid': telephoneValidate}" class="form-control" id="real-telephone">
            </div>
            <CButton color="primary" type="submit" class="px-4" :class="{'btn-submit': disabled}" :disabled="disabled">Sauvegarder  <CSpinner v-if="formSubmit" size="sm" color="info"/></CButton>
          </form>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import UserApi from "@/services/UserApi";
let timeout = null;
export default {
  name: 'createUser',
  data() {
    return {
      email: null,
      firstName: null,
      lastName: null,
      telephone: null,
      address: null,
      city: null,
      firstNameValidate: false,
      lastNameValidate: false,
      telephoneValidate: false,
      emailValidate: false,
      addressValidate: false,
      cityValidate: false,
      emailMessageError: null,
      emailNotValid: false,
      cites: [],
      spinner: false,
      errors: [],
      disabled: true,
      formSubmit: false
    }
  },
  methods: {
    submitForm() {
      if(this.disabled === false) {
        this.formSubmit = true
        UserApi.createUser(this.email, this.lastName, this.firstName,
            this.address, this.city, this.telephone)
            .then(response => {
              if(response.data.created == 1) {
                this.formSubmit = false
                this.$router.push({name: "Users"})
              }
            })
            .catch( () => {
              alert('Erreur serveur')
            })
      }
    },
    checkFormValid() {
      if(this.emailValidate && this.firstNameValidate && this.lastNameValidate && this.telephoneValidate
          && this.addressValidate && this.cityValidate) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let result = re.test(email);
      if(result) {
        this.emailValidate = true
        UserApi.verifyEmail(this.email)
        .then(response => {
          if(response.data.taken == 1) {
            this.emailNotValid = true
            this.emailMessageError = response.data.message
            this.emailValidate = false
          } else if(response.data.success == 1) {
            this.emailValidate = true
            this.emailNotValid = false
            this.emailMessageError = false
          }
        })
        .catch(() => {
          alert('Erreur serveur')
        })
      } else {
        this.emailValidate = false
      }
    },
    checkFirstName() {
      if(this.firstName !== null && this.firstName.length < 2) {
        this.firstNameValidate = false
      } else {
        this.firstNameValidate = true
      }
    },
    checkLastName() {
      if(this.lastName !== null && this.lastName.length < 2) {
        this.lastNameValidate = false
      } else {
        this.lastNameValidate = true
      }
    },
    checkAddress() {
      this.spinner = true
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if(this.address) {
          this.addressValidate = true
          UserApi.verifyAddress(this.address)
              .then(response => {
                this.spinner = false
                this.cites = response.data.features
              })
              .catch(console.error)
        } else {
          this.spinner = false
          this.cites = []
          this.addressValidate = false
        }
      }, 700);
    },
    getCity(city, name) {
      this.city = city
      this.address = name
      this.cites = []
      this.cityValidate = true
      this.addressValidate = true
    },
    checkTelephone() {
      let re = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/
      let result = re.test(this.telephone)
      if(result) {
        this.telephoneValidate = true
      } else {
        this.telephoneValidate = false
      }
    },
    checkCity() {
      if(this.city.length < 3) {
        this.cityValidate = false
      } else {
        this.cityValidate = true
      }
    },
    hideCites() {
      this.cites = []
      this.addressValidate = true
    }
  }
}
</script>

<style>
.content-address {
  height: 150px;
  width: auto;
  overflow: scroll;
  overflow-x: hidden;
  padding-top: 10px;
}

.address {
  text-decoration: underline;
  cursor: pointer;
  padding-top: 5px;
  padding-bottom: 5px;
}

</style>
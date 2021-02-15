<template>
  <div>
    <CCard>
      <CCardHeader>
        Ajouter un utilisateur.
      </CCardHeader>
      <CCardBody>
        <div>
          <form method="post" @submit.prevent="submitForm">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="firstName">Nom*</label>
                  <input type="text" v-model="firstName" @keyup="checkFirstName(firstName)" :class="{'is-valid': firstNameValidate}" class="form-control" id="firstName">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="lastName">Prénom*</label>
                  <input type="text" v-model="lastName" @keyup="checkLastName(lastName)" :class="{'is-valid': lastNameValidate}" class="form-control" id="lastName">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email*</label>
              <input type="email" id="email" class="form-control" v-model="email" @keyup="validEmail(email)" :class="{'is-valid': emailValidate, 'is-invalid': emailNotValid}" aria-describedby="emailHelp">
              <div id="validationServer03Feedback" class="invalid-feedback">
                {{emailMessageError}}
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="address">Adresse*</label>
                  <input type="text" v-model="address" @keyup="checkAddress(address)" class="form-control" id="address">
                  <div class="content-address">

                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="city">Ville*</label>
                  <input type="text" v-model="city" class="form-control" id="city">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="telephone">Téléphone*</label>
              <input type="text" v-model="telephone" class="form-control" id="telephone">
            </div>
            <CButton color="primary" type="submit" class="px-4">Sauvegarder</CButton>
          </form>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import UserApi from "@/services/UserApi";

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
      emailNotValid: false
    }
  },
  methods: {
    submitForm() {
      UserApi.createUser(this.email, this.lastName, this.firstName,
          this.address, this.city, this.telephone)
      .then(response => {
        console.log(response)
      })
      .catch((response) => {
        console.log(response)
      })
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
    checkFirstName(name) {
      if(name && name.length < 2) {
        this.firstNameValidate = false
      } else {
        this.firstNameValidate = true
      }
    },
    checkLastName(name) {
      if(name && name.length < 2) {
        this.lastNameValidate = false
      } else {
        this.lastNameValidate = true
      }
    },
    checkAddress(address) {
      UserApi.verifyAddress(address)
      .then(response => {
        console.log(response)
      })
      .catch(console.error)
    },
  }
}
</script>

<style>
.content-address {
  height: 150px;
  width: auto;
  overflow: scroll;
}
</style>
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
                  <input type="text" v-model="firstName" class="form-control" id="firstName">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="lastName">Prénom*</label>
                  <input type="text" v-model="lastName" class="form-control" id="lastName">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email*</label>
              <input type="email" class="form-control" v-model="email" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="address">Adresse*</label>
                  <input type="text" v-model="address" class="form-control" id="address">
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
      user: null,
      email: null,
      firstName: null,
      lastName: null,
      createdAt: null,
      telephone: null,
      address: null,
      city: null
    }
  },
  methods: {
    submitForm() {
      UserApi.createUser(this.email, this.lastName, this.firstName,
          this.address, this.city, this.telephone)
      .then(response => {
        console.log(response)
      })
      .catch(console.error)
    }
  }
}
</script>
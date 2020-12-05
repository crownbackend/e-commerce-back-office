<template>
  <div v-if="user">
    <CCard>
      <CCardHeader>
        Editer l'utilisateur
      </CCardHeader>
      <CCardBody>
        <div>
          <form method="post" @submit.prevent="submitForm">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="firstName">Nom</label>
                  <input type="text" v-model="firstName" class="form-control" id="firstName">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="lastName">Prénom</label>
                  <input type="text" v-model="lastName" class="form-control" id="lastName">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email</label>
              <input type="email" class="form-control" v-model="email" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="address">Adresse</label>
                  <input type="text" v-model="address" class="form-control" id="address">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="city">Ville</label>
                  <input type="text" v-model="city" class="form-control" id="city">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="telephone">Téléphone</label>
              <input type="text" v-model="telephone" class="form-control" id="telephone">
            </div>
            <div class="form-group">
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" v-model="enabled" id="customSwitch1">
                <label class="custom-control-label" for="customSwitch1">Compte actif</label>
              </div>
            </div>
            <div class="form-group">
              <label for="createdAt">Date d'inscription</label>
              <input type="text" v-model="createdAt" readonly class="form-control" id="createdAt">
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
import dayjs from "dayjs";

export default {
  name: 'editUser',
  data() {
    return {
      user: null,
      email: null,
      firstName: null,
      lastName: null,
      enabled: false,
      createdAt: null,
      telephone: null,
      address: null,
      city: null
    }
  },
  mounted() {
    UserApi.getUser(this.$route.params.id)
        .then(response => {
          this.user = response.data
          this.email = response.data.email
          this.firstName = response.data.firstName
          this.lastName = response.data.lastName
          this.enabled = response.data.enabled
          this.createdAt = dayjs(response.data.createdAt).format('DD/MM/YYYY à H:m')
          this.address = response.data.address
          this.city = response.data.city
          this.telephone = response.data.telephone
        })
        .catch(() => {
          alert('Erreur serveur')
        })
  },
  methods: {
    submitForm() {
      UserApi.editUser(this.$route.params.id, this.email, this.lastName, this.firstName,
      this.address, this.enabled, this.city, this.telephone)
      .then(response => {
        this.$router.push({name: "User", params: {id: response.data.id}})
      }).catch(() => {
        alert('Erreur serveur')
      })
    }
  }
}
</script>
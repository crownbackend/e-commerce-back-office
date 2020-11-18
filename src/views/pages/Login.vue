<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="login">
                  <h1>Connexion</h1>
                  <CAlert color="danger" v-if="errorMessage">
                    {{errorMessage}}
                  </CAlert>
                  <CInput
                    placeholder="Username"
                    autocomplete="username email"
                    v-model="username"
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                    v-model="password"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <div v-if="loading">
                        <CSpinner size="5xl" color="success"/>
                      </div>
                      <div v-else>
                        <CButton color="primary" type="submit" class="px-4">Login</CButton>
                      </div>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0">Forgot password?</CButton>
                      <CButton color="link" class="d-lg-none">Register now!</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Back office ecommerce</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: null,
      password: null,
      loading: false,
      errorMessage: null,
      formValid: false
    }
  },
  methods: {
    login() {
      if(this.username === null || this.password === null) {
        this.errorMessage = "Champs requie !"
        this.loading = false
      } else {
        let username = this.username;
        let password = this.password;
        this.loading = true
        this.$store.dispatch('login', {username, password}, this.loading)
            .then(response => {
              if(response.data.enable === 0) {
                this.errorMessage = "Votre compte na pas encore été activé."
                this.loading = false
              } else if(response.data.notAccount === 0) {
                this.errorMessage = "Utilisateur non trouvé veuillez vous créer un compte."
                this.loading = false
              } else if(response.data.errorLogin === 0) {
                this.errorMessage = "Votre identifiant ou mot de passe est incorrect."
                this.loading = false
              }else {
                this.loading = false
                this.$router.push('/')
              }
            })
            .catch(() => {
              alert('Erreur serveur !')
            })
      }

    }
  }
}
</script>

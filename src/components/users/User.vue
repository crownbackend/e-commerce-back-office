<template>
  <div v-if="user">
    <CRow>
      <CCol col="12" lg="12">
        <CCard>
          <CCardHeader>
            Fiche client
            <div style="float: right">
              <router-link :to="{name: 'UserEdit', params: {id: user.id}}" class="btn btn-warning" >
                <i class="far fa-edit"></i>
              </router-link>
              <button class="btn btn-danger">
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
          </CCardHeader>
          <CCardBody>
            <h1>{{user.lastName}} {{user.firstName}}</h1>
            <div>{{user.email}}</div>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>
            Information supplémentaires
          </CCardHeader>
          <CCardBody>
            <div class="row">
              <div class="col-sm-6">
                <h3>{{user.lastName}} {{user.firstName}}</h3>
                <div>Inscrit le {{user.createdAt}}</div>
                <div><i class="fas fa-envelope-square"></i>{{user.email}}</div>
                <div><i class="fas fa-phone"></i>{{user.telephone}}</div>
                <div>Inscrit a la newsletter</div>
              </div>
              <div class="col-sm-6">
                Adresses de livraison: <br>
                {{user.address}}, {{user.city}}<br>
                Adresses de facturation: <br>
                {{user.address}}, {{user.city}}<br>
              </div>
            </div>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>
            Information commandes
          </CCardHeader>
          <CCardBody>
            <div class="row">
              <div class="col-sm-6">
                <h3>{{user.lastName}} {{user.firstName}}</h3>
                <div>Inscrit le {{user.createdAt|formatDate}}</div>
                <div><i class="fas fa-envelope-square"></i>{{user.email}}</div>
                <div><i class="fas fa-phone"></i>{{user.telephone}}</div>
                <div>Inscrit a la newsletter</div>
              </div>
              <div class="col-sm-6">
                Adresses de livraison: <br>
                {{user.address}}, {{user.city}}<br>
                Adresses de facturation: <br>
                {{user.address}}, {{user.city}}<br>
              </div>
            </div>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>
           Commentaires
          </CCardHeader>
          <CCardBody>
            <div class="row">
              <div class="col-sm-6">
                <h3>{{user.lastName}} {{user.firstName}}</h3>
                <div>Inscrit le {{user.createdAt}}</div>
                <div><i class="fas fa-envelope-square"></i>{{user.email}}</div>
                <div><i class="fas fa-phone"></i>{{user.telephone}}</div>
                <div>Inscrit a la newsletter</div>
              </div>
              <div class="col-sm-6">
                Adresses de livraison: <br>
                {{user.address}}, {{user.city}}<br>
                Adresses de facturation: <br>
                {{user.address}}, {{user.city}}<br>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import UserApi from "@/services/UserApi";
import dayjs from "dayjs";

export default {
  name: 'User',
  data () {
    return {
      user: null
    }
  },
  mounted() {
    UserApi.getUser(this.$route.params.id)
    .then(response => {
      this.user = response.data
    })
    .catch(() => {
      alert('Erreur serveur')
    })
  },
  filters: {
    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY H:m')
    }
  }
}
</script>

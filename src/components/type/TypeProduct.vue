<template>
  <CRow>
    <CCol col="12" xl="12">
      <CCard>
        <CCardHeader>
          Nombres de type: <strong>{{usersCount}}</strong>
          <router-link :to="{name: 'CreateProduct'}" title="Ajouter un utilisateur" style="float: right">
            <i class="far fa-plus-square fa-3x"></i>
          </router-link>
        </CCardHeader>
        <CCardBody>
          <div>
            <CButton
                @click="collapse = !collapse"
                color="info"
                class="mb-2"
            >
              Recherche
            </CButton>
            <CCollapse :show="collapse">
              <CCard body-wrapper>
                <div class="form-group">
                  <label for="search">Recherche par texte</label>
                  <input type="email" @keyup="searchUser" v-model="search" class="form-control" id="search" aria-describedby="emailHelp">
                  <small id="searchHelp" class="form-text text-muted">Rechercher par nom, prénom, email.</small>
                </div>
              </CCard>
            </CCollapse>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Filtrer par</label>
            <select class="form-control" v-model="filter" @change="filterUsers" id="exampleFormControlSelect1">
              <option value="1">Date d'inscription</option>
              <option value="2">Dernière connexion</option>
            </select>
          </div>
          <table class="table table-striped">
            <thead>
            <tr>
              <th>Nom</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="type in typeProduct" v-bind:key="type.id">
              <th scope="row">{{type.name}}</th>
              <td>
                <router-link :to="{name: 'User', params: {id: type.id}}" class="btn btn-primary">
                  <i class="far fa-eye"></i>
                </router-link>
                <router-link :to="{name: 'UserEdit', params: {id: type.id}}" class="btn btn-warning">
                  <i class="far fa-edit"></i>
                </router-link>
                <button @click="deleteType(type.id)" class="btn btn-danger">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
          <div class="container" v-if="showMore">
            <button class="btn btn-outline-info btn-block" @click="loadMore">Voir plus</button>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import ProductTypeApi from "@/services/ProductTypeApi";

export default {
  name: "TypeProduct",
  data() {
    return {
      typeProduct: [],
      filter: 1,
      showMore: true,
      collapse: false,
      search: null,
      typeProductCount: null
    }
  },
  mounted() {
    ProductTypeApi.getAllType()
    .then(response => {
      console.log(response)
      this.typeProduct = response.data
    })
    .catch(console.error)
  },
  methods: {
    deleteType(id) {
      console.log(id)
    }
  }
}
</script>
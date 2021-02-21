<template>
  <CRow>
    <CCol col="12" xl="12">
      <CCard>
        <CCardHeader>
          Nombres de personnes inscrites: <strong>{{usersCount}}</strong>
          <router-link :to="{name: 'UserCreate'}" title="Ajouter un utilisateur" style="float: right">
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
              <th>Prénom</th>
              <th>Email</th>
              <th>Date d'inscription</th>
              <th>Actif</th>
              <th>Dernière connexion</th>
              <th>Commandes</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" v-bind:key="user.id">
              <th scope="row">{{user.firstName}}</th>
              <td>{{user.lastName}}</td>
              <td>{{user.email}}</td>
              <td>{{user.createdAt|formatDate}}</td>
              <td v-if="user.enabled === true">
                <CBadge color="success">Actif</CBadge>
              </td>
              <td v-else>
                <CBadge color="secondary">Non actif</CBadge>
              </td>
              <td>{{user.lastLogin|formatDate}}</td>
              <td>commandes</td>
              <td>
                <router-link :to="{name: 'User', params: {id: user.id}}" class="btn btn-primary">
                  <i class="far fa-eye"></i>
                </router-link>
                <router-link :to="{name: 'UserEdit', params: {id: user.id}}" class="btn btn-warning">
                  <i class="far fa-edit"></i>
                </router-link>
                <button @click="deleteUser(user.id)" class="btn btn-danger">
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
import UserApi from "@/services/UserApi";
import dayjs from 'dayjs';
export default {
  name: 'Users',
  data () {
    return {
      users: [],
      filter: 1,
      showMore: true,
      collapse: false,
      search: null,
      usersCount: null
    }
  },
  mounted() {
    UserApi.getAllUsers()
    .then(response => {
      this.users = response.data.users
      this.usersCount = response.data.usersCount
    })
    .catch(() => {
      alert('Erreur serveur')
    })
  },
  methods: {
    filterUsers() {
      if(this.filter == 0) {
        alert('Veuillez choisir un filtre pour les utilisateurs')
      } else {
        this.showMore = true
        UserApi.filterUsers(this.filter)
        .then(response => {
          this.users = response.data.users
        })
        .catch(() => {
          alert('Erreur serveur')
         })
      }
    },
    loadMore() {
      var date = null
      if(this.filter == 1) {
         date = this.users[this.users.length - 1].createdAt
      } else if(this.filter == 2) {
         date = this.users[this.users.length - 1].lastLogin
      }
      UserApi.loadMoreUsers(this.filter, date)
      .then(response => {
        this.users = this.users.concat(response.data)
        if(response.data.length === 0) {
          this.showMore = false
        }
      }).catch(() => {
        alert('Erreur serveur')
      })
    },
    searchUser() {
      if(this.search) {
        UserApi.searchUser(this.search)
        .then(response => {
          this.users = response.data
        }).catch(() => {
          alert('Erreur serveur')
        })
      }
    },
    deleteUser(id) {
      UserApi.deleteUser(id)
      .then(response => {
        console.log(response)
        if(response.status === 204) {
          this.$router.push({name: "Users"}).catch(()=>{})
        }
      })
      .catch(console.error)
    }
  },
  filters: {
    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY H:m')
    }
  }
}
</script>

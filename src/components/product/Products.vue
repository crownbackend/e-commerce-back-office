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
export default {
  name: "Products"
}
</script>
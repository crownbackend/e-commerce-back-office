<template>
  <div>
    <CCard>
      <CCardHeader>
        Ajouter un utilisateur.
      </CCardHeader>
      <CCardBody>
        <div>
          <form method="post" @submit.prevent="submitForm" @change="checkFormValid">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="firstName">Nom (Pointure, taile, etc..)*</label>
                  <input type="text" v-model="name" autocomplete="nope" class="form-control" id="firstName">
                </div>
                <button type="button" @click.prevent="addContent()" class="btn btn-info">Ajouter un contenu </button>
              </div>
              <div class="col-sm-12 p-4">
                <div class="form-group" v-for="(applicant, counter) in content" v-bind:key="counter">
                  <button class="btn btn-danger float-right" @click.prevent="deleteContent(counter)">x</button>
                  <label>Contenu {{counter+1}}:</label>
                  <input type="text" class="form-control" v-model="applicant.name" required>
                </div>
              </div>
            </div>
            <CButton color="primary" type="submit" class="px-4">Sauvegarder  <CSpinner size="sm" color="info"/></CButton>
          </form>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import ProductTypeApi from "@/services/ProductTypeApi";

export default {
  name: "CreateType",
  data() {
    return {
      name: null,
      content: [
        {name: ''}
      ]
    }
  },
  methods: {
    submitForm() {
      console.log(this.name, this.content)
      let data = {
        name: this.name,
        content: this.content
      }
      ProductTypeApi.createType(data)
      .then(response => {
        console.log(response)
      })
      .catch(console.error)

    },
    checkFormValid() {

    },
    addContent() {
      this.content.push({
        name: ''
      })
    },
    deleteContent(counter) {
      this.content.splice(counter,1)
    }
  }
}
</script>
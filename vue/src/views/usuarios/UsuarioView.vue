<template>

     <PageComponent title="Usuarios">
    <div class="row mt-3">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header bg-dark text-white text-center">
            DETALLE DEL USUARIO
          </div>
          <div class="card-body">
            <form v-on:submit="detalle">
              <div class="input-group mb-3">
                <span class="input-group-text">
                  <i class="fa-solid fa-user"></i>
                </span>
                <input type="text" v-model="name" id="name" class="form-control"
                  disabled>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">
                  <i class="fa-solid fa-user"></i>
                </span>
                <input type="text" v-model="email" id="email"  class="form-control"
                  disabled>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">
                  <i class="fa-solid fa-user"></i>
                </span>
                <input type="text" v-model="created_at" id="created_at"  class="form-control"
                  disabled>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">
                  <i class="fa-solid fa-user"></i>
                </span>
                <input type="text" v-model="updated_at" id="updated_at"  class="form-control"
                  disabled>
              </div>
              <div class="d-grid col-6 mx-auto mb-3">
                <button class="btn btn-success">
                  <i class="fa-solid fa-floppy-disk"></i>
                  Regresar
                </button>
              </div>
              <div class="d-grid col-6 mx-auto mb-3">
            
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
     </PageComponent>


</template>

<script setup>
import PageComponent from '../../components/PageComponent.vue';

</script>

<script>

import {cargar,  mostrarAlerta, enviarSolicitud} from "../../funciones";
import { useRoute } from "vue-router";
import axiosClient from "axios";



export default {
  data() {
    return {
      id:0,
      name: '',
      email: '',
      created_at:'',
      updated_at:'',
      URI: 'http://localhost:8000/api/users',
      cargando: false,

    };
  },

  mounted() {
    cargar('Detalle Usuario')
    const ruta = useRoute();

    this.id =  ruta.params.id;
    this.URI += '/'+this.id;
    this.getUsuarioView();
  },

  methods: {

    getUsuarioView(){

      axiosClient.get(this.URI).then(
        res=>{
       
          this.name = res.data.data.name;
          this.email = res.data.data.email;
          this.created_at = new Date(res.data.data.created_at).toLocaleString('es-ES');   
          this.updated_at = new Date(res.data.data.updated_at).toLocaleString('es-ES');
        }
      );
 
    },

    detalle() {
      
      event.preventDefault();     
      window.location.href = "/listarU";
      }

  },
};
</script>

<style>
.photoimg {
  margin: 0 auto;
}
</style>
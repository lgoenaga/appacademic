<template>
  <PageComponent title="Usuarios">
    <div class="row mt-3">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header bg-dark text-white text-center">
            EDITAR USUARIOS
          </div>
          <div class="card-body">
            <form v-on:submit="actualizar">
              <div class="input-group mb-3">
                <span class="input-group-text">
                  <i class="fa-solid fa-user"></i>
                </span>
                <input type="text" v-model="name" id="name" placeholder="Ingrese el nombre" class="form-control"
                  maxlength="50" required>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">
                  <i class="fa-solid fa-user"></i>
                </span>
                <input type="email" v-model="email" id="email" placeholder="Ingrese el correo" class="form-control"
                  maxlength="50" required>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">
                  <i class="fa-solid fa-user"></i>
                </span>
                <input type="password" v-model="password" id="password" placeholder="Ingrese la clave"
                  class="form-control" maxlength="50" required>
              </div>
                            <div class="input-group mb-3">
                  <span class="input-group-text">
                    <i class="fa-solid fa-user"></i>
                  </span>
                  <input type="text" v-model="rol" id="rol" placeholder="Ingrese el rol" class="form-control" maxlength="50"
                    required>
                </div>
              <div class="d-grid col-6 mx-auto mb-3">
                <button class="btn btn-success">
                  <i class="fa-solid fa-floppy-disk"></i>
                  Actualizar
                </button>
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
import store from "../../store";

</script>

<script>

import { cargar, mostrarAlerta, enviarSolicitud } from "../../funciones";
import { useRoute } from "vue-router";
import axiosClient from "axios";



export default {

  data() {
    return {
      id: 0,
      name: '',
      email: '',
      password: '',
      rol: '',
      URI: 'http://localhost:8000/api/users',
      cargando: false,
      roladmin: '',
    };
  },

  mounted() {
    cargar('Editar Usuarios')
    const ruta = useRoute();

    this.id = ruta.params.id;
    this.URI += '/' + this.id;
    this.getUsuario();
  },

  methods: {

    getUsuario() {
      this.roladmin = store.state.user.data.rol;
      if (this.roladmin == 'admin') {
        axiosClient.get(this.URI).then(
          res => {

            this.name = res.data.data.name;
            this.email = res.data.data.email;
            this.password = res.data.data.password;
            this.rol = res.data.data.rol;
          }
        );
      } else {
        mostrarAlerta('No tiene permisos para editar usuarios', 'warning', '');
      }


    },

    actualizar() {
     
      event.preventDefault();
      this.roladmin = store.state.user.data.rol;
      password = ""
      if (this.roladmin == 'admin') {
        if (this.name.trim() === '') {
          mostrarAlerta('Campo nombre en blanco', 'warning', 'name');
        } else {
          if (this.email.trim() === '') {
            mostrarAlerta('Campo apellido en blanco', 'warning', 'email');
          } else {
            if (this.password.trim() === '') {
              mostrarAlerta('Campo password en blanco', 'warning', 'password');
            } else {
              var parametros = { name: this.name.trim(), email: this.email.trim(), password: this.password.trim(), rol: this.rol.trim() }

              enviarSolicitud('PUT', parametros, this.URI, 'Usuario actualizado');
              this.$router.push({ name: 'listarU' });
            }

          }
        }
      } else {
        mostrarAlerta('No tiene permisos para editar usuarios', 'warning', '');
      }



    },
  },
};
</script>

<style>
.photoimg {
  margin: 0 auto;
}
</style>
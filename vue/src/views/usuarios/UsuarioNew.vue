<template>
  <PageComponent title="Usuarios">
    <div class="row mt-3">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header bg-dark text-white text-center">
            REGISTRAR USUARIO
          </div>
          <div class="card-body">
            <form v-on:submit="guardar">

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
                <input type="password" v-model="cnfpassword" id="cnfpassword" placeholder="Confirme la clave"
                  class="form-control" maxlength="50" required>
              </div>
              <div class="d-grid col-6 mx-auto mb-3">
                <button class="btn btn-success">
                  <i class="fa-solid fa-floppy-disk"></i>
                  Guardar
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

</script>

<script>

import { cargar, mostrarAlerta, enviarSolicitud } from "../../funciones";



export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      cnfpassword: '',
      URI: 'http://localhost:8000/api/users',
      cargando: false,

    };
  },

  mounted() {
    cargar('Crear Usuario')
  },


  methods: {
    guardar() {

      event.preventDefault();

      if (this.name.trim() === '') {
        mostrarAlerta('Campo nombre en blanco', 'warning', 'name');
      } else {
        if (this.email.trim() === '') {
          mostrarAlerta('Campo email en blanco', 'warning', 'password');
        } else {
          if (this.password.trim() === '') {
            mostrarAlerta('Campo password en blanco', 'warning', 'password');
          } else {
            if (this.cnfpassword.trim() === '') {
              mostrarAlerta('Campo confirmar password en blanco', 'warning', 'cnfpassword');
            } else {
              if (this.password.trim() != this.cnfpassword.trim()) {
                mostrarAlerta('Las contraseñas no coinciden', 'warning', 'cnfpassword');
              } else {
                var parametros = { name: this.name.trim(), email: this.email.trim(), password: this.password.trim() }

                enviarSolicitud('POST', parametros, this.URI, 'Usuario registrado')
                this.$router.push({ name: 'listarU' });
              }
            }
          }
        }

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
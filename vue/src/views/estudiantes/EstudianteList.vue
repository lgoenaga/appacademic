<template>
  <PageComponent>

    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Estudiantes</h1>
        <router-link :to="{ name: 'createE' }"
          class="py-2 px-3 text-white bg-emerald-600 rounded-md hover:bg-emerald-500">
          <i class="fa-solid fa-floppy-disk"></i>
          Crear Estudiante
        </router-link>
      </div>
    </template>

    <div class="row">
      <div class="col col-lg-8 offset-lg-2">
        <div class="table-responsive">
          <table class="table table-hover table-bordered">
            <thead class="titulos-tabla">
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">FOTO</th>
                <th scope="col">NOMBRE</th>
                <th scope="col">APELLIDO</th>
                <th scope="col">FECHA</th>
                <th scope="col">ACCION</th>
              </tr>
            </thead>
            <tbody class="table-group-divider" id="contenido">
              <tr v-if="this.cargando">
                <td colspan="7">
                  <h3>Cargando.....</h3>
                </td>
              </tr>
              <tr v-else v-for="(est, i) in this.estudiantes" :key="est.id"
                v-show="(pag - 1) * NUM_RESULTS <= i && pag * NUM_RESULTS > i">
                <td class="centrar" v-text="i + 1"></td>
                <td class="centrar" v-text="est.id"></td>

                <td>
                  <img v-if="est.photo" class="img-thumbnail" style="width: 150px !important" :src="est.photo"
                    alt="foto-estudiante" />
                  <img v-else class="img-thumbnail"
                    src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-48.png"
                    alt="foto-default" />
                </td>
                <td v-text="est.firstName"></td>
                <td v-text="est.lastName"></td>
                <td class="centrar" v-text="new Date(est.updated_at).toLocaleString('es-ES')"></td>

                <div class="botones">
                  <router-link :to="{ path: `/viewE/${est.id}` }" class="btn btn-info">
                    <i class="fa-sharp fa-solid fa-eye"></i>
                  </router-link>

                  &nbsp;
                  <router-link :to="{ path: `/editE/${est.id}` }" class="btn btn-warning">
                    <i class="fa-solid fa-user-pen"></i>
                  </router-link>
                  &nbsp;
                  <button v-if="est.photo != ''" class="btn btn-danger" v-on:click="($event) =>
                    eliminar(
                      est.id,
                      est.firstName,
                      est.photo
                    )
                    ">
                    <i class="fa-solid fa-trash"></i>
                  </button>

                  <button v-else class="btn btn-danger" v-on:click="($event) =>
                    eliminar(
                      est.id,
                      est.firstName,
                      'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-48.png'
                    )
                    ">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
        <section class="page">
          <nav aria-label="Page navigation" class="text-center">
            <ul class="pagination text-center">
              <li>
                <a href="#" aria-label="Previous" v-show="pag != 1" @click.prevent="pag -= 1">
                  <button class="btn text-white bg-emerald-600 rounded-md hover:bg-emerald-500"
                    aria-hidden="true">Anterior</button>
                </a>
              </li>
              <li>
                <a aria-label="Previous" v-show="pag != 0" @click.prevent="pag -= 1">
                  <span aria-hidden="true">pagina {{ pag }} de {{ this.NoPag }} </span>
                </a>
              </li>
              <li>
                <a href="#" aria-label="Next" v-show="pag * NUM_RESULTS / totalItems < 1" @click.prevent="pag += 1">
                  <button class="btn text-white bg-emerald-600 rounded-md hover:bg-emerald-500"
                    aria-hidden="true">Siguiente</button>
                </a>
              </li>
            </ul>
          </nav>
        </section>
      </div>
    </div>



  </PageComponent>
</template>


<script setup>
import PageComponent from '../../components/PageComponent.vue';
import store from "../../store";
</script>

<script >

import { confirmar, cargar, mostrarAlerta } from "../../funciones";
import axiosClient from "../../axios";




export default {

  data() {

    return {
      estudiantes: null,
      cargando: false,
      totalItems: 1,
      NUM_RESULTS: 4,
      NoPag: 1,
      pag: 1,

      rolguest: '',

    };
  },
  computed: {

  },
  mounted() {
    cargar("Listar Estudiante");
    this.getEstudiantes();
  },


  methods: {
    getEstudiantes() {
      axiosClient.get("http://localhost:8000/api/estudiantes").then((res) => {
        this.estudiantes = res.data;
        this.cargando = false;
        const newArray = this.estudiantes.map(a => ({ ...a }));
        this.totalItems = newArray.length;
        this.NoPag = Math.ceil(this.totalItems / this.NUM_RESULTS);
        return this.Nopag;
      });
    },

    eliminar(id, nombre, imagen) {
      this.rolguest = store.state.user.data.rol;
      if (this.rolguest == 'guest') {
        mostrarAlerta('No tiene permisos para eliminar estudiantes', 'warning', '');
        return;
      } else {
        confirmar(
          "http://localhost:8000/api/estudiantes",
          id,
          imagen,
          "Eliminar Registro",
          "Realmente desea eliminar a " + nombre + " ?",

        );
        this.cargando = false;
      }


    },

  },
};
</script>

<style>
.pagination {
  display: flex;
  justify-content: space-between;

}

.titulos-tabla,
.centrar {
  margin: 0 auto;
  text-align: center;
}

.botones {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 174px;
}

#contenido tr {
  vertical-align: middle;
}

.img-thumbnail {
  display: block;
  margin: 0 auto;
  text-align: center;

}


.col.col-lg-8.offset-lg-2 {

  margin: 0;
  width: -moz-available;

}
</style>

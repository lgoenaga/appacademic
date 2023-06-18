<template>
  <PageComponent>

    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Usuarios</h1>
        <router-link :to="{ name: 'createE' }"
          class="py-2 px-3 text-white bg-emerald-600 rounded-md hover:bg-emerald-500">
          <i class="fa-solid fa-floppy-disk"></i>
          Crear Usuario
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
                <th scope="col">NOMBRE</th>
                <th scope="col">EMAIL</th>
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
              <tr v-else v-for="(usr, i) in this.usuarios" :key="usr.id"
                v-show="(pag - 1) * NUM_RESULTS <= i && pag * NUM_RESULTS > i">
                <td class="centrar" v-text="i + 1"></td>
                <td class="centrar" v-text="usr.id"></td>
                <td v-text="usr.name"></td>
                <td v-text="usr.email"></td>
                <td class="centrar" v-text="new Date(usr.updated_at).toLocaleString('es-ES')"></td>

                <div class="botones">
                  <router-link :to="{ path: `/viewU/${usr.id}` }" class="btn btn-info">
                    <i class="fa-sharp fa-solid fa-eye"></i>
                  </router-link>

                  &nbsp;
                  <router-link :to="{ path: `/editU/${usr.id}` }" class="btn btn-warning">
                    <i class="fa-solid fa-user-pen"></i>
                  </router-link>
                  &nbsp;
                  <button class="btn btn-danger" v-on:click="($event) =>
                    eliminar(
                      usr.id,
                      usr.name,
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
                  <button class="btn text-white bg-emerald-600 rounded-md hover:bg-emerald-500" aria-hidden="true">Anterior</button>
                </a>
              </li>
              <li>
                <a aria-label="Previous" v-show="pag != 0" @click.prevent="pag -= 1">
                  <span aria-hidden="true">pagina {{ pag }} de {{ this.NoPag }} </span>
                </a>
              </li>
              <li>
                <a href="#" aria-label="Next" v-show="pag * NUM_RESULTS / totalItems < 1" @click.prevent="pag += 1">
                  <button class="btn text-white bg-emerald-600 rounded-md hover:bg-emerald-500" aria-hidden="true">Siguiente</button>
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

</script>

<script >

import { confirmar, cargar } from "../../funciones";
import axiosClient from "../../axios";




export default {

  data() {

    return {
      usuarios: null,
      cargando: false,
      totalItems: 1,
      NUM_RESULTS: 4,
      NoPag: 1,
      pag: 1,



    };
  },
  computed: {

  },
  mounted() {
    cargar("Listar Usuarios");
    this.getUsuarios();
  },


  methods: {
    getUsuarios() {
      axiosClient.get("http://localhost:8000/api/users").then((res) => {
        this.usuarios = res.data;
        this.cargando = false;
        const newArray = this.usuarios.map(a => ({ ...a }));
        this.totalItems = newArray.length;
        this.NoPag = Math.ceil(this.totalItems / this.NUM_RESULTS);
        return this.Nopag;
      });
    },

    eliminar(id, nombre, imagen) {
      confirmar(
        "http://localhost:8000/api/users",
        id,
        imagen,
        "Eliminar Registro",
        "Realmente desea eliminar a " + nombre + " ?",

      );
      this.cargando = false;

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


.col.col-lg-8.offset-lg-2{

  margin: 0;
  width: -moz-available;

}

</style>

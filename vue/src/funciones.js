import Swal from "sweetalert2";
import axiosClient from "axios";
import "animate.css";

export function cargar(vista) {
  Swal.fire({
    title: "<div style='color:white;font-size:70px;'>" + vista + "</div>",
    html: "<div style='font-size:55px; color:lightblue;'>Cargando......<br><br></div>",
    icon: "info",
    text: "Cargando.....",
    allowEnterKey: false,
    allowEscapeKey: false,
    allowOutsideClick: false,
    background: "DarkSlateGrey",
    backdrop: "linear-gradient(rgba(224,247,250,0.4), #eceff1,#fffde7)",
    timer: 2000,
    timerProgressBar: true,
    showClass: {
      popup: "slow-animation-show ",
    },
    hideClass: {
      popup: "slow-animation-hide",
    },
    didOpen: () => {
      Swal.showLoading();
    },
  });
}

export function mostrarAlerta(titulo, icono, foco = "") {
  let timerInterval;
  if (foco != "") {
    document.getElementById(foco).focus();
  }

  Swal.fire({
    toast: false,
    title: titulo,
    icon: icono,
    html:
      "<div style='font-size:35px;'><br>Autocerrado en...... " +
      "<div style='font-size:25px; color:red;'><br> <b></b>  Segundos <br><br><br></div></div>",
    customClass: { confirmButton: "btn btn-primary" },
    showClass: {
      popup: "slow-animation-show ",
    },
    hideClass: {
      popup: "slow-animation-hide",
    },

    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    backdrop: "linear-gradient(rgba(224,247,250,0.4), #eceff1,#fffde7)",
    background: "rgb(224,224,224)",
    timer: 20000,
    timerProgressBar: true,

    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);

      toast.addEventListener("mouseleave", Swal.resumeTimer);

      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Math.trunc(Swal.getTimerLeft() / 1000);
      }, 1000);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer"); 
    }
  });
}

export function confirmar(URI, id, imagen, titulo, mensaje) {
  var url = URI + "/" + id;
  console.log(url);
  const sweetBootsrap = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-primary me-3",
      cancelButton: "btn btn-danger",
    },
  });

  sweetBootsrap
    .fire({
      toast: false,
      title: "<div style='color:white;font-size:50px;'>" + titulo + "</div>",
      html:
        "<div style='font-size:25px; color:lightblue;'>" +
        mensaje +
        "<br><br><br></div>",
      imageUrl: imagen,
      showClass: {
        popup: "slow-animation-show",
      },
      hideClass: {
        popup: "aslow-animation-hide",
      },

      showSpinner: true,
      showCancelButton: true,
      confirmButtonText: '<i class="fa-solid fa-check"></i> Si, Eliminar',
      cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar',
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      background: "DarkSlateGrey",
      timer: 20000,
      timerProgressBar: true,
      backdrop: "linear-gradient(rgba(224,247,250,0.4), #eceff1,#fffde7)",
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);

        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    })
    .then((res,headers) => {
      if (res.isConfirmed) {
        enviarSolicitud("DELETE", { id: id }, url, "Eliminado con exito");
        if (headers===200){
          console.log('Eliminado');
        }

      } else {
        mostrarAlerta("Operacion Cancelada", "error");

      }
    });
}

export function enviarSolicitud(metodo, parametros, URI, mensaje) {
  axiosClient({ method: metodo, url: URI, data: parametros })
      .then(function (res) {
          var estado = res.status;
          if (estado == 200) {
              mostrarAlerta(mensaje, "success");

              if (Swal.DismissReason.timer === 0) {
                  window.location.reload();
              } else {
                  if (res.isConfirmed) {
                      window.location.reload();
                  }
              }

          } else {
              if (estado == 500) {
                  mostrarAlerta("Error de servidor", "error");
              } else {
                  mostrarAlerta("No se pude realizar la acción", "warning");
              }
          }
      })
      .catch(function (error) {
          mostrarAlerta("Servidor no disponible", "error");
      });
}

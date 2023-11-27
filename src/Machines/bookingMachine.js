import { createMachine, assign } from "xstate";
import { fetchCountries } from "../Utils/api";


//maquina de estados Hijo

//jerarquia
const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: { //invoke = invocar servicio
        id: 'getCountries',
        src: () => fetchCountries, //funcion con el enlace del recurso
        onDone: { //en caso de ser exitoso
          target: 'success',
          actions: assign((context, event) => context.countries = event.data),
        }, 
        onError: { //en caso de error
          target: "failure",
          actions: assign((context, event) => context.error = 'fallo en el request de datos paises' ),
        },

      },
      
      /*on: {
        DONE: "success",
        ERROR: "failure",
      },*/
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: "loading" },
      },
    },
  },
};

//en jerarqauias, se cuenta con estado inicial





//paralelas
const fileMachine = createMachine({
  id: 'archivos',
  type: 'parallel',
  states: {


    upload: {
      initial: 'inicial',
      states: {
        inicial: {
          on: {
            INIT_UPLOAD: { target: 'cargando' }
          }
        },
        cargando: {
          on: {
            UPLOAD_COMPLETE: { target: 'terminado' }
          }
        },
        terminado: {}
      }
    },


    download: {
      initial: 'inicial',
      states: {
        inicial: {
          on: {
            INIT_DOWNLOAD: { target: 'cargando' }
          }
        },
        cargando: {
          on: {
            DOWNLOAD_COMPLETE: { target: 'terminado' }
          }
        },
        terminado: {}
      }
    }

  }
});


//en paralelos, se debe declarar el type: 'parallel' y cada estado cuenta con su propio estado inicial













const bookingMachine = createMachine(
{
  id: "buy plane tickets",
  initial: "initial",

  context: {
    passengers: [],
    selectedCountry: "",
    countries: [],
    error: "",
  },


  states: {

    initial: {

      entry: assign( (context, event) => {
        context.passengers = [];
        context.selectedCountry = "";
      }),


      on: {
        START: {
          target: "search",
          actions: "imprimirInicio", //accion que se ejecuta cuando se apunta a search 
        },
      },
    },

    search: {
      entry: 'imprimirEntrada', //acciones de entrada de search
      exit: 'imprimirSalida', //acciones de salida de search
      on: {
        CONTINUE: {
          target: "passengers",
          actions: assign({selectedCountry: (context, event) => event.selectedCountry }),
        },
        CANCEL: "initial",
      },
      ...fillCountries,
    },


    tickets: {
      after: { //esperar 5 segundos (5000ms) para cambiar a estado
        5000: {
          target: "initial",
        },
      },
      on: {
        FINISH: "initial",
      },
    },
    passengers: {
      on: {
        DONE: {
          target: "tickets",
          cond: "moreThanOnePassenger",

        }, 
        CANCEL: "initial",
        ADD: {
          target: "passengers",
          actions: assign( (context, event) => context.passengers.push(event.newPassenger)),
        },


      },
    },
  },
},

//establecer las acciones y condiciones
{
  //acciones
  actions: {
    imprimirInicio: () => console.log('se Imprime action: imprimirInicio'),

    imprimirEntrada: () => console.log('se Imprime action: imprimirEntrada a search'),

    imprimirSalida: () => console.log('se Imprime action: imprimirSalida de search'),

  },

  //condiciones
  guards: {

    moreThanOnePassenger: (context) => {
      return context.passengers.length > 0;
    },

  },

},



);






export default bookingMachine;

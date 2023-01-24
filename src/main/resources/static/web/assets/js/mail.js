const app = Vue.createApp({

    data(){

        return{


            nombre: "",
            apellido: "",
            email: "",
            numero: "",


        }

    },
    created(){
        
    },
    mounted(){

    },
    methods:{

        // metodo para mandar un email 

        sendEmail(){

           
            if(this.email == "" || this.nombre == "" || this.numero == "" || this.apellido == ""){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No llenaste uno de los casilleros de contacto',
                  })
            }else if(!this.email.includes("@")){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Escribiste el email de forma incorrecta',
                   
                  })
            }else{

                // Temporizador de envio de email 

                let timerInterval
                Swal.fire({
                title: 'Enviando email!',
                html: 'Se cerrara la ventana en  <b> </b> milliseconds.',
                timer: 11000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
                }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
                })


                axios.post("/sendEmail","emailUser=" + this.email + "&name=" + this.nombre + "&lastname=" + this.apellido + "&number=" + this.numero)
                .then(response => {
    
                    window.location.assign("./index.html")
                
                })
                .catch(error =>{
                    console.log(error);
                })
            }


    
        }



    }

}).mount('#app')
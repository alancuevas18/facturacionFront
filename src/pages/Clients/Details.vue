<template>
    <div class="col-md-12">
        <h2 class="text-center">{{$t('clients.index')}}</h2>
    <card>
      <template slot="header">
        <h4 class="card-title">
            {{$t('clients.details')}}
            <router-link to="/clients/index">
                <button class="btn floatr btn-icon btn-youtube">
                    <i class="tim-icons icon-double-left"></i>
                </button>
            </router-link>
        </h4>
      </template>
      <div class="row">
        <div class="col-md-6">
            <template>
            <card class="card-user">
            <p class="card-text"></p>
            <div class="author">
                <div class="block block-one"></div>
                <div class="block block-two"></div>
                <div class="block block-three"></div>
                <div class="block block-four"></div>
                <img class="avatar" src="img/emilyz.jpg" alt="..." />
                <h5 class="title text-capitalize" :class="client.status">{{client.status }}</h5>
                <p class="description text-capitalize">{{client.name }} {{client.lastName}}</p>
            </div>
            <p></p>
          
            <div slot="footer" class="button-container">
                <base-button class="btn-facebook" icon round>
                <i class="fab fa-facebook"></i>
                </base-button>
                <base-button class="btn-twitter" icon round>
                <i class="fab fa-twitter"></i>
                </base-button>
                <base-button class="btn-google" icon round>
                <i class="fab fa-google-plus"></i>
                </base-button>
                <a :href="'https://api.whatsapp.com/send?phone='+client.cellPhone">
                    <base-button class="btn-whatsapp" icon round>
                        <i class="fab fa-whatsapp"></i>
                    </base-button>
                </a>
            </div>
            </card>
        </template>
        </div>
        <div class="col-md-6">
            <template>
            <card class="card-user">
            <p class="card-text"></p>
            <div class="author">
                <div class="block block-one"></div>
                <div class="block block-two"></div>
                <div class="block block-three"></div>
                <div class="block block-four"></div>
                <p class="description text-capitalize"><b>NationalID:</b> {{client.nationalID }}</p>
                <p class="description text-capitalize"><b>Email:</b> {{client.email }}</p>
                <p class="description text-capitalize"><b>Address:</b> {{client.address }}</p>
                <p class="description text-capitalize"><b>CellPhone:</b> {{client.cellPhone }}</p>
                <p class="description text-capitalize"><b>Phone:</b> {{client.phone }}</p>
                
            </div>
            <p></p>
          
            <div slot="footer" class="button-container">
                <a :href="'tel:'+client.cellPhone">
                    <base-button icon round>
                        <i class="fas fa-phone"></i>
                    </base-button>
                </a>
                <a :href="'tel:'+client.phone">
                    <base-button icon round>
                        <i class="fas fa-mobile"></i>
                    </base-button>
                </a>
                <a :href="'mailto:'+client.email">
                    <base-button icon round>
                        <i class="fas fa-envelope-open"></i>
                    </base-button>
                </a>
                <a href="#">
                    <base-button icon round>
                        <i class="fas fa-map-marker-alt"></i>
                    </base-button>
                </a>
            </div>
            </card>
        </template>
        </div>
        
    </div>
    </card>
    <!-- end card -->
  </div>
</template>
<script>
import axios from "axios";
import config from '@/config';

export default {
  components: {
  },
  data() {
    return {
     id : '',
     baseApiUrl : '',
      client : [
        {
            code : '',
            name : '',
            lastName : '',
            nationalID : '',
            email : '',
            address : '',
            cellPhone : '',
            phone : '',
            status : '',
        }
      ],
      clientStatus : 'Active'
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.baseApiUrl = config.global.baseApiUrl;
    this.find();
  },
  methods: {
    find(){
    axios
      .get(this.baseApiUrl+'clientes?id='+ this.id)
      .then(response => {
        console.log(response.data[0]);
        this.client = {
            code : response.data[0].personas.codigo,
            name : response.data[0].personas.nombre,
            lastName : response.data[0].personas.apellido,
            nationalID : response.data[0].personas.identificacion,
            email : response.data[0].personas.correo,
            address : response.data[0].personas.direccion,
            cellPhone : response.data[0].personas.celular,
            phone : response.data[0].personas.telefono,
            status : response.data[0].estadoClientes ? 'active' : 'inactive',
        };
      })
      .catch(error => {
        this.error = error
      })
      .finally(() => this.loading = false);
    }
  }
};
</script>
<style>
  .floatr{
    float:right;
  }
  .active{
  color:forestgreen !important;
    }.inactive{
  color:red  !important;;
    }
    .btn-whatsapp{
    background: #25D366;
    background-image: -webkit-gradient(linear, right top, left bottom, from(#25d366), color-stop(#075e54), to(#25d366));
    background-image: linear-gradient(to bottom left, #25d366, #075e54, #25d366);
    background-size: 210% 210%;
    background-position: top right;
    color: #ffffff;
    background-size: 210% 210%;
    background-position: top right;
    background-repeat: space;
    }
    .btn-whatsapp:hover{
    background: #25D366;
    background-image: -webkit-gradient(linear, right top, left bottom, from(#25d366), color-stop(#075e54), to(#25d366));
    background-image: linear-gradient(to bottom left, #25d366, #075e54, #25d366);

    }
</style>

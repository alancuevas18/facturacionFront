<template>
  <base-table :data="listaProducto" thead-classes="text-primary">
    <template slot="columns">
      <th>Producto</th>
      <th>Cantidad</th>
      <th>Porcentaje</th>
      <th>Minimo</th>
      <th>Sucursal</th>
    </template>

    <template slot-scope="{ row}">

      <td>{{ row.nombre }}</td>
      <td>{{ row.stock }}</td>
      <td class="text-center"><base-progress computedClasses="bg-warning" :value="((row.stock*100)/ row.stockMinimo==0?1:row.stockMinimo)"  /></td>
      <td>{{ row.stockMinimo }}</td>
      <td>{{ row.sucursales }}</td>
      <!-- <td class="text-right">€ 99,225</td> -->
      <!-- <td class="text-right">
        <el-tooltip
          content="Refresh"
          effect="light"
          :open-delay="300"
          placement="top"
        >
          <base-button
            :type="index > 2 ? 'success' : 'neutral'"
            icon
            size="sm"
            class="btn-link"
          >
            <i class="tim-icons icon-refresh-01"></i>
          </base-button>
        </el-tooltip>
        <el-tooltip
          content="Delete"
          effect="light"
          :open-delay="300"
          placement="top"
        >
          <base-button
            :type="index > 2 ? 'danger' : 'neutral'"
            icon
            size="sm"
            class="btn-link"
          >
            <i class="tim-icons icon-simple-remove"></i>
          </base-button>
        </el-tooltip>
      </td> -->
    </template>
  </base-table>

</template>
<script>
import { BaseTable, BaseProgress } from '@/components'
import config from '@/config'
import axios from 'axios'

export default {
  components: {
    BaseTable,
    BaseProgress
  },
  data() {
    return {
      baseApiUrl: '',
      listaProducto:[],
      table: [
        {
          id: 1,
          img: 'img/tania.jpg',
          name: 'Tania Mike',
          job: 'Develop',
          progress: 25,
          salary: '€ 99,225'
        },
        {
          id: 2,
          img: 'img/robi.jpg',
          name: 'John Doe',
          job: 'CEO',
          progress: 77,
          salary: '€ 89,241'
        },
        {
          id: 3,
          img: 'img/lora.jpg',
          name: 'Alexa Mike',
          job: 'Design',
          progress: 41,
          salary: '€ 92,144'
        },
        {
          id: 4,
          img: 'img/jana.jpg',
          name: 'Jana Monday',
          job: 'Marketing',
          progress: 50,
          salary: '€ 49,990'
        },
        {
          id: 5,
          img: 'img/mike.jpg',
          name: 'Paul Dickens',
          job: 'Develop',
          progress: 100,
          salary: '€ 69,201'
        },
        {
          id: 6,
          img: 'img/emilyz.jpg',
          name: 'Manuela Rico',
          job: 'Manager',
          progress: 15,
          salary: '€ 99,201'
        }
      ]
    }
  },
  mounted(){
    this.baseApiUrl = config.global.baseApiUrl
    this.getdata()
  },
  methods:{
    getdata(){
      axios.get(this.baseApiUrl+'ProductosSucursales/ProductoMinimo').then(
        (response)=>{
         this.listaProducto=response.data
      })
    }
  }
}
</script>
<style></style>

import DashboardLayout from 'src/pages/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from 'src/pages/GeneralViews/NotFoundPage.vue'

// Dashboard pages
const Dashboard = () => import('src/pages/Dashboard/Dashboard.vue')

//Clients
const ClientIndex = () => import('src/pages/Clients/Index.vue')
const ClientCreate = () => import('src/pages/Clients/Create.vue')
const ClientDetail = () => import('src/pages/Clients/Details.vue')

//Suppliers
const SupplierIndex = () => import('src/pages/Suppliers/Index.vue')
const SupplierCreate = () => import('src/pages/Suppliers/Create.vue')
const SupplierDetail = () => import('src/pages/Suppliers/Details.vue')

let clientMenu = {
  path: '/clients',
  component: DashboardLayout,
  redirect: '/clients/index',
  name: 'Clientes',
  children: [
    {
      path: 'index',
      name: 'Administracion Clientes',
      components: { default: ClientIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Clientes',
      components: { default: ClientCreate }
    },
    {
      path: 'details/:id',
      name: 'Detalles Cliente',
      components: { default: ClientDetail }
    }
  ]
}

let supplierMenu = {
  path: '/suppliers',
  component: DashboardLayout,
  redirect: '/suppliers/index',
  name: 'Suplidores',
  children: [
    {
      path: 'index',
      name: 'Administracion Suplidores',
      components: { default: SupplierIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Suplidor',
      components: { default: SupplierCreate }
    },
    {
      path: 'details/:id',
      name: 'Detalles Suplidor',
      components: { default: SupplierDetail }
    }
  ]
}

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home'
  },
  clientMenu,
  supplierMenu,
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    name: 'Dashboard layout',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        components: { default: Dashboard }
      }
    ]
  },
  { path: '*', component: NotFound }
]

export default routes

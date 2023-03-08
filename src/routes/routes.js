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

//Sellers
const SellerIndex = () => import('src/pages/Sellers/Index.vue')
const SellerCreate = () => import('src/pages/Sellers/Create.vue')
const SellerDetail = () => import('src/pages/Sellers/Details.vue')

//Delivery
const DeliveryIndex = () => import('src/pages/Delivery/Index.vue')
const DeliveryCreate = () => import('src/pages/Delivery/Create.vue')
const DeliveryDetail = () => import('src/pages/Delivery/Details.vue')

//Brands
const BrandIndex = () => import('src/pages/Brands/Index.vue')
const BrandCreate = () => import('src/pages/Brands/Create.vue')

//ProductsType
const ProductTypeIndex = () => import('src/pages/ProductsType/Index.vue')
const ProductTypeCreate = () => import('src/pages/ProductsType/Create.vue')

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

let SellerMenu = {
  path: '/sellers',
  component: DashboardLayout,
  redirect: '/sellers/index',
  name: 'Vendedores',
  children: [
    {
      path: 'index',
      name: 'Administracion Vendedores',
      components: { default: DeliveryIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Vendedor',
      components: { default: DeliveryCreate }
    },
    {
      path: 'details/:id',
      name: 'Detalles Vendedor',
      components: { default: DeliveryDetail }
    }
  ]
}

let DeliveryMenu = {
  path: '/delivery',
  component: DashboardLayout,
  redirect: '/delivery/index',
  name: 'Mensajeros',
  children: [
    {
      path: 'index',
      name: 'Administracion Mensajeros',
      components: { default: SellerIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Mensajero',
      components: { default: SellerCreate }
    },
    {
      path: 'details/:id',
      name: 'Detalles Mensajero',
      components: { default: SellerDetail }
    }
  ]
}

let brandMenu = {
  path: '/brands',
  component: DashboardLayout,
  redirect: '/brands/index',
  name: 'Marcas',
  children: [
    {
      path: 'index',
      name: 'Administracion Marcas',
      components: { default: BrandIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Marca',
      components: { default: BrandCreate }
    }
  ]
}

let productTypeMenu = {
  path: '/productstype',
  component: DashboardLayout,
  redirect: '/productstype/index',
  name: 'Tipo de Productos',
  children: [
    {
      path: 'index',
      name: 'Administracion Tipo de Productos',
      components: { default: ProductTypeIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Tipo de Marca',
      components: { default: ProductTypeCreate }
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
  brandMenu,
  SellerMenu,
  DeliveryMenu,
  productTypeMenu,
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

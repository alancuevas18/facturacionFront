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

//Deliveries
const DeliveryIndex = () => import('src/pages/Deliveries/Index.vue')
const DeliveryCreate = () => import('src/pages/Deliveries/Create.vue')
const DeliveryDetail = () => import('src/pages/Deliveries/Details.vue')

//Products
const ProductIndex = () => import('src/pages/Products/Index.vue')
const ProductCreate = () => import('src/pages/Products/Create.vue')
const ProductDetail = () => import('src/pages/Products/Details.vue')

//ProductsOffice
const ProductOfficeIndex = () => import('src/pages/ProductsOffice/Index.vue')
const ProductOfficeCreate = () => import('src/pages/ProductsOffice/Create.vue')
const ProductOfficeDetail = () => import('src/pages/ProductsOffice/Details.vue')

//Services
const ServiceIndex = () => import('src/pages/Services/Index.vue')
const ServiceCreate = () => import('src/pages/Services/Create.vue')

//Spends
const SpendIndex = () => import('src/pages/Spends/Index.vue')
const SpendCreate = () => import('src/pages/Spends/Create.vue')
const SpendDetail = () => import('src/pages/Spends/Details.vue')

//Brands
const BrandIndex = () => import('src/pages/Brands/Index.vue')
const BrandCreate = () => import('src/pages/Brands/Create.vue')

//ProductsType
const ProductTypeIndex = () => import('src/pages/ProductsType/Index.vue')
const ProductTypeCreate = () => import('src/pages/ProductsType/Create.vue')

//Office
const OfficesIndex = () => import('src/pages/Offices/Index.vue')
const OfficesCreate = () => import('src/pages/Offices/Create.vue')
const OfficesDetail = () => import('src/pages/Offices/Details.vue')

//StructureComprabante
const StructureComprobantesIndex = () =>
  import('src/pages/StructureComprobantes/Index.vue')
const StructureComprobantesCreate = () =>
  import('src/pages/StructureComprobantes/Create.vue')

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
let ProductsMenu = {
  path: '/products',
  component: DashboardLayout,
  redirect: '/products/index',
  name: 'Productos',
  children: [
    {
      path: 'index',
      name: 'Administracion Productos',
      components: { default: ProductIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Productos',
      components: { default: ProductCreate }
    },
    {
      path: 'details/:id',
      name: 'Detalles Producto',
      components: { default: ProductDetail }
    }
  ]
}
let ProductOfficesMenu = {
  path: '/productsoffice',
  component: DashboardLayout,
  redirect: '/products/index',
  name: 'Productos Por Sucursal',
  children: [
    {
      path: 'index',
      name: 'Administracion Productos Por Sucursal',
      components: { default: ProductOfficeIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Productos Por Sucursal',
      components: { default: ProductOfficeCreate }
    },
    {
      path: 'details/:id',
      name: 'Detalles Producto Por Sucursal',
      components: { default: ProductOfficeDetail }
    }
  ]
}
let ServicesMenu = {
  path: '/services',
  component: DashboardLayout,
  redirect: '/services/index',
  name: 'Servicios',
  children: [
    {
      path: 'index',
      name: 'Administracion Servicios',
      components: { default: ServiceIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Servicios',
      components: { default: ServiceCreate }
    }
  ]
}
let SpendMenu = {
  path: '/spends',
  component: DashboardLayout,
  redirect: '/spends/index',
  name: 'Gastos',
  children: [
    {
      path: 'index',
      name: 'Administracion Gastos',
      components: { default: SpendIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Gasto',
      components: { default: SpendCreate }
    },
    {
      path: 'details/:id',
      name: 'Detalles Gasto',
      components: { default: SpendDetail }
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
      components: { default: SellerIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Vendedor',
      components: { default: SellerCreate }
    },
    {
      path: 'details/:id',
      name: 'Detalles Vendedor',
      components: { default: SellerDetail }
    }
  ]
}
let DeliveryMenu = {
  path: '/deliveries',
  component: DashboardLayout,
  redirect: '/deliveries/index',
  name: 'Mensajeros',
  children: [
    {
      path: 'index',
      name: 'Administracion Mensajeros',
      components: { default: DeliveryIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Mensajero',
      components: { default: DeliveryCreate }
    },
    {
      path: 'details/:id',
      name: 'Detalles Mensajero',
      components: { default: DeliveryDetail }
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
let officeMenu = {
  path: '/offices',
  component: DashboardLayout,
  redirect: '/offices/index',
  name: 'Offices',
  children: [
    {
      path: 'index',
      name: 'Administracion Sucursales',
      components: { default: OfficesIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Sucursal',
      components: { default: OfficesCreate }
    }
  ]
}
let structureComprobanteMenu = {
  path: '/structureComprobantes',
  component: DashboardLayout,
  redirect: '/structureComprobantes/index',
  name: 'Comprobantes',
  children: [
    {
      path: 'index',
      name: 'Administracion Comprobantes',
      components: { default: StructureComprobantesIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Comprobante',
      components: { default: StructureComprobantesCreate }
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
  ProductsMenu,
  ProductOfficesMenu,
  ServicesMenu,
  brandMenu,
  SellerMenu,
  DeliveryMenu,
  SpendMenu,
  productTypeMenu,
  officeMenu,
  structureComprobanteMenu,
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

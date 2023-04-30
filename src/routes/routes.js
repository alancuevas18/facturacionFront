import DashboardLayout from 'src/pages/Layout/DashboardLayout.vue'
import BillingLayout from 'src/pages/BillingLayout/Layout.vue'
import AuthLayout from 'src/pages/AuthLayout/AuthLayout.vue'

//Login
const Login = () => import('src/pages/Auth/Login.vue')

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
//Deliveries
const DeductionsIndex = () => import('src/pages/Deductions/Index.vue')
const DeductionsCreate = () => import('src/pages/Deductions/Create.vue')
//Products
const ProductIndex = () => import('src/pages/Products/Index.vue')
const ProductCreate = () => import('src/pages/Products/Create.vue')
const ProductDetail = () => import('src/pages/Products/Details.vue')

//ProductsOffice
const ProductOfficeIndex = () => import('src/pages/ProductsOffice/Index.vue')
const ProductOfficeCreate = () => import('src/pages/ProductsOffice/Create.vue')

//Services
const ServiceIndex = () => import('src/pages/Services/Index.vue')
const ServiceCreate = () => import('src/pages/Services/Create.vue')

//ServicesOffice
const ServiceOfficeIndex = () => import('src/pages/ServicesOffice/Index.vue')
const ServiceOfficeCreate = () => import('src/pages/ServicesOffice/Create.vue')

//ProductsOffice
const EntranceIndex = () => import('src/pages/Entrance/Index.vue')
const EntranceCreate = () => import('src/pages/Entrance/Create.vue')
const EntranceDetail = () => import('src/pages/Entrance/Details.vue')

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

//Shopping
const ShoppingIndex = () => import('src/pages/Shopping/Index.vue')
const ShoppingPending = () => import('src/pages/Shopping/ShoppingPending.vue')
const ShoppingCreate = () => import('src/pages/Shopping/Create.vue')
const ShoppingDetail = () => import('src/pages/Shopping/Details.vue')
//Pyment
const PaymentCreate = () => import('src/pages/Payments/Create.vue')
const PaymentDetail = () => import('src/pages/Payments/Details.vue')

//StructureComprabante
const StructureComprobantesIndex = () =>
  import('src/pages/StructureComprobantes/Index.vue')
const StructureComprobantesCreate = () =>
  import('src/pages/StructureComprobantes/Create.vue')
//Departures
const DeparturesIndex = () => import('src/pages/Departures/Index.vue')
const DeparturesCreate = () => import('src/pages/Departures/Create.vue')
const DeparturesDetail = () => import('src/pages/Departures/Details.vue')

//Users
const UsersIndex = () => import('src/pages/Users/Index.vue')
const UsersCreate = () => import('src/pages/Users/Create.vue')
const UsersRols = () => import('src/pages/Users/Rols.vue')

//Billing Menu
const BillDashBoardIndex = () =>
  import('src/pages/BillMenu/BillDashboard/Index.vue')

//Shift
const ShiftIndex = () => import('src/pages/BillMenu/Shift/Index.vue')
const ShiftCreate = () => import('src/pages/BillMenu/Shift/Create.vue')
// const ShiftDetail = () => import('src/pages/BillMenu/Shift/Details.vue')

//Quotation
const QuotationIndex = () => import('src/pages/BillMenu/Quotation/Index.vue')
// const QuotationCreate = () => import('src/pages/BillMenu/Quotation/Create.vue')
// const QuotationDetail = () => import('src/pages/BillMenu/Quotation/Details.vue')

//Returns
const ReturnsIndex = () => import('src/pages/BillMenu/Returns/Index.vue')
// const ReturnsCreate = () => import('src/pages/BillMenu/Returns/Create.vue')
// const ReturnsDetail = () => import('src/pages/BillMenu/Returns/Details.vue')

//cashClose
const cashCloseIndex = () => import('src/pages/BillMenu/cashClose/Index.vue')
const cashCloseCreate = () => import('src/pages/BillMenu/cashClose/Create.vue')
// const cashCloseDetail = () => import('src/pages/BillMenu/cashClose/Details.vue')

//SpendsType
const SpendsTypeIndex = () => import('src/pages/SpendsType/Index.vue')
const SpendsTypeCreate = () => import('src/pages/SpendsType/Create.vue')

//inventoryadjustment
const InventoryadjustmentIndex = () =>
  import('src/pages/Inventoryadjustment/Index.vue')
const InventoryadjustmentCreate = () =>
  import('src/pages/Inventoryadjustment/Create.vue')
const InventoryadjustmentDetail = () =>
  import('src/pages/Inventoryadjustment/Details.vue')
//bill
const billIndex = () => import('src/pages/BillMenu/bill/Index.vue')
const billCreate = () => import('src/pages/BillMenu/bill/Create.vue')
// const billDetail = () => import('src/pages/BillMenu/bill/Details.vue')

let clientMenu = {
  path: '/clients',
  component: DashboardLayout,
  redirect: '/clients/index',
  name: 'Clientes',
  children: [
    {
      path: 'index',
      name: 'Administracion Clientes',
      components: { default: ClientIndex },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'create/:id?',
      name: 'Crear Clientes',
      components: { default: ClientCreate },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'details/:id',
      name: 'Detalles Cliente',
      components: { default: ClientDetail },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
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
      components: { default: SupplierIndex },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'create/:id?',
      name: 'Crear Suplidor',
      components: { default: SupplierCreate },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'details/:id',
      name: 'Detalles Suplidor',
      components: { default: SupplierDetail },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
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
      components: { default: ProductIndex },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'create/:id?',
      name: 'Crear Productos',
      components: { default: ProductCreate },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'details/:id',
      name: 'Detalles Producto',
      components: { default: ProductDetail },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    }
  ]
}
let ProductOfficesMenu = {
  path: '/productsoffice',
  component: DashboardLayout,
  redirect: '/productsoffice/index',
  name: 'Productos Por Sucursal',
  children: [
    {
      path: 'index',
      name: 'Administracion Productos Por Sucursal',
      components: { default: ProductOfficeIndex },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'create/:id?',
      name: 'Crear Productos Por Sucursal',
      components: { default: ProductOfficeCreate },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
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
      components: { default: ServiceIndex },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'create/:id?',
      name: 'Crear Servicios',
      components: { default: ServiceCreate },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    }
  ]
}
let ServiceOfficesMenu = {
  path: '/servicesoffice',
  component: DashboardLayout,
  redirect: '/servicesoffice/index',
  name: 'Servicios Por Sucursal',
  children: [
    {
      path: 'index',
      name: 'Administracion Servicios Por Sucursal',
      components: { default: ServiceOfficeIndex },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'create/:id?',
      name: 'Crear Servicios Por Sucursal',
      components: { default: ServiceOfficeCreate },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    }
  ]
}
let EntranceMenu = {
  path: '/entrance',
  component: DashboardLayout,
  redirect: '/entrance/index',
  name: 'Entradas',
  children: [
    {
      path: 'index',
      name: 'Administracion Entradas',
      components: { default: EntranceIndex },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'create/:id?',
      name: 'Crear Entrada',
      components: { default: EntranceCreate },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'details/:id',
      name: 'Detalles Entrada',
      components: { default: EntranceDetail },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    }
  ]
}
let ShoppingeMenu = {
  path: '/shopping',
  component: DashboardLayout,
  redirect: '/shopping/index',
  name: 'Compras',
  children: [
    {
      path: 'index',
      name: 'Administracion compras',
      components: { default: ShoppingIndex },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'Shoppingpending',
      name: 'Compras Pendientes de pago',
      components: { default: ShoppingPending },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },

    {
      path: 'create/:id?',
      name: 'Crear compras',
      components: { default: ShoppingCreate },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'details/:id',
      name: 'Detalles compras',
      components: { default: ShoppingDetail },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
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
      components: { default: SpendIndex },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'create/:id?',
      name: 'Crear Gasto',
      components: { default: SpendCreate },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'details/:id',
      name: 'Detalles Gasto',
      components: { default: SpendDetail },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    }
  ]
}
let SellerMenu = {
  path: '/sellers',
  component: DashboardLayout,
  redirect: '/sellers/index',
  name: 'Rootes',
  children: [
    {
      path: 'index',
      name: 'AdministracionRootes',
      components: { default: SellerIndex },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'create/:id?',
      name: 'CrearRoot',
      components: { default: SellerCreate },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'details/:id',
      name: 'DetallesRoot',
      components: { default: SellerDetail },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
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
      components: { default: DeliveryIndex },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'create/:id?',
      name: 'Crear Mensajero',
      components: { default: DeliveryCreate },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'details/:id',
      name: 'Detalles Mensajero',
      components: { default: DeliveryDetail },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
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
      components: { default: BrandIndex },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'create/:id?',
      name: 'Crear Marca',
      components: { default: BrandCreate },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
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
      components: { default: OfficesIndex },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'create/:id?',
      name: 'Crear Sucursal',
      components: { default: OfficesCreate },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
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
      components: { default: StructureComprobantesIndex },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'create/:id?',
      name: 'Crear Comprobante',
      components: { default: StructureComprobantesCreate },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
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
      components: { default: ProductTypeIndex },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'create/:id?',
      name: 'Crear Tipo de Marca',
      components: { default: ProductTypeCreate },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    }
  ]
}
let paymentMenu = {
  path: '/Payments',
  component: DashboardLayout,
  redirect: '/Shopping/index',
  name: 'Pagos',
  children: [
    {
      path: 'create/:id?',
      name: 'Crear Pago',
      components: { default: PaymentCreate },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'details/:id?',
      name: 'Detalle de pago',
      components: { default: PaymentDetail },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    }
  ]
}
let DeparturesMenu = {
  path: '/departures',
  component: DashboardLayout,
  redirect: '/departures/index',
  name: 'Salidas',
  children: [
    {
      path: 'index',
      name: 'Administracion Salidas',
      components: { default: DeparturesIndex },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'create/:id?',
      name: 'Crear Salida',
      components: { default: DeparturesCreate },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'details/:id',
      name: 'Detalles Salida',
      components: { default: DeparturesDetail },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    }
  ]
}
let UsersMenu = {
  path: '/users',
  component: DashboardLayout,
  redirect: '/users/index',
  name: 'Usuarios',
  children: [
    {
      path: 'index',
      name: 'Administracion Usuarios',
      components: { default: UsersIndex },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'create/:id?',
      name: 'Crear Usuario',
      components: { default: UsersCreate },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    },
    {
      path: 'rols/:id',
      name: 'Rol de Usuario',
      components: { default: UsersRols },
      meta: {
        needsAuth: true,
        validRols: 'Admin,Root'
      }
    }
  ]
}
//Billing Menu
let BillDashboard = {
  path: '/billDashboard',
  component: BillingLayout,
  redirect: '/billDashboard/index',
  name: 'Facturacion',
  children: [
    {
      path: 'index',
      name: 'DashBoard Factura',
      components: { default: BillDashBoardIndex }
    }
  ]
}
let ShiftMenu = {
  path: '/billDashboard/shift',
  component: BillingLayout,
  redirect: '/billDashboard/shift/index',
  name: 'Turnos',
  children: [
    {
      path: 'index',
      name: 'Administracion de Turnos',
      components: { default: ShiftIndex }
    },
    {
      path: 'create/:id?',
      name: 'Abrir Turno',
      components: { default: ShiftCreate }
    }
  ]
}
let QuotationMenu = {
  path: '/billDashboard/quotation',
  component: BillingLayout,
  redirect: '/billDashboard/quotation/index',
  name: 'Cotizaciones',
  children: [
    {
      path: 'index',
      name: 'Administracion de Cotizaciones',
      components: { default: QuotationIndex }
    }
  ]
}
let ReturnsMenu = {
  path: '/billDashboard/returns',
  component: BillingLayout,
  redirect: '/billDashboard/returns/index',
  name: 'Devoluciones',
  children: [
    {
      path: 'index',
      name: 'Administracion de Devoluciones',
      components: { default: ReturnsIndex }
    }
  ]
}
let cashCloseMenu = {
  path: '/billDashboard/cashClose',
  component: BillingLayout,
  redirect: '/billDashboard/cashClose/index',
  name: 'Cierre de Caja',
  children: [
    {
      path: 'index',
      name: 'Administracion de Cierre de Caja',
      components: { default: cashCloseIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Cierre de Caja',
      components: { default: cashCloseCreate }
    }
  ]
}
let billMenu = {
  path: '/billDashboard/bill',
  component: BillingLayout,
  redirect: '/billDashboard/bill/index',
  name: 'Factura',
  children: [
    {
      path: 'index',
      name: 'Administracion de Facturas',
      components: { default: billIndex }
    },
    {
      path: 'create',
      name: 'Crear Factura',
      components: { default: billCreate }
    }
  ]
}
let deductionMenu = {
  path: '/deductions',
  component: DashboardLayout,
  redirect: '/deduction/index',
  name: 'Retenciones',
  children: [
    {
      path: 'index',
      name: 'Administracion Retenciones',
      components: { default: DeductionsIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Retenciones',
      components: { default: DeductionsCreate }
    }
  ]
}
let SpendsTypeMenu = {
  path: '/SpendsType',
  component: DashboardLayout,
  redirect: '/SpendsType/index',
  name: 'Tipogasto',
  children: [
    {
      path: 'index',
      name: 'Administracion Tipo de gasto',
      components: { default: SpendsTypeIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Tipo de gasto',
      components: { default: SpendsTypeCreate }
    }
  ]
}
let InventoryadjustmentMenu = {
  path: '/Inventoryadjustment',
  component: DashboardLayout,
  redirect: '/Inventoryadjustment/index',
  name: 'Inventoryadjustment',
  children: [
    {
      path: 'index',
      name: 'Lista de Ajuste de inventarios',
      components: { default: InventoryadjustmentIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Ajuste',
      components: { default: InventoryadjustmentCreate }
    },

    {
      path: 'details/:id',
      name: 'Detalles Ajuste de inventario',
      components: { default: InventoryadjustmentDetail }
    }
  ]
}
let authPages = {
  path: '/',
  component: AuthLayout,
  name: 'Authentication',
  children: [
    {
      path: '/login',
      name: 'Login',
      component: Login
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
  ServiceOfficesMenu,
  EntranceMenu,
  ShoppingeMenu,
  paymentMenu,
  DeparturesMenu,
  UsersMenu,
  //Billing
  BillDashboard,
  ShiftMenu,
  QuotationMenu,
  ReturnsMenu,
  cashCloseMenu,
  billMenu,
  deductionMenu,
  SpendsTypeMenu,
  InventoryadjustmentMenu,
  //Auth
  authPages,
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    name: 'Dashboard layout',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        components: { default: Dashboard },
        meta: {
          needsAuth: true,
          validRols: '*'
        }
      }
    ]
  },
  { path: '*', component: NotFound }
]

export default routes

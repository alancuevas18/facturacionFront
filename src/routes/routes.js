import DashboardLayout from 'src/pages/Layout/DashboardLayout.vue'
import BillingLayout from 'src/pages/BillingLayout/Layout.vue'

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

//StructureComprabante
const StructureComprobantesIndex = () =>
  import('src/pages/StructureComprobantes/Index.vue')
const StructureComprobantesCreate = () =>
  import('src/pages/StructureComprobantes/Create.vue')
//Departures
const DeparturesIndex = () => import('src/pages/Departures/Index.vue')
const DeparturesCreate = () => import('src/pages/Departures/Create.vue')
const DeparturesDetail = () => import('src/pages/Departures/Details.vue')

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
const InventoryadjustmentIndex = () => import('src/pages/Inventoryadjustment/Index.vue')
const InventoryadjustmentCreate = () => import('src/pages/Inventoryadjustment/Create.vue')
const InventoryadjustmentDetail = () => import('src/pages/Inventoryadjustment/Details.vue')
//bill
const billIndex = () => import('src/pages/BillMenu/bill/Index.vue')
// const billCreate = () => import('src/pages/BillMenu/bill/Create.vue')
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
  redirect: '/productsoffice/index',
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
let ServiceOfficesMenu = {
  path: '/servicesoffice',
  component: DashboardLayout,
  redirect: '/servicesoffice/index',
  name: 'Servicios Por Sucursal',
  children: [
    {
      path: 'index',
      name: 'Administracion Servicios Por Sucursal',
      components: { default: ServiceOfficeIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Servicios Por Sucursal',
      components: { default: ServiceOfficeCreate }
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
      components: { default: EntranceIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Entrada',
      components: { default: EntranceCreate }
    },
    {
      path: 'details/:id',
      name: 'Detalles Entrada',
      components: { default: EntranceDetail }
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
      components: { default: ShoppingIndex }
    },
    {
      path: 'Shoppingpending',
      name: 'Compras Pendientes de pago',
      components: { default: ShoppingPending }
    },

    {
      path: 'create/:id?',
      name: 'Crear compras',
      components: { default: ShoppingCreate }
    },
    {
      path: 'details/:id',
      name: 'Detalles compras',
      components: { default: ShoppingDetail }
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
let paymentMenu = {
  path: '/Payments',
  component: DashboardLayout,
  redirect: '/Shopping/index',
  name: 'Pagos',
  children: [
    {
      path: 'create/:id?',
      name: 'Crear Pago',
      components: { default: PaymentCreate }
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
      name: 'Administracion Entradas',
      components: { default: DeparturesIndex }
    },
    {
      path: 'create/:id?',
      name: 'Crear Entrada',
      components: { default: DeparturesCreate }
    },
    {
      path: 'details/:id',
      name: 'Detalles Entrada',
      components: { default: DeparturesDetail }
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
  name: 'Turnos',
  children: [
    {
      path: 'index',
      name: 'Administracion de Cierre de Caja',
      components: { default: cashCloseIndex }
    },
    {
      path: 'create/:id?',
      name: 'Cierre de Caja',
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
      name: 'Administracion de Devoluciones',
      components: { default: billIndex }
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
  //Billing
  BillDashboard,
  ShiftMenu,
  QuotationMenu,
  ReturnsMenu,
  cashCloseMenu,
  billMenu,
  DeparturesMenu,
  deductionMenu,
  SpendsTypeMenu,
  InventoryadjustmentMenu,
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

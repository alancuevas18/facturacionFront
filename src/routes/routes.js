import DashboardLayout from 'src/pages/Layout/DashboardLayout.vue';
// GeneralViews
import NotFound from 'src/pages/GeneralViews/NotFoundPage.vue';

// Dashboard pages
const Dashboard = () =>
  import('src/pages/Dashboard/Dashboard.vue');


const ClientIndex = () => import('src/pages/Clients/Index.vue');
const ClientCreate = () => import('src/pages/Clients/Create.vue');
const ClientDetail = () => import('src/pages/Clients/Details.vue');

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
    },
  ]
};



const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home'
  },
  clientMenu,
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
      },
    ]
  },
  { path: '*', component: NotFound }
];

export default routes;

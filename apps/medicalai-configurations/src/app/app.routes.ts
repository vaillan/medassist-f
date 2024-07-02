import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PublicGuard } from './core/guards/public.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '/med',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'med',
        children: [
          {
            path: '',
            loadChildren: () => import("./modules/med/med.module").then(m => m.MedModule)
          },
          {
            path: 'users',
            loadChildren: () => import("./modules/usuarios/usuarios.module").then(m => m.UsuariosModule),
            canMatch: [AuthGuard]
          },
          {
            path: 'auth',
            loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule),
            canMatch: [PublicGuard]
          },
          {
            path: "permissions",
            loadChildren: () => import("./modules/permisos/permisos.module").then(m => m.PermisosModule),
            canMatch: [AuthGuard]
          }
        ],
        data: {
          breadcrumb: 'Smart Medical',
        },
      },
    ]
  },
];

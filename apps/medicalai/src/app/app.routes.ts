import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PublicGuard } from './core/guards/public.guard';
import { AuthGuard } from './core/guards/auth.guard';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: '/med',
        pathMatch: 'full',
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
                        loadChildren: () =>
                            import('./modules/med/med.module').then(
                                (m) => m.MedModule
                            ),
                    },
                    {
                        path: 'auth',
                        loadChildren: () =>
                            import('./modules/auth/auth.module').then(
                                (m) => m.AuthModule
                            ),
                        canMatch: [PublicGuard],
                    },
                    {
                        path: 'profile',
                        loadChildren: () =>
                            import('./modules/perfil/perfil.module').then(
                                (m) => m.PerfilModule
                            ),
                        canMatch: [AuthGuard],
                    },
                ],
                data: {
                    breadcrumb: 'Smart Medical',
                },
            },
        ],
    },
];

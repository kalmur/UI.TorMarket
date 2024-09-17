import { Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { AdminHomeComponent } from './core/components/admin-home/admin-home.component';
import { ProductListComponent } from './core/components/products/product-list/product-list.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: AdminHomeComponent,
        children: [
            {
                path: 'products',
                component: ProductListComponent
            }
        ]
    }
];

import { Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { AdminHomeComponent } from './core/components/admin-home/admin-home.component';
import { ProductListComponent } from './core/components/products/product-list/product-list.component';
import { RegisterComponent } from './core/components/register/register.component';
import { CreateListingComponent } from './core/components/create-listing/create-listing.component';
import { ElectronicsComponent } from './core/components/categories/electronics/electronics.component';

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
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'sell',
        component: CreateListingComponent
    },
    {
        path: 'electronics',
        component: ElectronicsComponent
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

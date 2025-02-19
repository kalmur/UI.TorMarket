import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { ProductListComponent } from './features/product/product-list/product-list.component';
import { ElectronicsComponent } from './features/product/product-categories/electronics/electronics.component';
import { GamesComponent } from './features/product/product-categories/games/games.component';
import { ToysComponent } from './features/product/product-categories/toys/toys.component';
import { ClothingComponent } from './features/product/product-categories/clothing/clothing.component';
import { VehiclesComponent } from './features/product/product-categories/vehicles/vehicles.component';
import { PetsComponent } from './features/product/product-categories/pets/pets.component';
import { OtherComponent } from './features/product/product-categories/other/other.component';
import { SellProductComponent } from './features/product/sell-product/sell-product.component';
import { AuthPromptComponent } from './core/auth/auth-prompt/auth-prompt.component';

export const routes: Routes = [
    { path: 'sell', component: SellProductComponent },
    { path: 'auth-prompt', component: AuthPromptComponent},
    { path: 'electronics', component: ElectronicsComponent },
    { path: 'games', component: GamesComponent },
    { path: 'toys', component: ToysComponent },
    { path: 'clothing', component: ClothingComponent },
    { path: 'vehicles', component: VehiclesComponent },
    { path: 'pets', component: PetsComponent },
    { path: 'other', component: OtherComponent },
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'products',
                component: ProductListComponent
            }
        ]
    }
];

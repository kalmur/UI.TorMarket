import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { ProductListComponent } from './features/product/components/product-list/product-list.component';
import { ElectronicsComponent } from './features/product-category/components/electronics/electronics.component';
import { GamesComponent } from './features/product-category/components/games/games.component';
import { ToysComponent } from './features/product-category/components/toys/toys.component';
import { ClothingComponent } from './features/product-category/components/clothing/clothing.component';
import { VehiclesComponent } from './features/product-category/components/vehicles/vehicles.component';
import { PetsComponent } from './features/product-category/components/pets/pets.component';
import { OtherComponent } from './features/product-category/components/other/other.component';
import { SellProductComponent } from './features/product/components/sell-product/sell-product.component';
import { AuthPromptComponent } from './core/auth/auth-prompt/auth-prompt.component';
import { UserProfileDetailComponent } from './features/user-profile/user-profile-detail/user-profile-detail.component';

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
    { path: 'profile', component: UserProfileDetailComponent},
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

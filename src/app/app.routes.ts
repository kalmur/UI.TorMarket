import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { AuthPromptComponent } from './core/auth/auth-prompt/auth-prompt.component';
import { UserProfileDetailComponent } from './features/user-profile/user-profile-detail/user-profile-detail.component';
import { ElectronicsComponent } from './features/categories/components/electronics/electronics.component';
import { GamesComponent } from './features/categories/components/games/games.component';
import { ToysComponent } from './features/categories/components/toys/toys.component';
import { ClothingComponent } from './features/categories/components/clothing/clothing.component';
import { VehiclesComponent } from './features/categories/components/vehicles/vehicles.component';
import { PetsComponent } from './features/categories/components/pets/pets.component';
import { OtherComponent } from './features/categories/components/other/other.component';
import { ListingListComponent } from './features/listings/components/listing-list/listing-list.component';
import { CreateListingComponent } from './features/listings/components/create-listing/create-listing.component';
import { EditListingComponent } from './features/listings/components/edit-listing/edit-listing.component';
import { SearchedListingsComponent } from './features/listings/components/searched-listings/searched-listings.component';

export const routes: Routes = [
    { path: 'sell', component: CreateListingComponent },
    { path: 'edit', component: EditListingComponent },
    { path: 'searched-listings/:searchTerm', component: SearchedListingsComponent },
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
                path: 'listings',
                component: ListingListComponent
            }
        ]
    }
];

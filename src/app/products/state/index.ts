/* NgRx */

import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import { ProductState } from './product.reducer';


// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference ProductState cannot be added to app.
export interface State extends fromRoot.State {
    products: ProductState;
}

// Selector functions
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {
        if (currentProductId === 0) { // new product - no id defined
            return {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            };
        } else { // if the product id exists, return the product that matches; returns null if no product is currently selected
            return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
        }
    }
);

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
);

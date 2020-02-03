import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.actions';

export interface UserState {
    maskUserName: boolean;
}

const initialState: UserState = {
    maskUserName: true
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getmaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
);

export function reducer(state = initialState, action: UserActions): UserState {
    switch (action.type) {
        case UserActionTypes.MaskUserName:
            return {
                ...state,
                maskUserName: action.payload
            };
        default:
            return state;
    }
}

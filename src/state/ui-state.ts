import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type UIStateType = {
    createEventDialogOpen: boolean
}

let defaultUIState = {
    createEventDialogOpen: false
} as UIStateType;

const uiSlice = createSlice({
    name: 'ui',
    initialState: defaultUIState,
    reducers: {
        openDialog: (state: UIStateType, action: PayloadAction<void>) => {
            state.createEventDialogOpen = true
        },
        closeDialog: (state: UIStateType, action: PayloadAction<void>) => {
            state.createEventDialogOpen = false
        }
    }
});

export default uiSlice

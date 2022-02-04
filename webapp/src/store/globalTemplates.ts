// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import {default as client, OctoClient} from '../octoClient'
import {Board} from '../blocks/board'

import {RootState} from './index'

// ToDo: move this to team templates or simply templates

export const fetchGlobalTemplates = createAsyncThunk(
    'globalTemplates/fetch',
    async () => {
        const rootClient = new OctoClient(client.serverUrl, '0')
        const templates = await rootClient.getTeamTemplates() // ToDo: pass team id?
        return templates.sort((a, b) => a.title.localeCompare(b.title))
    },
)

const globalTemplatesSlice = createSlice({
    name: 'globalTemplates',
    initialState: {value: []} as {value: Board[]},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGlobalTemplates.fulfilled, (state, action) => {
            state.value = action.payload || []
        })
    },
})

export const {reducer} = globalTemplatesSlice

export function getGlobalTemplates(state: RootState): Board[] {
    return state.globalTemplates.value
}

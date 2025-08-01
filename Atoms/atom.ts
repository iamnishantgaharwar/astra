import { ColumnFiltersState, RowSelectionState, SortingState } from '@tanstack/react-table'
import { atom } from 'jotai'

export const searchAtom = atom("")

export const pageAtom = atom(1)

export const columnFilterAtom = atom<ColumnFiltersState>([])

export const sortingAtom = atom<SortingState>([])

export const rowSelectionAtom = atom<RowSelectionState>({})

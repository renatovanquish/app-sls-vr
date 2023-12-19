import React, { FC, useMemo, useEffect } from 'react'
import { useConfig } from 'hooks/useConfig'

export interface State {
  displaySidebarLeft: boolean
  displaySidebarRight: boolean
  displaySubHeader: boolean
  displayNavBarBottom: boolean
  displayModal: boolean
  displaySearch: boolean
  displayEditPage: boolean
  modalView: string
  searchText: string
  searchTab: number
  progress: number
  heightNavBar: number
  config: any
  itemListSelected: any
  itemListMode: string
}

const initialState = {
  displaySidebarLeft: false,
  displaySidebarRight: false,
  displayNavBarBottom: true,
  displaySubHeader: true,
  displayModal: false,
  displaySearch: false,
  displayEditPage: false,
  modalView: 'LOGIN_VIEW',
  searchText: '',
  searchTab: 0,
  progress: 0,
  heightNavBar: 0,
  config: {},
  itemListSelected: {},
  itemListMode: '',
}

type Action =
  | { type: 'OPEN_SIDEBAR_LEFT' }
  | { type: 'CLOSE_SIDEBAR_LEFT' }
  | { type: 'OPEN_SIDEBAR_RIGHT' }
  | { type: 'CLOSE_SIDEBAR_RIGHT' }
  | { type: 'SHOW_NAVBAR_BOTTOM' }
  | { type: 'HIDE_NAVBAR_BOTTOM' }
  | { type: 'SHOW_SUB_HEADER' }
  | { type: 'HIDE_SUB_HEADER' }
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'SET_MODAL_VIEW'; view: MODAL_VIEWS }
  | { type: 'SET_SEARCH_TEXT'; searchText: SearchText }
  | { type: 'SET_SEARCH_TAB'; searchTab: SearchTab }
  | { type: 'SET_HEIGHT_NAVBAR'; heightNavBar: HeightNavBar }
  | { type: 'SHOW_SEARCH' }
  | { type: 'HIDE_SEARCH' }
  | { type: 'SET_PROGRESS'; progress: Progress }
  | { type: 'SHOW_EDIT_PAGE' }
  | { type: 'HIDE_EDIT_PAGE' }
  | { type: 'SET_CONFIG'; config: Config }
  | { type: 'SET_ITEM_LIST_SELECTED'; itemListSelected: ItemListSelected }
  | { type: 'SET_ITEM_LIST_MODE'; itemListMode: ItemListMode }

type MODAL_VIEWS =
  | 'SIGNUP_VIEW'
  | 'LOGIN_VIEW'
  | 'FORGOT_VIEW'
  | 'CONFIRM_VIEW'
  | 'CHANGE_PASSWORD_VIEW'
  | 'COOKIES_MNG'
type SearchText = string
type SearchTab = number
type Progress = number
type HeightNavBar = number
type Config = {}
type ItemListSelected = {}
type ItemListMode = string

export const UIContext = React.createContext<State | any>(initialState)
UIContext.displayName = 'UIContext'

/**
 * uiReducer
 */
function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_SIDEBAR_LEFT': {
      return { ...state, displaySidebarLeft: true, displaySidebarRight: false }
    }
    case 'CLOSE_SIDEBAR_LEFT': {
      return { ...state, displaySidebarLeft: false, displaySidebarRight: false }
    }
    case 'OPEN_SIDEBAR_RIGHT': {
      return { ...state, displaySidebarRight: true, displaySidebarLeft: false }
    }
    case 'CLOSE_SIDEBAR_RIGHT': {
      return { ...state, displaySidebarRight: false, displaySidebarLeft: false }
    }
    case 'OPEN_MODAL': {
      return { ...state, displayModal: true, displaySidebarRight: false }
    }
    case 'CLOSE_MODAL': {
      return { ...state, displayModal: false }
    }
    case 'SHOW_NAVBAR_BOTTOM': {
      return { ...state, displayNavBarBottom: true }
    }
    case 'HIDE_NAVBAR_BOTTOM': {
      return { ...state, displayNavBarBottom: false }
    }
    case 'SHOW_SUB_HEADER': {
      return { ...state, displaySubHeader: true }
    }
    case 'HIDE_SUB_HEADER': {
      return { ...state, displaySubHeader: false }
    }
    case 'SET_MODAL_VIEW': {
      return { ...state, modalView: action.view }
    }
    case 'SET_SEARCH_TEXT': {
      return { ...state, searchText: action.searchText }
    }
    case 'SET_SEARCH_TAB': {
      return { ...state, searchTab: action.searchTab }
    }
    case 'SET_HEIGHT_NAVBAR': {
      return { ...state, heightNavBar: action.heightNavBar }
    }
    case 'SHOW_SEARCH': {
      return { ...state, displaySearch: true }
    }
    case 'HIDE_SEARCH': {
      return { ...state, displaySearch: false }
    }
    case 'SET_PROGRESS': {
      return { ...state, progress: action.progress }
    }
    case 'SHOW_EDIT_PAGE': {
      return { ...state, displayEditPage: true }
    }
    case 'HIDE_EDIT_PAGE': {
      return { ...state, displayEditPage: false }
    }
    case 'SET_CONFIG': {
      return { ...state, config: action.config }
    }
    case 'SET_ITEM_LIST_SELECTED': {
      return { ...state, itemListSelected: action.itemListSelected }
    }
    case 'SET_ITEM_LIST_MODE': {
      return { ...state, itemListMode: action.itemListMode }
    }
  }
}

interface Props {
  props?: React.ReactNode
}

export const UIProvider: FC<Props> = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState)

  const openSidebarLeft = () => dispatch({ type: 'OPEN_SIDEBAR_LEFT' })
  const closeSidebarLeft = () => dispatch({ type: 'CLOSE_SIDEBAR_LEFT' })
  const toggleSidebarLeft = () =>
    state.displaySidebarLeft
      ? dispatch({ type: 'CLOSE_SIDEBAR_LEFT' })
      : dispatch({ type: 'OPEN_SIDEBAR_LEFT' })
  const closeSidebarLeftIfPresent = () =>
    state.displaySidebarLeft && dispatch({ type: 'CLOSE_SIDEBAR_LEFT' })

  const openSidebarRight = () => dispatch({ type: 'OPEN_SIDEBAR_RIGHT' })
  const closeSidebarRight = () => dispatch({ type: 'CLOSE_SIDEBAR_RIGHT' })
  const toggleSidebarRight = () =>
    state.displaySidebarRight
      ? dispatch({ type: 'CLOSE_SIDEBAR_RIGHT' })
      : dispatch({ type: 'OPEN_SIDEBAR_RIGHT' })
  const closeSidebarRightIfPresent = () =>
    state.displaySidebarRight && dispatch({ type: 'CLOSE_SIDEBAR_RIGHT' })

  const closeSidebarIfPresent = () => {
    state.displaySidebarLeft && dispatch({ type: 'CLOSE_SIDEBAR_LEFT' })
    state.displaySidebarRight && dispatch({ type: 'CLOSE_SIDEBAR_RIGHT' })
  }

  const openModal = () => {
    dispatch({ type: 'OPEN_MODAL' })
  }
  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' })

  const setModalView = (view: MODAL_VIEWS) =>
    dispatch({ type: 'SET_MODAL_VIEW', view })

  const showSearch = () => dispatch({ type: 'SHOW_SEARCH' })
  const hideSearch = () => dispatch({ type: 'HIDE_SEARCH' })

  const setSearchText = (searchText: string) =>
    dispatch({ type: 'SET_SEARCH_TEXT', searchText })

  const setSearchTab = (searchTab: number) =>
    dispatch({ type: 'SET_SEARCH_TAB', searchTab })

  const setHeightNavBar = (heightNavBar: number) =>
    dispatch({ type: 'SET_HEIGHT_NAVBAR', heightNavBar })

  const showNavBarBottom = () => dispatch({ type: 'SHOW_NAVBAR_BOTTOM' })
  const hideNavBarBottom = () => dispatch({ type: 'HIDE_NAVBAR_BOTTOM' })

  const showSubHeader = () => dispatch({ type: 'SHOW_SUB_HEADER' })
  const hideSubHeader = () => dispatch({ type: 'HIDE_SUB_HEADER' })

  const showEditPage = () => dispatch({ type: 'SHOW_EDIT_PAGE' })
  const hideEditPage = () => dispatch({ type: 'HIDE_EDIT_PAGE' })

  const setProgress = (progress: number) =>
    dispatch({ type: 'SET_PROGRESS', progress })

  const setConfig = (config: any) => dispatch({ type: 'SET_CONFIG', config })
  
  const setItemListSelected = (itemListSelected: any) => dispatch({ type: 'SET_ITEM_LIST_SELECTED', itemListSelected })
  const setItemListMode = (itemListMode: string) => dispatch({ type: 'SET_ITEM_LIST_MODE', itemListMode })

  const { getConfig } = useConfig()

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const fetchConfig = async () => {
        const config = await getConfig({ id: 'DEFAULT' })
        dispatch({ type: 'SET_CONFIG', config })
      }
      fetchConfig()
    }
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      openSidebarLeft,
      closeSidebarLeft,
      openSidebarRight,
      closeSidebarRight,
      toggleSidebarLeft,
      closeSidebarLeftIfPresent,
      toggleSidebarRight,
      closeSidebarRightIfPresent,
      closeSidebarIfPresent,
      openModal,
      closeModal,
      setModalView,
      showSearch,
      hideSearch,
      showNavBarBottom,
      hideNavBarBottom,
      showSubHeader,
      hideSubHeader,
      setProgress,
      showEditPage,
      hideEditPage,
      setConfig,
      setSearchText,
      setSearchTab,
      setHeightNavBar,
      setItemListSelected,
      setItemListMode,
    }),
    [state]
  )

  return <UIContext.Provider value={value} {...props} />
}

/**
 * useUI Component
 */
export const useUI = () => {
  const context = React.useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

interface Props {
  children?: React.ReactNode
}

export const ManagedUIContext: FC<Props> = ({ children }) => (
  <UIProvider>{children}</UIProvider>
)

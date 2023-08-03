import { useReducer } from 'react'
import { AUTO_LANGUAGE } from '../constants'
import { type FromLanguage, type Language, type Action, type State } from '../types'
import {ListenVoice} from '../components/traductorgoogle'

// 1. Create a initialState
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

// 2. Create a reducer
function reducer (state: State, action: Action) {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    // lógica del estado dentro del reducer
    // porque lo evitamos en los componentes
    if (state.fromLanguage === AUTO_LANGUAGE) return state

    const loading = state.fromText !== ''

    return {
      ...state,
      loading,
      fromText: state.result,
      result: '',
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }
  if (type === 'SET_CERRAR_FROM_TEXT') {
    return {
      ...state,      
      fromText: '',
      result: '',
      loading: false
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state

    const loading = state.fromText !== ''

    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    if (state.toLanguage === action.payload) return state
    const loading = state.fromText !== ''

    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading
    }
  }

  if (type === 'SET_FROM_TEXT') {
    const loading = action.payload !== ''

    return {
      ...state,
      loading,
      fromText: action.payload,
      result: ''
    }
  }
  
  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }
  if (type === 'SET_RESULT_VOICE') {
    // lógica del estado dentro del reducer
    // porque lo evitamos en los componentes

    const loading = state.fromText !== ''

    return {
      ...state,
      loading,
      fromText: 'ListenVoice',
      result: ''
    }
  }

  return state
}

export function useStore () {
  // 3. usar el hook useReducer
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }
  const cerrarFromText = () => {
    dispatch({ type: 'SET_CERRAR_FROM_TEXT' })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }

  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }
  const setVoice = () => {
    dispatch({ type: 'SET_RESULT_VOICE' })
  }
  


  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setVoice,
    cerrarFromText,
    setResult
  }
}

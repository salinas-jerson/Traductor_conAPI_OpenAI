import { useReducer } from 'react'
import { AUTO_LANGUAGE } from '../constants'
import { type FromLanguage, type Language, type SolLanguage, type Action, type State } from '../types'


// 1. Create a initialState
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  toLanguage2: 'po',
  botLanguage:'',
  fromText: '',
  result: '',
  result2:'',
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
      result2: '',
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }
  if (type === 'SET_CERRAR_FROM_TEXT') {
    return {
      ...state,      
      fromText: '',
      result: '',
      result2: '',
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
      result2: '',
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
      result: '',
      result2: ''
    }
  }
  
  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }
  if (type === 'SET_RESULT2') {
    return {
      ...state,
      loading: false,
      result2 : action.payload
    }
  }
  if (type === 'SET_RESULT_VOICE') {
    // lógica del estado dentro del reducer
    // porque lo evitamos en los componentes

    const loading = state.fromText !== ''

    return {
      ...state,
      loading,
      fromText: 'xdxd',
      result: ''
    }
  }
  if (type === 'SET_Stop_VOICE') {
    // lógica del estado dentro del reducer
    // porque lo evitamos en los componentes

    const loading = state.fromText !== ''

    return {
      ...state,
      loading,
      fromText: action.payload,
      result: ''
    }
  }

  if (type === 'SET_BOTTON_LANGUAGE') {
    return {
      ...state,
      fromLanguage: action.payload,
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
    toLanguage2,
    botLanguage,
    fromText,
    result,
    result2,
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
    dispatch({ type: 'SET_TO_LANGUAGE',payload })
  }

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }
  const setResult2 = (payload: string) => {
    dispatch({ type: 'SET_RESULT2', payload })
  }
  const setbotLanguage = (payload: Language) => {
    dispatch({ type: 'SET_BOTTON_LANGUAGE', payload })
  }
  const setVoice = () => {
    dispatch({ type: 'SET_RESULT_VOICE' })
  }
  const setStopVoice = (payload: string) => {
    dispatch({ type: 'SET_Stop_VOICE', payload })
  }


  return {
    fromLanguage,
    toLanguage,
    toLanguage2,
    botLanguage,
    fromText,
    result,
    result2,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setbotLanguage,
    setVoice,
    setStopVoice,
    cerrarFromText,
    setResult,
    setResult2
  }
}

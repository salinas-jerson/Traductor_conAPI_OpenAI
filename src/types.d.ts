import { type AUTO_LANGUAGE, type SUPPORTED_LANGUAGES, type SUPPORTED_LANGUAGES_p } from './constants'

export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage
export type SolLanguage =  keyof typeof SUPPORTED_LANGUAGES_p

export interface State {
  fromLanguage: FromLanguage
  toLanguage: Language
  toLanguage2: Language
  botLanguage: string
  fromText: string
  result: string
  result2: string
  loading: boolean
}

export type Action =
  | { type: 'SET_FROM_LANGUAGE', payload: FromLanguage }
  | { type: 'INTERCHANGE_LANGUAGES' }
  | { type: 'SET_CERRAR_FROM_TEXT'}
  | { type: 'SET_TO_LANGUAGE', payload: Language}
  | { type: 'SET_FROM_TEXT', payload: string }
  | { type: 'SET_RESULT', payload: string }
  | { type: 'SET_RESULT2', payload: string }
  | { type: 'SET_BOTTON_LANGUAGE', payload: Language }
  | { type: 'SET_RESULT_VOICE' }
  | { type: 'SET_Stop_VOICE', payload: string }

  

export enum SectionType {
  From = 'from',
  To = 'to'
}

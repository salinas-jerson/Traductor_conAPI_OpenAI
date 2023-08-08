import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { SectionType, type FromLanguage, type Language, type SolLanguage } from '../types.d'
import '../App.css'
type Props =
  | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: SectionType.To, value: Language, onChange: (language: Language,language2 :SolLanguage) => void }

export const LanguageSelector = ({ onChange, type, value }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language, event.target.value as SolLanguage)
  }

  return (
    <div className="custom-button">
      <span className="button-text">
      <Form.Select aria-label='Selecciona el idioma' onChange={handleChange} value={value}>
        
      {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}

      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
      </span>
      <i className="icon i-chevron-down" aria-hidden="true"></i>
    </div>
    
  )
}

import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import { useDebounce } from './hooks/useDebounce'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'

import './App.css'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon,MicrofonoIcon, CerrarIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import { MyComponent } from './components/traductorgoogle'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { useStore } from './hooks/useStore'
import { translate } from './services/translate'
import { SectionType } from './types.d'

import {Confetti} from './components/confetti'
import {Emotic} from './components/emoticTris'
import {ImageList} from './components/ListImages'






function App () {
  const {
    loading,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
    cerrarFromText,
    setVoice
  } = useStore()

  const debouncedFromText = useDebounce(fromText, 300)

  useEffect(() => {
    if (debouncedFromText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(result => {
        if (result == null) return        
        setResult(result)
        
      })
      .catch(() => { 
      
        setResult('Error') })
  }, [debouncedFromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  const handleListen = () => { 
    return  (<MyComponent/>)

  }


  


  return (
    <body className='body1'>

      

    

    
      <Container fluid className='body ' >
      <h2 className='bg_v' >Translate</h2>
      
      

      <Row>
        <Col xs='auto' >
          <ImageList/>
        
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
          
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>                    
            <LanguageSelector 
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />           
            <div className='conten-flex' style={{ position: 'relative' }}>
            
            <div style={{ position: 'absolute', top: 0, right: 0, display: 'flex', flexDirection: 'row-reverse' }}>
            {fromText !== '' && (
              <Button
              variant='link' 
              onClick={cerrarFromText}>
                <CerrarIcon />
            </Button>
            )}

            
            

            </div>
            <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
            <Button
              variant='link'
              onClick={() => handleListen()}>
                <MicrofonoIcon 
                /> 
            </Button>
            

            </div>
            <TextArea 
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />

            </div>
          </Stack>

        </Col>

        <Col xs='auto' >
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <Stack  gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <div style={{ position: 'relative' }}>
            
            <TextArea
              loading={loading}
              type={SectionType.To}
              value={result}
              onChange={setResult}
            />
            {(result === 'Error') && < Emotic />}
            
            <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
            <Button
              variant='link'
              onClick={handleClipboard}>
                <ClipboardIcon />
            </Button>
            <Button
              variant='link'
              onClick={handleSpeak}>
                <SpeakerIcon />
            </Button>
            </div>

            </div>
          </Stack>
        </Col>
        <Col xs='auto' >
        <ImageList/>
        </Col>
      </Row>
    </Container>
    {(result !== '' && result !== 'Error') && <Confetti />}
    </body>
  )
}

export default App
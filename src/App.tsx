import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import { useDebounce } from './hooks/useDebounce'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'

import './App.css'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon,MicrofonoIcon, CerrarIcon,ApagMicrofonoIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import {ListenVoice,ListenVoiceWrite} from './components/traductorgoogle'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { useStore } from './hooks/useStore'
import { translate,translate2 } from './services/translate'
import { SectionType } from './types.d'

import {Confetti} from './components/confetti'
import {Emotic} from './components/emoticTris'
import {ImageList} from './components/ListImages'






function App () {
  const {
    loading,
    fromLanguage,
    toLanguage,    
    toLanguage2,
    fromText,
    result,
    result2,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
    setResult2,
    cerrarFromText,
    setbotLanguage,
    setStopVoice,
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
      
        setResult('Error') 
      })
      translate2({ fromLanguage, toLanguage2, text: debouncedFromText })
      .then(result2 => {
        if (result2 == null) return        
        setResult2(result2)
        
      })
      .catch(() => { 
      
        setResult2('Error')  
      })
        
  }, [debouncedFromText, fromLanguage, toLanguage,toLanguage2])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }
  const handleClipboard2 = () => {
    navigator.clipboard.writeText(result2).catch(() => {})
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  const handleSpeak2 = () => {
    const utterance = new SpeechSynthesisUtterance(result2)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage2]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  return (
    <div>
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
              onClick={() => {ListenVoice()}}
              >
                <MicrofonoIcon 
                /> 
            </Button>   
            <Button
              variant='link'
              onClick={() => {ListenVoiceWrite()}}
              >
                <ApagMicrofonoIcon 
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
        <Col>
          <Stack  gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage2}
              onChange={setToLanguage}
            />
            <div style={{ position: 'relative' }}>
            
            <TextArea
              loading={loading}
              type={SectionType.To}
              value={result2}
              onChange={setResult2}
            />
            {(result2 === 'Error') && < Emotic />}
            
            <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
            <Button
              variant='link'
              onClick={handleClipboard2}>
                <ClipboardIcon />
            </Button>
            <Button
              variant='link'
              onClick={handleSpeak2}>
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
    </div>
  )
}

export default App
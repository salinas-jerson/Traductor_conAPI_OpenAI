import { useState } from 'react';
import { LanguageSelector } from '../components/LanguageSelector'
import { FromLanguage, Language, SectionType } from '../types.d'
import {  SUPPORTED_LANGUAGES } from '../constants'
import { useStore } from '../hooks/useStore'
export const ImageList = () => {
    const imageUrls = [
        
      'images/Alemán.png',
      'images/Aimara.png',
      'images/Portugués.png',
      'images/Chino.png',
      'images/Español.png',
      'images/Francés.png',
      'images/Guaraní.png',
      'images/English.png',
      'images/Ruso.png',
    ];
    const {
      setbotLanguage
    } = useStore()
    type SupportedLanguages = {
      [key: string]: string;
    };
    
    const SUPPORTED_LANGUAGES0: SupportedLanguages = {
      en: 'English',
      es: 'Español',
      po: 'Potugués',
      fr: 'Francés',
      gn: 'Guaraní',
      qu: 'Quechua',
      ay: 'Aimara',
      ch: 'Chino',
      ru: 'Ruso',
      de: 'Alemán',
    };
    const handleImageClick = (url: string,title: Language) => {
        // Aquí puedes agregar la lógica que se ejecutará cuando se haga clic en una imagen
        <LanguageSelector 
              type={SectionType.To}
              value={title}
              onChange={setbotLanguage}
            />  
        console.log(`Se hizo clic en la imagen con URL: ${url}`);
      };
      const [hoveredImage, setHoveredImage] = useState<string | null>(null);
      const getFileNameWithoutExtension = (url: string) => {
        const parts = url.split('/');
        const fileNameWithExtension = parts[parts.length - 1];
        const fileNameWithoutExtension = fileNameWithExtension.substring(0, fileNameWithExtension.lastIndexOf('.'));
        return fileNameWithoutExtension;
      };
      const keyTitle = (title: string) => {
        const foundKey = Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
          <option key={key} value={key}>
            {literal}
          </option>
        ))
         Object.keys(SUPPORTED_LANGUAGES).find((key) => SUPPORTED_LANGUAGES0[key] === title);
  
        return foundKey;
      }

    return (
        <div>
        {imageUrls.map((url, index) => (
          <button
            key={index}
            
            onMouseEnter={() => setHoveredImage(url)}
            onMouseLeave={() => setHoveredImage(null)}
            style={{
                display: 'block',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              transform: hoveredImage === url ? 'scale(2.5)' : 'scale(2)',
              borderRadius: '50%', // Agregamos el borde circular al botón
                overflow: 'hidden'
            }}
            title={`Traducción - ${getFileNameWithoutExtension(url)}`} // Agregamos el título personalizado
            onClick={() => handleImageClick(url,keyTitle(title))}
          >
            <img
              src={url}
              alt={`Image ${index + 1}`}
              style={{ display: 'block', marginBottom: '10px',  objectFit: 'cover',borderRadius: '10px' }}
            />
          </button>
        ))}
      </div>
    );
  };

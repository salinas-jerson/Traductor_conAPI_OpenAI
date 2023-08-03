import { useState } from 'react';
export const ImageList = () => {
    const imageUrls = [
        
      'images/Alemán.png',
      'images/Aymara.png',
      'images/Portugués.png',
      'images/Chino.png',
      'images/Espanol.png',
      'images/Francés.png',
      'images/Guaraní.png',
      'images/English.png',
      'images/Ruso.png',
    ];
    const handleImageClick = (url: string) => {
        // Aquí puedes agregar la lógica que se ejecutará cuando se haga clic en una imagen
        console.log(`Se hizo clic en la imagen con URL: ${url}`);
      };
      const [hoveredImage, setHoveredImage] = useState<string | null>(null);
      const getFileNameWithoutExtension = (url: string) => {
        const parts = url.split('/');
        const fileNameWithExtension = parts[parts.length - 1];
        const fileNameWithoutExtension = fileNameWithExtension.substring(0, fileNameWithExtension.lastIndexOf('.'));
        return fileNameWithoutExtension;
      };

    return (
        <div>
        {imageUrls.map((url, index) => (
          <button
            key={index}
            onClick={() => handleImageClick(url)}
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

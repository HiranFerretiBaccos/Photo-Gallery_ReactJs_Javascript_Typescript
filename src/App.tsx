import { useState, useEffect, FormEvent } from 'react';
import * as C from './App.styles';
import * as Photos from './services/photos';
import { Photo } from './types/photo';
import { PhotoItem } from './components/PhotoItem';

const App = () => {
  const [loading, setLoading] = useState(false);                                //Um Estado que vai dizer se está Carregando ou Ñ.
  const [photos, setPhotos] = useState<Photo[]>([]);                            //Estado com Array para Armazenar as fotos e que setá do type Photo[]
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = async () => {                                              //Toda referência a alguma Requisição Externa terá o 'async'
    setLoading(true);                                                          //Só será true enquanto estiver carregando alguma coisa de fato.
    setPhotos(await Photos.getAll());                                          //Peguei a lista de fotos.
    setLoading(false);
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;

    if (file && file.size > 0) {                                                  //Se eu enviei algum Arquivo e tem Tamanho(Ou seja, deu certo?)
      setUploading(true);
      let result = await Photos.insert(file);
      setUploading(false);

      if (result instanceof Error) {
        alert(`${result.name} - ${result.message}`);
      } else {
        let newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList);
      }
    }
  }

  const handleDeleteClick = async (name: string) => {
    await Photos.deletePhoto(name);
    getPhotos();
  }

  return (
    <>
      <C.Container>
        <C.Area>
          <C.Header>Photo Gallery</C.Header>

          <C.UploadForm method='POST' onSubmit={handleFormSubmit}>
            <input type='file' name='image' />
            <input type='submit' name='Enviar' />
            {uploading && 'Enviando...'}
          </C.UploadForm>

          {/*Quando tiver o loading:*/}
          {loading &&
            <C.ScreenWarning>
              <div className='emoji'>✋</div>
              <div>Carregando...</div>
            </C.ScreenWarning>
          }

          {/*Quando Ñ tiver o loading e tiver fotos:*/}
          {!loading && photos.length > 0 &&
            <C.PhotoList>
              {photos.map((item, index) => (
                <PhotoItem key={index} url={item.url} name={item.name} onDelete={handleDeleteClick}
                />
              ))}
            </C.PhotoList>
          }

          {/* Quando Ñ tiver carregando e Ñ tiver fotos */}
          {!loading && photos.length === 0 &&
            <C.ScreenWarning>
              <div className='emoji'>😔</div>
              <div>Não há fotos cadastradas.</div>
            </C.ScreenWarning>
          }
        </C.Area>
      </C.Container>
    </>
  )
}

export default App;

//npm install npx create-react-app bonieky_3_project --template typescript
//npm install styled-components
//npm install -D @types/styled-components
//npm install uuid
//npm install -D @types/uuid
//npm install firebase (Um serviço específico que Hospeda as fotos do nosso projeto na Nuvem/Storage (Possui vários outros tipos de serviços))
import { Photo } from '../types/photo';                           //Importo meu type Photo e declaro no Array criado abaixo.
import { storage } from '../libs/firebase';
import { ref, listAll, getDownloadURL, uploadBytes, deleteObject  } from 'firebase/storage';  //4 carinhas do Firebase.
import { v4 as createId } from 'uuid';

//async await serve para Funções Assíncronas. Retorna uma Promise/Promessa de um Array de type Photo.
export const getAll = async () => {                               //Vai Retornar uma Lista de Fotos e será do type Array de Photo. 
    let list: Photo[] = [];

    //Cria a Referência da pasta, lê os Arquivos dessa pasta, faz um Loop nesses Arquivos, pega o Link direto da foto, monta o Array e retorna ele com todas as fots da lista.
    const imagesFolder = ref(storage, "images");                  //1 Carinha Como o próprio nome diz, faz Referência a algo. 2 Parâmetros.
    const photoList = await listAll(imagesFolder);                //2 Carinha lista toda a minha Referência.

    for (let i in photoList.items) {
        let photoUrl = await getDownloadURL(photoList.items[i]);  //3 Carinha que gera a URL.

        list.push({                                               //Cria o Array.
            name: photoList.items[i].name,                        //Insiro na minha list[] do type Photo[]:
            url: photoUrl
        });
    }

    return list;
}

export const insert = async (file: File) => {
    if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {

        let randomName = createId();
        let newFile = ref(storage, `images/${randomName}`);
        let upload = await uploadBytes(newFile, file);
        let photoUrl = await getDownloadURL(upload.ref);

        return { name: upload.ref.name, url: photoUrl } as Photo;

    } else {
        return new Error('Tipo de arquivo não permitido!');
    }
}

export const deletePhoto = async (name: string) => {
    let photoRef = ref(storage, `images/${name}`);
    await deleteObject(photoRef);
}
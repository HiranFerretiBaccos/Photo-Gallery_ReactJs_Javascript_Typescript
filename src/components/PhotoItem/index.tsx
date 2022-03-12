import * as C from './styles';

type Props = {
    url: string;
    name: string;
    onDelete: (name: string) => void;
}

export const PhotoItem = ({ url, name, onDelete }: Props) => {                            //Passando as 2 props na 1ª Etapa e que vem do type Props.
    return (
        <>
            <C.Container>
                <img src={url} alt={name} />
                {name}
                <button onClick={() => onDelete(name)}>Excluir</button>
            </C.Container>
        </>
    )
}
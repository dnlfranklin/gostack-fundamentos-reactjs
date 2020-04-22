import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import {
  Container,
  Title,
  ImportFileContainer,
  Footer,
  MessageBlock,
} from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const [messageBlock, setMessageBlock] = useState('');

  const history = useHistory();

  async function handleUpload(): Promise<void> {
    if (!uploadedFiles.length) {
      setMessageBlock('Nenhum arquivo foi enviado.');
      return;
    }

    setMessageBlock('Enviando arquivo...');

    const data = new FormData();

    uploadedFiles.map((file) => data.append('file', file.file));

    try {
      await api.post('/transactions/import', data);

      setUploadedFiles([]);

      setMessageBlock('Arquivo enviado. Transações importadas com sucesso!');

      setTimeout(() => history.goBack(), 2000);
    } catch (err) {
      setMessageBlock(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    const fileProps = files.map((file) => ({
      file,
      name: file.name,
      readableSize: filesize(file.size),
    }));

    setUploadedFiles(fileProps);
  }

  return (
    <>
      <Header size="small" active="import" />
      <Container>
        <Title>Importar uma transação</Title>
        {!!messageBlock && (
          <ImportFileContainer>
            <MessageBlock>{messageBlock}</MessageBlock>
          </ImportFileContainer>
        )}
        {!messageBlock && (
          <ImportFileContainer>
            <Upload onUpload={submitFile} />
            {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

            <Footer>
              <p>
                <img src={alert} alt="Alert" />
                Permitido apenas arquivos CSV
              </p>
              <button onClick={handleUpload} type="button">
                Enviar
              </button>
            </Footer>
          </ImportFileContainer>
        )}
      </Container>
    </>
  );
};

export default Import;

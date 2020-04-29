import React, { useState, FormEvent } from 'react';

import { useLocation } from 'react-router-dom';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container, Title, FormContainer, FormMessage } from './styles';

interface Message {
  message: string;
  type: 'error' | 'success';
}

const Create: React.FC = () => {
  const { pathname } = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');

  async function handlerAddTransaction(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const getMessages: Message[] = [];

    if (!title)
      getMessages.push({
        message: 'Título é obrigatório',
        type: 'error',
      });

    if (!value)
      getMessages.push({
        message: 'Valor é obrigatório',
        type: 'error',
      });

    if (!type)
      getMessages.push({
        message: 'O Tipo da transação é obrigatório',
        type: 'error',
      });

    if (!category)
      getMessages.push({
        message: 'Categoria é obrigatório',
        type: 'error',
      });

    if (getMessages.length) {
      setMessages(getMessages);
      return;
    }

    try {
      const transaction = { title, type, value, category };
      await api.post('/transactions', transaction);

      setMessages([
        {
          message: 'Transação criada com sucesso.',
          type: 'success',
        },
      ]);

      setTitle('');
      setType('');
      setValue('');
      setCategory('');
    } catch (err) {
      console.log(err);
      setMessages([
        {
          message: err.message,
          type: 'error',
        },
      ]);
    }
  }

  return (
    <>
      <Header active={pathname} size="small" />
      <Container>
        <Title>Criar uma nova transação</Title>
        {!!messages.length && (
          <FormMessage>
            {messages.map((message) => {
              if (message.type === 'error')
                return (
                  <div className="error" key={message.message}>
                    {message.message}
                  </div>
                );
              return (
                <div className="success" key={message.message}>
                  {message.message}
                </div>
              );
            })}
          </FormMessage>
        )}
        <FormContainer valueOfType={type} onSubmit={handlerAddTransaction}>
          <input
            type="text"
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={value}
            placeholder="Valor"
            onChange={(e) => setValue(e.target.value)}
          />
          <div>
            <button
              className="income"
              type="button"
              onClick={() => setType('income')}
            >
              <img src={income} alt="income" />
              <span>Income</span>
            </button>
            <button
              className="outcome"
              type="button"
              onClick={() => setType('outcome')}
            >
              <img src={outcome} alt="income" />
              <span>Outcome</span>
            </button>
          </div>
          <input
            type="text"
            value={category}
            placeholder="Categoria"
            onChange={(e) => setCategory(e.target.value)}
          />
          <button className="submit" type="submit">
            Enviar
          </button>
        </FormContainer>
      </Container>
    </>
  );
};

export default Create;

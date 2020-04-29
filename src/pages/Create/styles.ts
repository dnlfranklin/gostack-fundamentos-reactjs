import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  valueOfType: string;
}

export const Container = styled.div`
  width: 100%;
  max-width: 736px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-weight: 500;
  font-size: 36px;
  line-height: 54px;
  color: #363f5f;
  text-align: center;
`;

export const FormContainer = styled.form<FormProps>`
  background: #fff;
  margin-top: 10px;
  margin-bottom: 50px;
  border-radius: 5px;
  padding: 34px;

  input {
    width: 100%;
    margin-top: 20px;
    border: 1px solid #cecece;
    height: 50px;
    padding: 10px;
    color: #363f5f;

    &:focus {
      border: 1px solid lightgray;
    }
  }

  div {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      width: 48%;
      height: 50px;
      background: #fff;
      color: darkslategray;
      border: 1px solid #cecece;
      display: flex;
      align-items: center;
      justify-content: center;

      & + button {
        margin-left: 4%;
      }

      &.income {
        ${(props) =>
          props.valueOfType === 'income' &&
          css`
            background-color: #aef7b4;
          `}
      }

      &.outcome {
        ${(props) =>
          props.valueOfType === 'outcome' &&
          css`
            background-color: #fbdbe0;
          `}
      }

      img {
        width: 20px;
      }

      span {
        padding-left: 5px;
      }
    }
  }

  button.submit {
    position: right;
    margin-top: 20px;
    width: 100%;
    background: #ff872c;
    color: #fff;
    border-radius: 5px;
    padding: 15px 80px;
    border: 0;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#ff872c')};
    }
  }
`;

export const FormMessage = styled.div`
  background: #fff;
  margin-top: 40px;
  border-radius: 5px;
  padding: 10px;

  div.error {
    color: #ec0c0c;
  }

  div.success {
    color: #31c128;
  }
`;

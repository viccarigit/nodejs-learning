import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px; /** arredondamento dos cantos */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); /** conteudo na cor branca com 10% de transparencia */
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row; /** componentes dispostos em linha (um ao lado do outro) */
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form`
  margin-top: 30;
  display: flex;
  flex-direction: row;

  input {
    flex: 1; /** ocupa todo o espaco disponivel */
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  /*centraliza o conteudo do botao */
  display: flex;
  justify-content: center;
  align-items: center;
`;

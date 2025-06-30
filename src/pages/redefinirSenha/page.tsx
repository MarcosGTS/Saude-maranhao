import { useState } from 'react';
import styles from './redefinir-senha.module.css';
import { useNavigate } from 'react-router-dom';

const RedefinirSenha = () => {
  const [senhaAntiga, setSenhaAntiga] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmNovaSenha, setConfirmNovaSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (novaSenha !== confirmNovaSenha) {
      setMensagem('As novas senhas não coincidem.');
      return;
    }


    setMensagem('Senha redefinida com sucesso!');
  };

  const voltarParaLogin = () => {
    navigate('/login'); 
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Recupere sua senha</h2>
      <form className={styles.formulario} onSubmit={handleSubmit}>
        <h3>Senha</h3>

        <label>Digite sua senha antiga:</label>
        <input
          type="password"
          value={senhaAntiga}
          onChange={(e) => setSenhaAntiga(e.target.value)}
          required
        />

        <label>Digite sua nova senha:</label>
        <input
          type="password"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          required
        />

        <label>Repita a nova senha:</label>
        <input
          type="password"
          value={confirmNovaSenha}
          onChange={(e) => setConfirmNovaSenha(e.target.value)}
          required
        />

        <button type="submit">Salvar</button>

        <p className={styles.voltarLogin} onClick={voltarParaLogin}>
          Voltar para login
        </p>
        

        {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
      </form>
    </div>
  );
};

export default RedefinirSenha;

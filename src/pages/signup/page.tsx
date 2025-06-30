import { useState } from 'react';
import styles from './signup.module.css';
import { register } from '../../services/authService';
import SimpleDialog from '../../components/SimpleDialog';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      setMessage('Os emails não coincidem.');
      return;
    }

    if (senha !== confirmSenha) {
      setMessage('As senhas não coincidem.');
      return;
    }

    setMessage(null);        // clear previous messages
    setLoading(true);        // show loading if needed

    try {
      await register(email, senha);
      navigate("/dashboard");
    } catch (error: any) {
      // Firebase error messages can be improved:
      const msg = error.code || error.message;
      setMessage(`❌ Erro: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.cadastroWrapper}>
      <h2 className={styles.titulo}>Faça seu cadastro em nossa plataforma!</h2>

      <div className={styles.container}>
        <form className={styles.formulario} onSubmit={handleSubmit}>
          <h3 className={styles.formTitulo}>Cadastrar</h3>

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="confirmEmail">Repita o Email:</label>
          <input
            id="confirmEmail"
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            required
          />

          <label htmlFor="senha">Senha:</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <label htmlFor="confirmSenha">Repita a Senha:</label>
          <input
            id="confirmSenha"
            type="password"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <SimpleDialog message={message} isVisible={message != null}/>
      </div>
    </div>
  );
};

export default Signup;

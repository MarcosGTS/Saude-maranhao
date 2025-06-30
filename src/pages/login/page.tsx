import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import styles from './login.module.css';
import { Link } from 'react-router-dom';
import { login } from '../../services/authService';
import SimpleDialog from '../../components/SimpleDialog';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      await login(email, senha);
      navigate('/dashboard');
    } catch (error: any) {
      // Firebase error messages can be improved:
      const msg = error.code || error.message;
      setMessage(`❌ Erro: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Faça seu login em nossa plataforma!</h2>
      <div className={styles.loginBox}>
        <h3>Entrar</h3>

        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <SimpleDialog message={message} isVisible={message != null}/>

        <div className={styles.loginLinks}>
          <Link to="/redefinir-senha">Esqueci a senha</Link>
          <Link to="/signup">Não tenho cadastro</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;




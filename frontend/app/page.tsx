// LoginPage.tsx
import React from 'react';
import styles from './globals.module.css';

const LoginPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>Login</h1>
            <div className={styles.inputContainer}>
                <label htmlFor="username" className={styles.label}>Username:</label>
                <input type="text" id="username" className={styles.input} />
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="password" className={styles.label}>Password:</label>
                <input type="password" id="password" className={styles.input} />
            </div>
            <button type="button" className={styles.button}>Login</button>
        </div>
    );
}

export default LoginPage;

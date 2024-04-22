import React from 'react';

const LoginPage: React.FC = () => {
    return (
        <div>
            <h1>Login Page</h1>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" />
            </div>
            <button type="button">Login</button>
        </div>
    );
}

export default LoginPage;

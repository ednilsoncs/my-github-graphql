import React, { useState } from "react";

import base64 from "base-64";

function Main(props) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const handleAutentication = () => {
    const config = {
      GITHUB_CLIENT_ID: "6f3ed95ebf1e046c9717",
      GITHUB_CLIENT_SECRET: "a95a43669485e2c603a834e492122c6649e05377"
    };

    const AUTH_URL_PATH = "https://api.github.com/authorizations";

    const bytes = `${form.email.trim()}:${form.password.trim()}`;
    const encoded = base64.encode(bytes);

    return fetch(AUTH_URL_PATH, {
      method: "POST",
      headers: {
        Authorization: `Basic ${encoded}`,
        "User-Agent": "GitHub Issue Browser",
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/vnd.github.inertia-preview+json"
      },
      body: JSON.stringify({
        client_id: config.GITHUB_CLIENT_ID,
        client_secret: config.GITHUB_CLIENT_SECRET,
        scopes: ["user", "repo", "public_repo"],
        note: "not abuse"
      })
    }).then(response =>
      response.json().then(json => {
        if (response.status < 400) {
          localStorage.setItem("@TOKEN", json.token);
          props.history.push("/dashboard");
        }
      })
    );
  };

  return (
    <div>
      <form onSubmit={handleAutentication}>
        <input
          className="input"
          type="text"
          placeholder="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="input"
          type="password"
          placeholder="senha"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="button">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Main;

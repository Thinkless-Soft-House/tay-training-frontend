# Login Module

1. Criar a pagina /login com o modelo lazy loading

```bash
ng generate module login --route login --module app.module
```

2. Criar os componentes para os formulários que podem ser usados nessa tela

- Login
- Cadastro
- Recuperação de senha

```bash
ng g component pages/login/sing-in
```
```bash
ng g component pages/login/sing-up
```
```bash
ng g component pages/login/send-code
```
```bash
ng g component pages/login/recover-password
```

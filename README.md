# Get Started para Angular 15 + Material Angular 15

Um projeto base para aplicações web baseadas em Angular e Material Angular como o estilizador

## Instalação

Para criar o seu projeto da mesma forma que este, primeiro verifique se a sua versao do `@angular/cli` instalado é da major `15.x.x`. Essa verificação pode ser feita com `ng version`.

Para iniciar o seu projeto:

```bash
  ng new <nome-do-projeto> --routing --style scss -S
  cd <nome-do-projeto>
```

E limpe o app.component.html, deixando apenas o `<router-outlet></router-outlet>`

## Configurar o Material Angular

Aqui vamos configurar todo o Material com um custom theme, aceitando tanto o dark quanto o light theme com um alternador de fácil uso. Tambem vamos configurar um modulo que exporta todos os componentes da lib para não precisar adivinhar qual ta faltando em cada componente

### Configurando o Material Angular

```bash
  ng add @angular/material
```

- `y` para instalar as dependencias
- Escolha um dos temas exceto o `Custom`
- `y` Para configurar as tipagens da tipografia
- `Include Animations` para ativar as animacoes do Angular Material

### Configurando o Custom theme

Todo ano eu troco qual deles eu utilizo, mas esse ano eu estou usando esse gerador de [temas do AM](https://materialtheme.arcsine.dev/). Escolha as 3 cores (Primário, Confirmação e Alerta) e clique em

- View: SCSS
- Version: +13
- Export: SCSS

Cole o que foi copiado no arquivo `styles.scss`
Esse código veio com a configuração do Angular `Material@14` então a parte das fontes não está funcionando corretamente, vamos fazer algumas alterações no que foi colado.

- `@use '@angular/material' as mat;` deve estar na linha 1 do arquivo `styles.scss`
- As fontes não funcionam do jeito que o gerador de temas manda, precisa trocar a variavel `$fontConfig` para algo como:

```sass
$fonts: mat.define-typography-config(
  $headline-1:
    mat.define-typography-level(112px, 112px, 300, "Roboto", -0.0134em),
  $headline-2:
    mat.define-typography-level(56px, 56px, 400, "Roboto", -0.0089em),
  $headline-3: mat.define-typography-level(45px, 48px, 400, "Roboto", 0em),
  $headline-4:
    mat.define-typography-level(34px, 40px, 400, "Roboto", 0.0074em),
  $headline-5: mat.define-typography-level(24px, 32px, 400, "Roboto", 0em),
  $headline-6:
    mat.define-typography-level(20px, 32px, 500, "Roboto", 0.0075em),
  $body-1: mat.define-typography-level(17px, 24px, 500, "Roboto", 0.0179em),
  $body-2: mat.define-typography-level(15px, 20px, 400, "Roboto", 0.0179em),
  $subtitle-1:
    mat.define-typography-level(16px, 28px, 400, "Roboto", 0.0094em),
  $subtitle-2:
    mat.define-typography-level(14px, 24px, 500, "Roboto", 0.0067em),
  $caption: mat.define-typography-level(13px, 14px, 500, "Roboto", 0.0893em),
  $button: mat.define-typography-level(15px, 20px, 400, "Roboto", 0.0333em),
  $overline:
    mat.define-typography-level(10px, 20px, 400, "Roboto", 0.0333em),
);
```

- Excluir a linha `@include mat.core($fontConfig);` porque a fonte não é mais configurada assim no AM 15.
- Na configuração dos temas Light e Dark, substituir:

```scss
$theme: (
  primary: $theme-primary,
  accent: $theme-accent,
  warn: $theme-warn,
  is-dark: true,
  foreground: $mat-dark-theme-foreground,
  background: $mat-dark-theme-background,
);
$altTheme: (
  primary: $theme-primary,
  accent: $theme-accent,
  warn: $theme-warn,
  is-dark: false,
  foreground: $mat-light-theme-foreground,
  background: $mat-light-theme-background,
);
```

por:

```scss
$altTheme: mat.define-light-theme(
  (
    color: (
      primary: $theme-primary,
      accent: $theme-accent,
      warn: $theme-warn,
    ),
    typography: $fonts,
    background: $mat-light-theme-background,
    foreground: $mat-light-theme-foreground,
  )
);
$theme: mat.define-dark-theme(
  (
    color: (
      primary: $theme-primary,
      accent: $theme-accent,
      warn: $theme-warn,
    ),
    typography: $fonts,
    background: $mat-dark-theme-background,
    foreground: $mat-dark-theme-foreground,
  )
);
```

### Configuração do módulo de exports

O Angular Material é orientado à componentes isolados que eles te falam, mas dependem uns dos outros as vezes. Isso faz com que quando se usa um, se você não importar o outro, ele fica bugado, por isso criamos um modulo de export geral, que sempre manda tudo de uma vez quando necessário.

- Execute o comando para gerar o módulo

```bash
ng generate module core/material-bundle
```

- No seu editor de texto navegue até o arquivo, vai estar na pasta `src/app/core/material-bundle`
- Dentro do `NgModule`, crie uma entrada para o exports, assim:

```ts
@NgModule({
  declarations: [],
  imports: [CommonModule],
  // Aqui
  exports: [],
})
```

- Exporte todos os componentes, se quiser ver como, cheque nesse mesmo projeto.

## Configurações Extras

- [Login Module](./how-to/login-module.md)
- Interceptadores
- Http Module
- Master Details
  - Master com tabela usando sort, pagination e filter
  - Detail para new/edit com FormGroup para validações

# Jay's Front-end Starter Kit
> Optimized for **responsive** websites with minimal JavaScript

## Features

- Node.js + Nodemon + Express.js + Mustache
- Opiniated Sass structure with presets
- CSS is piped through libsass and PostCSS autoprefixer
- Write perfect styles with CSSComb on save
- Simple but powerful JavaScript bundler + uglifier

## Install project

Project should run on node v5.*

`$ npm install` to install dependencies

## Run project

`$ npm start` to run the node server.

`$ npm run dev` to run nodemon through gulp and have CSS comb run on your `*.scss` files when saved. By default runs on `development`, set `NODE_ENV` to production to get the `bundle.js` instead of separate JS files.

`$ npm run build` to build the css and JS to a bundle.

## Git workflow

There are two main branches: `master` and `dev`.
Feature branches will be deleted when merged from feature branch to dev and then to master. Feature branches will be prepended with `feature/feature-name`.

**Need a git refresher?**: [git - the simple guide](http://rogerdudler.github.io/git-guide/)

## Sass structure

The Sass structure is as follows (in import order):

- `settings` contains variables only
- `utilities` contains mixins only
- `reset` contains global styles to reset the browser base
- `fonts` contains font-face declarations
- `components` contains component based css

### CSS Naming Conventions

In this project components follow the [montage](http://montagestudio.com/blog/2013/10/24/bem-syntax-with-ux-in-mind/) BEM conventions, without the namespace for clarity. Also see [SUIT CSS](https://suitcss.github.io/).

```CSS
.MyComponent {}
.MyComponent.is-stateOfComponent {}
.MyComponent--modifier {}

.MyComponent-descendentName {}

/* versions instead of modifiers */
.solid-Button {}
.outline-Button {}

/* optionally namespacing */
.ns_OtherComponent {}
```

Versions are modifiers without the dependency on the main component. Versions can share modifiers with the main component name. Although the main component name can exist, it's not necessary.

```HTML
<button class="solid-Button Button--big">Login</button>
```

```CSS
/* Button.scss */
.Button {} /* optional */
.solid-Button {}
.outline-Button {}

.Button--small {}
.Button--big {}
```

Modifiers are still used in cases where there is a dependency on the main component.

```HTML
<div class="SearchResult SearchResult--highlight"></div>
<div class="SearchResult"></div>
```

## Author & License

Created by **Jeroen Ransijn** under the **MIT license**.

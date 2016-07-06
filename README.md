# Jay's Front-end Starter Kit
> Optimized for small **responsive** websites

## Features

- Node.js + Express.js + Nunjucks
- Powerful Gulp build system
- Opiniated CSS structure with presets
- Responsive HTML & CSS components
- CSS is piped through cssnext
- Write perfect CSS with stylefmt on save
- Simple but powerful JavaScript bundler + uglifier

### Use this starter kit for

- Marketing websites
- App landingspages
- Portfolios
- Small business websites

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

**Need a git refresher?** [git - the simple guide](http://rogerdudler.github.io/git-guide/)

## CSS structure

The CSS structure is as follows (in import order):

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

/* optionally namespacing, not used in project by default */
.ns-OtherComponent {}
```

## Media queries overview

*This section is a modified version of [CSS Conventions by Bart van de Biezen](https://github.com/bartvandebiezen/css-conventions#names-of-media-queries-should-be-based-on-the-context-of-a-device)*

- There are major and minor ranges.
- Major ranges should be based on the context of a device.
- Minor ranges (a.k.a. tweak points) are based on size differences within major ranges.
- Breakpoints should only be used if the content requires it.

### Visual presentation of major and minor ranges

```
major: ---palm----|----hand---|----lap----|---desk------*
minor: _s_|_m_|_l_|_s_|_m_|_l_|_s_|_m_|_l_|_s_|_m_|_l___*
```

### The values of major and minor ranges

```CSS
/**
 * palm
 * major: 0-440
 * minor: 0-360-400-440
 * interval: 40px
 */
@custom-media --range-palm   (width <= 440px);
@custom-media --range-palm-s (width <= 360px);
@custom-media --range-palm-m (width > 360px) and (width <= 400px);
@custom-media --range-palm-l (width > 400px) and (width <= 440px);

/**
 * hand
 * major: 440–620
 * minor: 440-500-560-620
 * interval: 60px
 */
@custom-media --range-hand   (width > 440px) and (width <= 620px);
@custom-media --range-hand-s (width > 440px) and (width <= 480px);
@custom-media --range-hand-m (width > 480px) and (width <= 520px);
@custom-media --range-hand-l (width > 520px) and (width <= 560px);

/**
 * lap
 * major: 620–980
 * minor: 620–740–860–980
 * interval: 120px
 */
@custom-media --range-lap   (width > 620px) and (width <= 980px);
@custom-media --range-lap-s (width > 620px) and (width <= 720px);
@custom-media --range-lap-m (width > 740px) and (width <= 860px);
@custom-media --range-lap-l (width > 860px) and (width <= 980px);

/**
 * desk
 * major: 980–*
 * minor: 980–1120–1260–1400–*
 * interval: 140px
 */
@custom-media --range-desk    (width >  980px);
@custom-media --range-desk-s  (width >  980px) and (width <= 1120px);
@custom-media --range-desk-m  (width > 1120px) and (width <= 1260px);
@custom-media --range-desk-l  (width > 1260px) and (width <= 1400px);
@custom-media --range-desk-xl (width > 1400px);
```

### Custom media range usage example

```PostCSS
.MyComponent {
  @media (--range-palm) {
    margin: 40px 0;
  }

  @media (--range-hand) {
    margin: 40px 0;
  }

  /* Combine ranges */
  @media (--range-lap), (--range-desk) {
    margin: 120px 0;
  }
}
```

## Acknowledgements and Further Reading

Most of this project is a remix of my own experience and the work of many others:

- [Solved by Flexbox](https://github.com/philipwalton/solved-by-flexbox)
- [BEM syntax with UX in mind](http://montagestudio.com/blog/2013/10/24/bem-syntax-with-ux-in-mind/)
- [SUIT CSS](https://suitcss.github.io/)
- [Learn to Code HTML & CSS by Shay Howe](http://learn.shayhowe.com/)
- [CSS Conventions by Bart van de Biezen](https://github.com/bartvandebiezen/css-conventions)

## Author & License

Created by **Jeroen Ransijn** under the **MIT license**.

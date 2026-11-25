# Third-party software

Direct dependencies, all used at build or test time. None ships in the built site.
The site sends no framework JavaScript; the only client script is `static/site.js`.

| Package                       | Version | Licence    |
| ----------------------------- | ------- | ---------- |
| @axe-core/playwright | 4.14.0 | MPL-2.0 |
| @eslint/js | 10.0.1 | MIT |
| @playwright/test | 1.65.1 | Apache-2.0 |
| @sveltejs/adapter-static | 4.0.1 | MIT |
| @sveltejs/kit | 3.4.0 | MIT |
| @sveltejs/vite-plugin-svelte | 7.3.2 | MIT |
| @tailwindcss/vite | 4.3.5 | MIT |
| eslint | 10.15.0 | MIT |
| eslint-plugin-svelte | 3.24.1 | MIT |
| globals | 17.14.0 | MIT |
| prettier | 3.10.1 | MIT |
| prettier-plugin-svelte | 4.2.0 | MIT |
| svelte | 5.59.1 | MIT |
| svelte-check | 4.7.8 | MIT |
| tailwindcss | 4.3.5 | MIT |
| typescript | 6.0.3 | Apache-2.0 |
| typescript-eslint | 8.74.0 | MIT |
| vite | 8.3.8 | MIT |
| vitest | 5.1.1 | MIT |

## Fonts

| Font           | Licence      | Files                                                  |
| -------------- | ------------ | ------------------------------------------------------ |
| Public Sans    | SIL OFL 1.1  | `static/fonts/PublicSans-Variable.woff2`, `static/fonts/OFL-PublicSans.txt` |
| JetBrains Mono | SIL OFL 1.1  | `static/fonts/JetBrainsMono-Variable.woff2`, `static/fonts/OFL-JetBrainsMono.txt` |

## Note on licences

All direct dependencies are permissive (MIT or Apache-2.0), with one exception:
`@axe-core/playwright` is MPL-2.0, a weak copyleft licence. It is a test-only
dependency, is not modified, and nothing from it is shipped or linked into the site.
MPL-2.0 applies to the files of that package only.

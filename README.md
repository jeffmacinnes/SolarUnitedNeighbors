# Texas Solar Homeowners & Savings Report

## Development

Start the dev server (with HMR):

```bash
npm run dev
```

This will start a dev server running on [localhost:5000](http://localhost:5000). The dev server will watch for changes to the `src` and `public` directories. Editing files, or adding/deleting files, will automatically recompile and update the browser.

## Deploy

The page is set to be deployed from the 'docs' folder in the root level of this repository.

First, create the bundled site:

```bash
npm run build
```

deploy to `docs` folder and push to github

```bash
make github
```

## Updating site content

Most of the copy on the site is hosted via google docs: [Content Doc](https://docs.google.com/document/d/1T-nG-IWIVK7QfBk_0O2Dc-nDyL-cGhLDcyaIyTa8sgs/edit)

The copy is organized using a special syntax called ArchieML that allows it to be converted to json and injected into the site. Read more on ArchieML [here](http://archieml.org).

Once changes are made to the google doc, they need to be pulled down into the site. From the root level of the repository, run:

```bash
npm run gdoc
```

This will convert the googledoc to json and store the file at `/src/data/doc.json`

Refresh the development server (or rebuild the site) to see the updated content doc reflected in the site.

## Data

The interactive data visualizations on this site are supported behind the scenes by custom functions and utilities hosted via observableHQ notebooks: [helper tools](https://observablehq.com/d/75836c71d23e67a3)

The site imports a specific version number of this notebook, in order to avoid inadvertently messing up the site by modifying the notebook. If you _want_ the site to read the updated notebook, get the latest version number and update the notebook url in `/src/App.svelte`

## misc

This repo is adapted from the excellent svelte template that The Pudding put together: https://github.com/the-pudding/svelte-starter

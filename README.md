# Texas Solar Homeowners & Savings Report

## Development

Start the dev server (with HMR):

```bash
npm run dev
```

This will start a dev server running on [localhost:5000](http://localhost:5000). The dev server will watch for changes to the `src` and `public` directories. Editing files, or adding/deleting files, will automatically recompile and update the browser.

## Build/SSR/Deploy

To build:

```bash
npm run build
```

This will bundle the app and write to `public/build`

If you want to create an SSR version, you can next run:

```bash
npm run ssr
```

This will generate a directory called `ssr` with server-side rendered static-hostable app.

If you want to deploy to Github Pages:

```bash
make github
```

This will copy the contents of the `ssr` dir to `docs` and push an update to the github repo

## Style

This template is set up with a preprocessor for `SCSS`. To use in a component file:

```
<style lang="scss">
  ...
</style>

```

## Google Docs and Sheets

With the help of [ArchieML](http://archieml.org/), this repo is set up to ingest content from google docs or sheets. E.g. use Google Docs as a CMS for all page copy, or use Google Sheets as a data store.

- Create a Google Doc or Sheet
- Click `Share` button -> advanced -> Change... -> to "Anyone with this link"
- In the address bar, grab the ID - eg. ...com/document/d/**1IiA5a5iCjbjOYvZVgPcjGzMy5PyfCzpPF-LnQdCdFI0**/edit
- paste in the ID above into `config.json`, and set the filepath to where you want the file saved
- If you want to do a Google Sheet, be sure to include the `gid` value in the url as well

Next, run `npm run gdoc` to pull the latest updates from google drive and save them to the file(s) specified in `config.json`.

The files can be imported in your JS.

## Common components

located in `src/components/common`

- `Icon.svelte` : integration with Feather Icons. Use it to import common icons into your app like:

  ```javascript
  <script>
    import Icon from "./components/common/Icon.svelte";
  </script>

  <Icon name="airplay" strokeWidth={2} stroke="coral" />
  ```

- `Head.svelte` : Place to put meta tags (and other head things). This will be injected into the `<head></head>` tags during build stage.

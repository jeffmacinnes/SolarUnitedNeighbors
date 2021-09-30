<script>
  export let title;
  export let desc;
  export let url;
</script>

<svelte:head>
  <title>{title}</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="description" content={desc} />
  <meta name="author" content="" />
  <meta name="news_keywords" content="" />

  <meta property="og:title" content={title} />
  <meta property="og:site_name" content={title} />
  <meta property="og:url" content={url} />
  <meta property="og:description" content={desc} />
  <meta property="og:type" content="article" />
  <meta property="og:locale" content="en_US" />

  <meta
    property="og:image"
    content="https://www.solarunitedneighbors.org/TXRateStudy/assets/images/socialImg.png"
  />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="" />
  <meta name="twitter:creator" content="" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={desc} />
  <meta
    name="twitter:image"
    content="https://www.solarunitedneighbors.org/TXRateStudy/assets/images/twitterImage.png"
  />

  <meta name="robots" content="max-image-preview:large" />

  <link rel="canonical" href="" />
</svelte:head>

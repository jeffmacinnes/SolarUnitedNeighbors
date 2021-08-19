<script>
  import Icon from "components/common/Icon.svelte";
  export let sectionText;

  let collaborators = [
    {
      name: "Solar United Neighbors",
      logoURL: "./assets/images/logo-SUN.png",
      link: "http://solarunitedneighbors.org/",
    },
    {
      name: "Texas Power Guide",
      logoURL: "./assets/images/logo-TPG.png",
      link: "https://www.texaspowerguide.com/",
    },
    {
      name: "Mission:data Coalition",
      logoURL: "./assets/images/logo-MD_mod.png",
      link: "https://missiondata.io/",
    },
  ];
</script>

<div class="footer-container body-content">
  <div class="grid-container">
    <div class="wide-container">
      <div class="wide-child about-container">
        <h3 class="_section-heading">About</h3>
        <div class="about-text _caption-text">{sectionText.about}</div>
      </div>

      <div class="wide-child collaboration-container">
        <div class="_caption-text">This project is a collaboration between:</div>
        <div class="collaboration-links-container">
          {#each collaborators as collab}
            <a href={collab.link} target="_blank">
              <div class="collaboration-link _caption-text">
                <img src={collab.logoURL} alt={`${collab.name} logo`} />
                <div class="collaboration-name">{collab.name}</div>
              </div>
            </a>
          {/each}
        </div>
      </div>

      <div class="wide-child design-credit _caption-text">
        Site design and development: <a href="https://www.jeffmacinnes.com" target="_blank"
          >Jeff MacInnes</a
        >
      </div>
    </div>

    <div class="narrow-container">
      <div class="narrow-child contact-container">
        <h3 class="_section-heading">Contact</h3>
        <a class="contact-email _caption-text" href="mailto:info@solarunitedneighbors.org"
          >info@solarunitedneighbors.org</a
        >
      </div>

      <div class="narrow-child connect-container">
        <h3 class="_section-heading">Connect</h3>
        <div class="social-container">
          <a href="https://www.facebook.com/solarunitedneighbors/">
            <Icon
              name="facebook"
              width="50px"
              height="40px"
              strokeWidth={1}
              stroke="var(--lBlue)"
            />
          </a>

          <a href="https://twitter.com/solarneighbors">
            <Icon name="twitter" width="50px" height="40px" strokeWidth={1} stroke="var(--lBlue)" />
          </a>

          <a href="https://www.youtube.com/channel/UCJRrWlxEcDnCGh_u7opnUmw/videos">
            <Icon name="youtube" width="50px" height="40px" strokeWidth={1} stroke="var(--lBlue)" />
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="copyright _caption-text">
    Copyright Ⓒ 2021 Solar United Neighbors. All Rights Reserved
  </div>
</div>

<style lang="scss">
  .footer-container {
    width: 100%;
    border-top: solid 3px var(--green);
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas: "wide wide narrow";
    padding: 3rem 0;
  }

  .wide-container {
    grid-area: wide;
    width: 100%;
    display: flex;
    flex-direction: column;

    .wide-child {
      padding-bottom: 4rem;
    }

    .about-container {
      width: 90%;
    }

    .collaboration-links-container {
      display: flex;
      justify-content: space-between;
      width: 90%;
      padding: 1rem 0;
      a {
        color: var(--lBlue);

        &:hover {
          color: var(--orange);
        }
      }

      .collaboration-link {
        font-weight: 500;
        font-size: 1.3rem;
        cursor: pointer;

        img {
          height: 38px;
        }
      }
    }

    .design-credit {
      color: var(--lBlue);

      a {
        font-weight: 500;
        color: var(--lBlue);

        &:hover {
          color: var(--orange);
        }
      }
    }
  }

  .narrow-container {
    grid-area: narrow;
    display: flex;
    flex-direction: column;

    .contact-container {
      a {
        font-weight: 500;
        text-decoration: none;
        color: var(--lBlue);
      }
    }

    .narrow-child {
      padding-bottom: 4rem;
    }

    .social-container {
      display: flex;
    }
  }

  .copyright {
    width: 100%;
    margin: auto 0;
    text-align: center;
    margin-bottom: 3rem;
  }
</style>

<script>
  import viewport from "stores/viewport.js";
  import Icon from "components/common/Icon.svelte";
  import * as scroll from "svelte-scrollto";
  export let sectionNames;

  // mobile menu styles
  let showMobileMenu = false;
  const handleMobileIconClick = () => (showMobileMenu = !showMobileMenu);

  $: isMobile = $viewport.width < 900;
  $: mobileMenuIcon = showMobileMenu ? "x" : "menu";

  // nav links
  const navLinks = [
    { label: sectionNames[0], href: "#summary" },
    { label: sectionNames[1], href: "#walk-through" },
    { label: sectionNames[2], href: "#plan-comparison" },
    { label: sectionNames[3], href: "#resources" },
  ];

  // animate scrollTo on link click
  const scrollTo = (element, offset) => {
    console.log(offset);
    scroll.scrollTo({ element, offset: offset, duration: 1200 });

    // close the mobile menu, if opened
    if (showMobileMenu) {
      showMobileMenu = false;
    }
  };
</script>

<nav>
  <div id="navbar">
    <!-- Logo -->
    <div class="logo-container">
      <h1>Texas <span>Solar Homeowners</span> Savings Report</h1>
    </div>

    <!-- Links -->
    <div class="links-container">
      {#if isMobile}
        <div class="mobile-menu-icon" on:click={handleMobileIconClick}>
          <Icon
            name={mobileMenuIcon}
            width="50px"
            height="40px"
            stroke="var(--charcoal)"
            strokeWidth={2.5}
          />
        </div>
      {:else}
        {#each navLinks as navLink}
          <div on:click={() => scrollTo(navLink.href, 0)}>{navLink.label}</div>
        {/each}
      {/if}
    </div>
  </div>

  <!-- Mobile Menu Links -->
  {#if showMobileMenu}
    <div class="mobile-menu-container">
      {#each navLinks as navLink}
        <div class="mobile-menu-link" on:click={() => scrollTo(navLink.href, -200)}>
          {navLink.label}
        </div>
      {/each}
    </div>
  {/if}
</nav>

<style lang="scss">
  nav {
    width: 100%;
    min-height: 50px;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  #navbar {
    width: 100%;
    min-height: 50px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgb(2, 0, 36);
    background: linear-gradient(90deg, var(--dOrange) 0%, var(--orange) 100%);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
  }

  .links-container {
    max-width: 70%;
    display: flex;
    justify-content: space-between;

    div {
      display: inline-block;
      padding: 0 15px;
      font-family: "Poppins";
      font-size: 1.4rem;
      font-weight: 500;
      text-transform: uppercase;
      cursor: pointer;
      color: var(--dGray);
      transition: transform 150ms;

      &:hover {
        // color: var(--lBlue);
        transform: translateY(-1.5px);
      }
    }
  }

  h1 {
    color: var(--white);
    font-family: "Calistoga";
    letter-spacing: 0.15rem;
    margin: 0px;

    span {
      color: var(--lOrange);
    }
  }

  // Mobile Menu styles
  .mobile-menu-icon {
    cursor: pointer;
  }

  .mobile-menu-container {
    background: linear-gradient(90deg, var(--dOrange) 0%, var(--orange) 100%);
    text-align: right;

    .mobile-menu-link {
      text-transform: uppercase;
      font-family: "Poppins";
      font-size: 1.9rem;
      font-weight: light;
      padding: 2rem;
      padding-right: 6rem;
      border-bottom: solid 1px var(--white);
      cursor: pointer;

      &:first-of-type {
        border-top: solid 1px var(--white);
      }

      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
</style>

<template>
  <div class="about">
    <img class="logo" src="../../assets/images/logo.png">
  
    <p>
      FullStream is an alternative and simplified interface for browsing and viewing <a href="https://www.twitch.tv/" target="_blank">Twitch</a> content.<br />
      It originated from wanting a solution to watch and browse Twitch at the same time in a fullscreen environment, hence the name.<br />
      Since then it has evolved to be more and more feature rich, though development was put on hold from late 2016 until early 2019.
    </p>

    <section>
      <h2>Information</h2>
      <ul class="details">
        <li><b>Version:</b>{{version}}</li>
        <li><b>Copyright:</b><a href="https://github.com/kniffen" target="_blank">Kniffen</a> © 2014-{{year}}</li>
        <li><b>License:</b><a href="https://github.com/kniffen/FullStream/blob/master/LICENSE"  target="_blank">{{license}}</a></li>
      </ul>
    </section>

    <section>
      <h2>Links</h2>
      <div class="links">
        <a href="https://github.com/kniffen/FullStream" target="_blank"><i class="fsif-github"></i>GitHub repo</a>
        <a href="https://github.com/kniffen/FullStream/issues" target="_blank"><i class="fsif-github"></i>Bug reports</a>
        <a href="https://github.com/kniffen/FullStream//blob/master/README.md" target="_blank"><i class="fsif-github"></i>Changelog</a>
        <a href="https://discord.gg/S6NRp5P" target="_blank"><i class="fsif-discord"></i>Discord</a>
      </div>
    </section>

    <section>
      <h2>Privacy</h2>
    
      <p>
        FullStream stores your <a href="https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/" target="_blank">Twitch token</a> and <router-link to="/settings">settings</router-link> using the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank">localStorage</a> feature in your browser.<br />
        We never see or have access to your data.
      </p>
    </section>

  </div>
</template>

<script>
  import pkg from '../../../package.json'

  export default {
    name: 'About',

    data: function() {
      return {
        version: pkg.version,
        license: pkg.license,
        year:    '2019',
      }
    },

    mounted: function() {
      const d = new Date()
      this.year = d.getFullYear()
    }
  }
</script>

<style scoped>
  .about {
    font-size: 1.2rem;
    display: grid;
    grid-gap: 1em;
    align-content: start;
  }

  h1 {
    margin: 0;
  }

  h2 {
    margin: 0 0 .25em;
  }

  p {
    max-width: 640px;
  }

  a {
    color: var(--color-blue);
  }

  a:hover {
    text-decoration: underline;
  }

  .logo {
    width: 480px;
  }

  .details,
  .links {
    display: grid;
    grid-gap: .25em;
    list-style: none;
    margin: 0;
    justify-items: start;
  }

  .details b {
    display: inline-block;
    width: 80px;
  }
</style>
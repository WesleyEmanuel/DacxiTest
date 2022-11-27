<template>
  <div>
    <nav>
      <router-link to="/">
        <img src="./assets/dacxi_logo.webp" alt="logo dacxi" id="logo">
      </router-link>

      <router-link to="about">
        <span id="about">About</span>
      </router-link>
    </nav>
    <main>
      <router-view></router-view>
    </main>
    <footer id="footer">
          <span>
            Developed by 
           <a href="https://www.linkedin.com/in/wesley-alves-7b05781b9" target="_blank">Wesley Emanuel</a>
          </span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
  nav{
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1.5rem;
    color: var(--dacxi-color);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    animation: appear 1.5s;
  }
  #logo{
    width: 100px;
    cursor: pointer;
  }
  #about{
    border: 1px solid var(--soft-blue);
    color: var(--soft-blue);
    padding: 7px 18px 7px 18px;
    border-radius: 20px;
    cursor: pointer;
    transition: all .3s;
  }
  #about:hover{
    color: var(--dacxi-color);
    border-color: var(--dacxi-color);
  }

  main{
    width: 70vw;
    margin: auto;
    margin-top: 2rem;
  }
  #footer{
    font-size: small;
    position: fixed;
    bottom: 1rem;
    left: 42vw;
    color: gray;
  }
</style>
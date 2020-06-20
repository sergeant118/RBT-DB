<template>
  <div class="bg">
    <nav>
      <n-link to="/" class="button--grey">Home</n-link>
      <n-link to="about" class="button--grey">About</n-link>
      <n-link to="rental" class="button--grey">Rental</n-link>
    </nav>
  </div>
</template>


<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.bg {
  padding: 0.5em 0.75em;
  background-color: #b9d5f5;
}
</style>
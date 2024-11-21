<script>
export default {
  name: "home"
}
</script>

<template>
  <div class="w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
    <h1 class="text-8xl font-bold text-white animate-fade-in">Bienvenido a Telasecuere</h1>
    <p class="text-4xl text-white mt-4 animate-slide-up"> To WeaveGuard</p>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slide-up {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 2s ease-in-out;
}

.animate-slide-up {
  animation: slide-up 2s ease-in-out;
}

.bg-gradient-to-r {
  background: linear-gradient(to right, #7b2ff7, #00d4ff);
}

.min-h-screen {
  min-height: 100vh;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.text-8xl {
  font-size: 6rem;
}

.text-4xl {
  font-size: 2.25rem;
}

.font-bold {
  font-weight: bold;
}

.text-white {
  color: white;
}

.mt-4 {
  margin-top: 1rem;
}
</style>
<script>
import {Storeroom} from '../model/storeroom.entity.js';
import {StoreroomService} from "../services/storeroom.service.js";

import {ClimateSensor} from "../model/climateSensor.entity.js";
import {ClimateSensorService} from "../services/climateSensor.service.js";

import {EnviroDevice} from "../model/enviroDevice.entity.js";
import {EnviroDeviceService} from "../services/enviroDevice.service.js";


export default {
  data() {
    return {
      storerooms: [],
      storeroomService: null,
      climateSensorService: null,
      enviroDeviceService: null,
      thermometers: [],
      hygrometers: [],
      heaters: [],
      humidifiers: [],
      temperature: 16,
      humidity: 50,
      alert: false,
    };
  },
  methods: {
    setHeaterTemperature(heater, temperature) {
      heater.value = temperature;
      this.enviroDeviceService.update(heater.id, heater)
          .then(response => {
            console.log('Heater updated:', response.data);
          })
          .catch(error => {
            console.error('Error updating heater:', error);
          });
    },
    setHumidifierHumidity(humidifier, humidity) {
      humidifier.value = humidity;
      this.enviroDeviceService.update(humidifier.id, humidifier)
          .then(response => {
            console.log('Humidifier updated:', response.data);
          })
          .catch(error => {
            console.error('Error updating humidifier:', error);
          });
    },
    setStoreroomTemperature(heater, storeroom) {
      storeroom.temperature.actual = heater.value;
      this.storeroomService.update(storeroom.id, storeroom)
          .then(response => {
            console.log('Storeroom updated:', response.data);
          })
          .catch(error => {
            console.error('Error updating storeroom:', error);
          });
    },
    setStoreroomHumidity(humidifier, storeroom) {
      storeroom.humidity.actual = humidifier.value;
      this.storeroomService.update(storeroom.id, storeroom)
          .then(response => {
            console.log('Storeroom updated:', response.data);
          })
          .catch(error => {
            console.error('Error updating storeroom:', error);
          });
    }
  },
  created() {
    // Inicializar servicios
    this.storeroomService = new StoreroomService();
    this.climateSensorService = new ClimateSensorService();
    this.enviroDeviceService = new EnviroDeviceService();

    // Cargar almacenes
    this.storeroomService.getAll()
        .then(response => {
          this.storerooms = response.data.map(storeroom => new Storeroom(storeroom));
          console.log(this.storerooms);
        })
        .catch(error => console.error(error));

    // Cargar todos los sensores climáticos y clasificar
    this.climateSensorService.getAll()
        .then(response => {
          const sensors = response.data.map(sensor => new ClimateSensor(sensor));
          this.thermometers = sensors.filter(sensor => sensor.type === 'Thermometer');
          this.hygrometers = sensors.filter(sensor => sensor.type === 'Hygrometer');
        })
        .catch(error => console.error(error));

    // Cargar todos los dispositivos de control ambiental y clasificar
    this.enviroDeviceService.getAll()
        .then(response => {
          const devices = response.data.map(device => new EnviroDevice(device));
          this.heaters = devices.filter(device => device.type === 'Heater');
          this.humidifiers = devices.filter(device => device.type === 'Humidifier');
        })
        .catch(error => console.error(error));
  }
};
</script>


<template>

  <div class="storeroom-container" v-for="storeroom in storerooms" :key="storeroom.id">
    <h2>{{ storeroom.name }}</h2>

    <div class="recommended">
      <div>
        <h4>Temperatura maxima recomendada: {{ storeroom.temperature.maximum }}</h4>
        <br>
        <h4>Temperatura minima recomendada: {{ storeroom.temperature.minimum }}</h4>
      </div>
      <div>
        <h4>Humedad maxima recomendada: {{ storeroom.humidity.maximum }}</h4>
        <br>
        <h4>Humedad minima recomendada: {{ storeroom.humidity.minimum }}</h4>
      </div>
    </div>

    <div class="iot-container">
      <!--termometros-->
      <div v-for="thermometer in thermometers" :key="thermometer.id">
        <!-- Tarjeta de termometro actual -->
        <div class="card" v-if=" parseInt(thermometer.storeroomId) === storeroom.id">
          <h3>{{thermometer.name}}</h3>
          <div class="humidity-card">
            <div class="temperature-display">
              <div class="termometro">
                <div class="mercurio" :style="{ height: `${(storeroom.temperature.actual) / (100) * 100}%` }"></div>
              </div>
              <div class="temperature-card">
                <p>{{ storeroom.temperature.actual }}°C</p>
              </div>
            </div>
          </div>
          <!-- Alerta de temperatura alta-->
          <div v-if="storeroom.temperature.actual < storeroom.temperature.minimum" class="alert">¡Alerta! Temperatura baja: {{ storeroom.temperature.actual }}°C</div>
          <div v-if="storeroom.temperature.actual > storeroom.temperature.maximum" class="alert">¡Alerta! Temperatura alta: {{ storeroom.temperature.actual }}°C</div>
        </div>
      </div>

      <!--higrometros-->
      <div v-for="hygrometer in hygrometers" :key="hygrometer.id">
        <!-- Tarjeta de humedad actual -->
        <div class="card" v-if="parseInt(hygrometer.storeroomId) === storeroom.id">
          <h3>{{hygrometer.name}}</h3>
          <div class="humidity-card">
            <div class="humidity-display">
              <div class="temperature-card">
                <p>{{ storeroom.humidity.actual }}%</p>
              </div>
              <div :style="{ width: storeroom.humidity.actual + '%' }" class="humidity-bar"></div>
            </div>
          </div>
          <!-- Alerta de humedad alta-->
          <div v-if="storeroom.humidity.actual < storeroom.humidity.minimum" class="alert">¡Alerta! Humedad baja: {{ storeroom.humidity.actual }}%</div>
          <div v-if="storeroom.humidity.actual > storeroom.humidity.maximum" class="alert">¡Alerta! Humedad alta: {{ storeroom.humidity.actual }}%</div>
        </div>
      </div>

      <!--heater o calentador-->
      <div v-for="heater in heaters" :key="heater.id">
        <div class="card" v-if="parseInt(heater.storeroomId) === storeroom.id">
          <h3>{{heater.name}}</h3>
          <div class="humidity-card">
            <div class="humidity-display">
              <div class="temperature-card">
                <p>{{ heater.value }}°C</p>
              </div>
              <input type="range" v-model="heater.value" min="0" max="100" />
            </div>
          </div>
          <div class="card-footer">
            <button @click="setStoreroomTemperature(heater, storeroom)">Set Temperature</button>
            <button @click="setHeaterTemperature(heater, storeroom.temperature.actual)">Reset</button>
          </div>
        </div>
      </div>

      <!-- humidifier -->
      <div v-for="humidifier in humidifiers" :key="humidifier.id">
        <div class="card" v-if="parseInt(humidifier.storeroomId) === storeroom.id">
          <h3>{{humidifier.name}}</h3>
          <div class="humidity-card">
            <div class="humidity-display">
              <div class="temperature-card">
                <p>{{ humidifier.value }}%</p>
              </div>
              <input type="range" v-model="humidifier.value" min="0" max="100" />
            </div>
          </div>
          <div class="card-footer">
            <button @click="setStoreroomHumidity(humidifier, storeroom)">Set Humidity</button>
            <button @click="setHumidifierHumidity(humidifier, storeroom.humidity.actual)">Reset</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.recommended{
  display: flex;
  justify-content: space-around;
  margin: 1rem;
}

.card {
  display: inline-block;
  background-color: #f0f0f0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 5px 10px;
  width: 300px;
  color: #1a1a1a;
}

/* Tarjeta anidada de temperatura actual */
.temperature-card {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0e0e0;
  width: 120px;
  height: 120px;
  margin: 10px auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

/* Tarjeta anidada de humedad actual */
.humidity-card {
  background-color: #e0e0e0;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
}

/* Estilos de la barra de humedad */
.humidity-display {
  position: relative;
  margin: 10px 0;
}

.humidity-bar {
  height: 20px;
  background-color: lightblue;
}

.alert {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}

.termometro {
  width: 20px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
}

.mercurio {
  width: 100%;
  background-color: #ff0000;
  border-radius: 5px;
}

.temperature-container{
  padding: 3rem;
}

.temperature-display{
  display: flex;
}

.iot-container{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.card-footer{
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

.storeroom-container{
  margin-top: 1rem;
  margin-bottom: 2rem;
}

</style>

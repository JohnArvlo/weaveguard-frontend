<script>
import {Warehouse} from "../../facilities/model/warehouse.entity.js";
import {WarehouseService} from "../../facilities/services/warehouse.service.js";

import {ClimateSensor} from "../model/climateSensor.entity.js";
import {ClimateSensorService} from "../services/climateSensor.service.js";

import {EnviroDevice} from "../model/enviroDevice.entity.js";
import {EnviroDeviceService} from "../services/enviroDevice.service.js";

export default {
  data() {
    return {
      warehouses: [],
      warehouseService: null,
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
    setWarehouseTemperature(heater, warehouse) {
      console.log(warehouse.id);
      warehouse.temperature.actual = heater.value;
      const _warehouse = {
          name : warehouse.name,
          location : warehouse.location,
        description : warehouse.description,
          capacity : warehouse.capacity,
          phone : warehouse.contact.phone,
          email : warehouse.contact.email,
        actualTemperature : warehouse.temperature.actual,
        maximumTemperature : warehouse.temperature.maximum,
        minimumTemperature : warehouse.temperature.minimum,
        temperatureUnit : warehouse.temperature.unit,
        actualHumidity : warehouse.humidity.actual,
        maximumHumidity : warehouse.humidity.maximum,
        minimumHumidity : warehouse.humidity.minimum,
        humidityUnit : warehouse.humidity.unit
      }
      this.warehouseService.update(warehouse.id, _warehouse)
          .then(response => {
            console.log('Warehouse updated:', response.data);
          })
          .catch(error => {
            console.error('Error updating warehouse:', error);
          });
    },
    setWarehouseHumidity(humidifier, warehouse) {
      warehouse.humidity.actual = humidifier.value;

      const _warehouse = {
        name : warehouse.name,
        location : warehouse.location,
        description : warehouse.description,
        capacity : warehouse.capacity,
        phone : warehouse.contact.phone,
        email : warehouse.contact.email,
        actualTemperature : warehouse.temperature.actual,
        maximumTemperature : warehouse.temperature.maximum,
        minimumTemperature : warehouse.temperature.minimum,
        temperatureUnit : warehouse.temperature.unit,
        actualHumidity : warehouse.humidity.actual,
        maximumHumidity : warehouse.humidity.maximum,
        minimumHumidity : warehouse.humidity.minimum,
        humidityUnit : warehouse.humidity.unit
      }

      this.warehouseService.update(warehouse.id, _warehouse)
          .then(response => {
            console.log('Warehouse updated:', response.data);
          })
          .catch(error => {
            console.error('Error updating warehouse:', error);
          });
    }
  },
  created() {
    // Inicializar servicios
    this.warehouseService = new WarehouseService();
    this.climateSensorService = new ClimateSensorService();
    this.enviroDeviceService = new EnviroDeviceService();

    // Cargar almacenes
    this.warehouseService.getAll()
        .then(response => {
          this.warehouses = response.data.map(warehouse => new Warehouse(warehouse));
          console.log(this.warehouses);
        })
        .catch(error => console.error(error));

    // Cargar todos los sensores climáticos y clasificar
    this.climateSensorService.getAll()
        .then(response => {
          const sensors = response.data.map(sensor => new ClimateSensor(sensor));
          this.thermometers = sensors.filter(sensor => sensor.type === 0); //0 = termometro
          this.hygrometers = sensors.filter(sensor => sensor.type === 1); //1 = higrometro
          console.log(this.thermometers);
        })
        .catch(error => console.error(error));

    // Cargar todos los dispositivos de control ambiental y clasificar
    this.enviroDeviceService.getAll()
        .then(response => {
          const devices = response.data.map(device => new EnviroDevice(device));
          this.heaters = devices.filter(device => device.type === 0); //heater
          this.humidifiers = devices.filter(device => device.type === 1); //humidifier
          console.log(this.heaters);
        })
        .catch(error => console.error(error));
  }
};
</script>

<template>
  <div>
    <!-- Botón para regresar a /management -->
    <div class="back-button">
      <router-link to="/management">
        <button class="return-btn">Management</button>
      </router-link>
    </div>

    <!-- Contenedor principal de los almacenes -->
    <div class="warehouse-container" v-for="warehouse in warehouses" :key="warehouse.id">
      <h2>{{ warehouse.name }}</h2>

      <!-- Recomendaciones de temperatura y humedad -->
      <div class="recommended">
        <div>
          <h4>Temperatura maxima recomendada: {{ warehouse.temperature.maximum }}</h4>
          <br>
          <h4>Temperatura minima recomendada: {{ warehouse.temperature.minimum }}</h4>
        </div>
        <div>
          <h4>Humedad maxima recomendada: {{ warehouse.humidity.maximum }}</h4>
          <br>
          <h4>Humedad minima recomendada: {{ warehouse.humidity.minimum }}</h4>
        </div>
      </div>

      <!-- Contenedor de IoT -->
      <div class="iot-container">
        <!-- Termómetros -->
        <div v-for="thermometer in thermometers" :key="thermometer.id">
          <div class="card" v-if="parseInt(thermometer.warehouseId) === warehouse.id">
            <h3>{{ thermometer.name }}</h3>
            <div class="humidity-card">
              <div class="temperature-display">
                <div class="termometro">
                  <div class="mercurio" :style="{ height: `${(warehouse.temperature.actual) / 100 * 100}%` }"></div>
                </div>
                <div class="temperature-card">
                  <p>{{ warehouse.temperature.actual }}°C</p>
                </div>
              </div>
            </div>
            <div v-if="warehouse.temperature.actual < warehouse.temperature.minimum" class="alert">¡Alerta! Temperatura baja: {{ warehouse.temperature.actual }}°C</div>
            <div v-if="warehouse.temperature.actual > warehouse.temperature.maximum" class="alert">¡Alerta! Temperatura alta: {{ warehouse.temperature.actual }}°C</div>
          </div>
        </div>

        <!-- Higrómetros -->
        <div v-for="hygrometer in hygrometers" :key="hygrometer.id">
          <div class="card" v-if="parseInt(hygrometer.warehouseId) === warehouse.id">
            <h3>{{ hygrometer.name }}</h3>
            <div class="humidity-card">
              <div class="humidity-display">
                <div class="temperature-card">
                  <p>{{ warehouse.humidity.actual }}%</p>
                </div>
                <div :style="{ width: warehouse.humidity.actual + '%' }" class="humidity-bar"></div>
              </div>
            </div>
            <div v-if="warehouse.humidity.actual < warehouse.humidity.minimum" class="alert">¡Alerta! Humedad baja: {{ warehouse.humidity.actual }}%</div>
            <div v-if="warehouse.humidity.actual > warehouse.humidity.maximum" class="alert">¡Alerta! Humedad alta: {{ warehouse.humidity.actual }}%</div>
          </div>
        </div>

        <!-- Calentadores -->
        <div v-for="heater in heaters" :key="heater.id">
          <div class="card" v-if="parseInt(heater.warehouseId) === warehouse.id">
            <span setHeaterTemperature(heater, warehouse.temperature.actual)></span>
            <h3>{{ heater.name }}</h3>
            <div class="humidity-card">
              <div class="humidity-display">
                <div class="temperature-card">
                  <p>{{ heater.value }}°C</p>
                </div>
                <input type="range" v-model="heater.value" min="0" max="100" />
              </div>
            </div>
            <div class="card-footer">
              <button @click="setWarehouseTemperature(heater, warehouse)">Set Temperature</button>
              <button @click="setHeaterTemperature(heater, warehouse.temperature.actual)">Reset</button>
            </div>
          </div>
        </div>

        <!-- Humidificadores -->
        <div v-for="humidifier in humidifiers" :key="humidifier.id">
          <div class="card" v-if="parseInt(humidifier.warehouseId) === warehouse.id">
            <h3>{{ humidifier.name }}</h3>
            <div class="humidity-card">
              <div class="humidity-display">
                <div class="temperature-card">
                  <p>{{ humidifier.value }}%</p>
                </div>
                <input type="range" v-model="humidifier.value" min="0" max="100" />
              </div>
            </div>
            <div class="card-footer">
              <button @click="setWarehouseHumidity(humidifier, warehouse)">Set Humidity</button>
              <button @click="setHumidifierHumidity(humidifier, warehouse.humidity.actual)">Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
.back-button {
  margin-bottom: 20px;
  text-align: center;

}

.return-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.return-btn:hover {
  background-color: #388E3C;
  transform: scale(1.05);
}

.storeroom-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
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

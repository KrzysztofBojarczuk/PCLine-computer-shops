<template>
  <div>{{ text1 }}</div>
  <div v-text="text2"></div>
  <h1 v-bind:style="successSTyle"></h1>
  <v-container>
    <v-row justify="center" align="end">
      <v-col cols="auto">
        <v-btn @click="toggleTableVisibility" variant="outlined"
          >Toggle Table</v-btn
        >
      </v-col>
      <v-col cols="auto">
        <v-btn variant="outlined">Create Shop</v-btn>
      </v-col>
    </v-row>
  </v-container>
  <div v-if="showTable">
    <div class="text-center ma-2">
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Id</th>
            <th class="text-left">Name</th>
            <th class="text-left">Date</th>
            <th class="text-left">Country</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.shopId">
            <td class="text-left">{{ item.shopId }}</td>
            <td class="text-left">{{ item.name }}</td>
            <td class="text-left">{{ item.startDate }}</td>
            <td class="text-left">{{ item.country }}</td>
          </tr>
        </tbody>
        <div v-if="desserts?.length === 0">No elemnts</div>
      </v-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { Shop } from "src/models/shop";

export default defineComponent({
  name: "HelloWorld",

  data() {
    return {
      snackbar: false,
      text1: "Hello 1",
      text2: "Hello 2",
      successSTyle: {
        color: "green",
        border: "20px solid green",
      },
      apiUrl: "https://localhost:7068/api/",
      desserts: [] as Shop[],
      showTable: true,
    };
  },

  methods: {
    async fetchData() {
      try {
        const pageNumber = 1;
        const pageSize = 10;
        const response = await axios.get(this.apiUrl + `Shops/Get`, {
          params: {
            pageNumber,
            pageSize,
          },
        });
        this.desserts = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    toggleTableVisibility() {
      this.showTable = !this.showTable;
    },
  },

  mounted() {
    this.fetchData();
  },
});
</script>

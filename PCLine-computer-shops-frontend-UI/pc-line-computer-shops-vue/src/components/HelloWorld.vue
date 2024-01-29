<template>
  <div>{{ text1 }}</div>
  <div v-text="text2"></div>
  <h1 v-bind:style="successSTyle"></h1>
  <v-container>
    <v-row justify="start" align="end">
      <v-col cols="auto">
        <v-text-field
          v-model="searchTerm"
          label="Search"
          class="custom-input"
        ></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="searchData" variant="outlined">Search</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="clearSearch" variant="outlined">Clear</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="toggleTableVisibility" variant="outlined"
          >Toggle Table</v-btn
        >
      </v-col>
      <v-col cols="auto">
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" @click="openDialogShop" variant="outlined"
              >Create Shop</v-btn
            >
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Dialog">
              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Close Dialog"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
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
      showDialogShop: false,
      searchTerm: "",
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
            searchTerm: this.searchTerm,
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

    openDialogShop() {
      this.showDialogShop = true;
    },

    closeDialogShop() {
      this.showDialogShop = false;
    },

    searchData() {
      this.fetchData();
    },

    clearSearch() {
      this.searchTerm = "";
      this.fetchData();
    },
  },

  mounted() {
    this.fetchData();
  },
});
</script>

<style scoped>
.custom-input {
  width: 200px;
}
</style>

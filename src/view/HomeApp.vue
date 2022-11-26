<template>
    <v-app class="table">
      <v-data-table
      :headers="headers"
      :items="coins"
      :loading="loading"
      >
        <template v-slot:[`item.img`]="{ item }">
          <img :src="item.image" alt="" width="20px">
        </template>
        <template v-slot:top>
          <v-row class="d-flex justify-center mb-2">
            <v-col cols="4">
              <v-text-field
              v-model="date"
              append-icon="mdi-calendar"
              label="dd-mm-yyyy"
              single-line
              hide-details
              v-mask="'##-##-####'"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-autocomplete
              v-model="selectedCoin"
              label="Select Coin"
              :items="coinsName"
              single-line
              hide-details
              ></v-autocomplete>
            </v-col>
            <!-- <v-col>
              <v-autocomplete
                v-model="category"
                :items="categories"
                label="Category"
              ></v-autocomplete>
            </v-col> -->
            <v-col cols="2">
              <v-btn class="button mt-5" small color="var(--dacxi-color)" @click="search"> Search </v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-slot:[`item.price-change`]="{ item }">
          <b :class="item.price_change_24h >= 1 ? 'green--text' : item.price_change_24h < 0 ? 'red--text' : 'grey--text'">
            {{item.price_change_24h}} %
          </b>
        </template>
      </v-data-table>
    </v-app>
</template>
<script>
  export default {
    data () {
      return {
        loading: false,
        date: '',
        coins: [],
        coinsName: [],
        selectedCoin: "",
        headers: [
        { text: "", value: 'img' },
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Symbol', value: 'symbol' },
          { text: 'Current Price', value: 'current_price' },
          { text: 'Price Change (24h)', value: 'price-change'},
          { text: 'Market Cap', value: 'market_cap' },
        ],
        desserts: [
        ],
      }
    },
    mounted(){
      this.listCoins();
    },
    methods:{
      listCoins(){
        this.loading = true;
        this.$http.get(
          "coins/markets?vs_currency=brl&ids=bitcoin%2C%20dacxi%2C%20ethereum%2C%20cosmos"
        )
        .then(resp => {
          this.loading = true;
          if(resp.status == 200){
            this.coins = resp.data.map(coin => {
              return {
                ...coin, 
                current_price: `R$ ${coin.current_price.toLocaleString()}`,
                price_change_24h: parseFloat(`${coin.price_change_24h.toFixed(2)}`),
                // price_change_24h: 2,
                market_cap: `R$ ${coin.market_cap.toLocaleString()}`,
              };
            })
            resp.data.map(coin => this.coinsName.push(coin.name))
          } else{
            console.log(resp.message)
          }
        }).finally(()=> this.loading = false)
      },
      search(){
        this.listCoins()
      }
    },
  }
</script>
<style>
  .table{
    animation: appear 2s;
  }
  .button{
    color: #fff !important;
  }
</style>
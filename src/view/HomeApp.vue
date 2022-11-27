<template>
  <div>
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
          <div class="d-flex justify-center mb-2 mobile">
            <v-col cols="4" class="mobile-inputs">
              <v-text-field
              v-model="date"
              append-icon="mdi-calendar"
              label="dd-mm-yyyy"
              single-line
              hide-details
              v-mask="'##-##-####'"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="mobile-inputs">
              <v-autocomplete
              v-model="selectedCoin"
              label="Select Coin"
              :items="coinsName"
              single-line
              hide-details
              item-text="name"
              item-value="id"
              ></v-autocomplete>
            </v-col>
            <v-col cols="2" class="mobile-inputs">
              <v-btn class="white--text mt-5" small color="var(--dacxi-color)" @click="search"> Search </v-btn>
            </v-col>
          </div>
          <!-- <v-row class="d-flex justify-center mb-2">
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
              item-text="name"
              item-value="id"
              ></v-autocomplete>
            </v-col>
            <v-col cols="2">
              <v-btn class="white--text mt-5" small color="var(--dacxi-color)" @click="search"> Search </v-btn>
            </v-col>
          </v-row> -->
        </template>
        <template v-slot:[`item.price-change`]="{ item }">
          <b :class="item.price_change_24h >= 1 ? 'green--text' : item.price_change_24h < 0 ? 'red--text' : 'grey--text'">
            {{item.price_change_24h}} %
          </b>
        </template>
      </v-data-table>
      <v-snackbar v-model="snackbarOptions.active" :color="snackbarOptions.color">
        {{snackbarOptions.message}}
        <template v-slot:action="{ attrs }">
          <v-btn
            text
            v-bind="attrs"
            @click="snackbarOptions.active = false"
          >
            Ok
          </v-btn>
        </template>
      </v-snackbar>
    </v-app>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        snackbarOptions: {
          active: false,
          message: "",
          color: ""
        },
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
    beforeMount(){
      console.log(this.text);
      this.listCoins();
      setInterval(() => {
        this.listCoins();
      }, 300000)
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
            this.coinsName = resp.data
          } else{
            console.log(resp.message)
          }
        }).finally(()=> this.loading = false)
      },
      search(){
        this.loading = true;
        this.$http.get(
          `coins/${this.selectedCoin}/history?date=${this.date}&localization=brl`
        ).then(resp => {
          const coin = resp.data;
          if(!coin.market_data){
            this.snackbar(
              "Data not found", 
              "error"
            )
          }
          this.coins = [{
            name: coin.name,
            symbol: coin.symbol,
            current_price: `R$ ${coin.market_data.current_price.brl.toFixed(2).toLocaleString()}`,
            price_change_24h: "- ",
            market_cap: `R$ ${coin.market_data.market_cap.brl.toFixed(2).toLocaleString()}`,
            image: coin.image.small
          }]
        }).catch((resp) => {
            this.snackbar(
              resp.response.data.error, 
              "error"
            )
          }
        ).finally(() => this.loading = false)
      },
      snackbar(message, color){
        this.snackbarOptions = {
          active: true,
          message,
          color 
        }
      }
    },
  }
</script>
<style>
  .table{
    animation: appear 2s;
    margin-top: 5rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 850px) {
    .table{
      margin-top: 1rem;
    }
    .mobile{
      flex-direction: column;

    }
    .mobile-inputs{
      max-width: 100%;
      text-align: center;
    }
  }
  
</style>
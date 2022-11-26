<template>
    <v-app class="table">
      <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      >
        <template v-slot:top>
          <v-row>
            <v-col cols="3">
              <v-text-field
              v-model="search"
              append-icon="mdi-calendar"
              label="dd/mm/yyyy"
              single-line
              hide-details
              v-mask="'##/##/####'"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search Coin"
              single-line
              hide-details
              v-mask="'##/##/####'"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="category"
                :items="categories"
                label="Category"
              ></v-autocomplete>
            </v-col>
            <v-col cols="2">
              <v-btn class="button mt-5" small color="var(--dacxi-color)"> Search </v-btn>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-app>
</template>
<script>
  export default {
    data () {
      return {
        search: '',
        category:'',
        categories:[],
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
        ],
      }
    },
    mounted(){
      this.categoriesList();
    },
    methods:{
      categoriesList(){
        this.loadinCategories = true;
        this.$http.get("coins/categories/list")
        .then(resp => {
          if(resp.status == 200){
            resp.data.map(category => this.categories.push(category.name))
          } else{
            console.log(resp.message)
          }
        }).finally(()=> console.log(this.categories))
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
<template>
    <div class="content">
        <p>See the current price and historical price of bitcoin and other cryptocurrencies</p>
        <button @click="appHome">consult prices</button>
    </div>
</template>
<script>
    export default{
        methods:{
            appHome(){
                this.$router.push("/app-home")
            }
        }
    }
</script>
<style scoped>
    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3rem;
        animation: appear 1.5s;
    }
    p{
        font-size: 2rem;
        width: 55vw;
        margin: auto;
        margin-top: 8rem;
        color: var(--dacxi-color);
        text-align: center;
    }
    button{
        padding: 10px 20px 10px 20px;
        background-color: var(--soft-blue);
        color: white;
        text-transform: uppercase;
        border-radius: 20px;
        transition: all 0.3s;
    }
    button:hover{
        background-color: var(--dacxi-color);
    }
</style>
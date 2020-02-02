<template>
  <div v-if='isShow' id="app">
    <div class='main'>
      <img v-if='isSuccess' style="width: 150px;height: auto;" src="./assets/success.png">
      <img v-else style="width: 150px;height: auto;" src="./assets/fail.png">
      <div class='title'>小猴偷米</div>
      <div v-if='isSuccess' class='subtitle-success'>统一身份认证成功</div>
      <div v-else class='subtitle-fail'>身份认证失败请重试</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      param:{},
      isShow: false,
      isSuccess: true
      
    }
  },
  methods:{
  },
  async created(){
    const loading = this.$loading({
      lock: true,
      text: '认证中······',
      background: 'rgba(0, 0, 0, 0.7)'
    });
  
    window.location.search.substr(1)
    .split('&')
    .forEach(param => {
      let key = param.split('=')[0]
      let value = param.split('=')[1]
      this.param[key] = value
    })

    let res
    try{
      // eslint-disable-next-line no-console
      console.log({
      platform: 'wechat',
      service: '',
      ticket: '',
      wxToken: this.param.ticket
    })
      res = await this.$axios.post('/auth',{
      platform: 'wechat',
      service: '',
      ticket: '',
      wxToken: this.param.ticket
    })
    }catch(err){
    this.isSuccess = false
    }


    if (res.data.code === 200 && res.data.success && res.data.result) {
      this.isSuccess = true
    }
    else{
      this.isSuccess = false
    }
    // eslint-disable-next-line no-console
    console.log(res.data)

    this.$nextTick(() => { 
      loading.close();
      this.isShow = true
    });
    
  }
}

</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
}
.main {
  text-align: center;
  margin-top: 100px;
}
.title {
  display: block;
  font-weight: 300;
  font-size: 47px;
  color: #333;
  letter-spacing: 1px;
}
.subtitle-success {
  font-weight: 300;
  font-size: 20px;
  color: #00abc3;
  letter-spacing: 4px;
  word-spacing: 5px;
  padding-bottom: 15px;
  margin: 0 20px;
}
.subtitle-fail {
  font-weight: 300;
  font-size: 20px;
  color: #F56C6C;
  letter-spacing: 1px;
  word-spacing: 5px;
  padding-bottom: 15px;
  margin: 0 20px;
}

</style>

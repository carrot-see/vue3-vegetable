<script>
export default {
  methods:{
    ifColor(i){
      if(i==1){
        document.body.style.backgroundColor = '#000'
        document.body.style.color = '#fff'
      }
      else if(i==0){
        document.body.style.backgroundColor = '#fff'
        document.body.style.color = '#000'
      }
    }
  }
}
</script>

<template>
<div>
  <router-view
    @ifColor="ifColor"
  ></router-view>
</div>
</template>

<style >
*{
  margin: 0;
  padding: 0;
}
</style>

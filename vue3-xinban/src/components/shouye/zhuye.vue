<template>
  <div class="li" @click="$router.push(`/xiangxi/${item.id}`)">
    <div>{{item.text}}</div>
    <div>价格:{{item.qian*10}}</div>
    <div>{{ item.text1.substring(0,10) }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
  }
})

</script>

<style scoped>
.li{
    height: 100px;
    margin-top:10px;
    padding: 20px 50px;
}
</style>
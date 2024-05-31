<template>
  <div class="containermodal">
    <div class="auction-popup" role="dialog">
      <div class="modal-content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "auctionModal"
}
</script>

<style scoped>
.containermodal{
  display: block;
  position: fixed;
  z-index: 9999;
  background-color: rgba(32, 29, 86,0.6);
  width: 100%;
  height: 100vh;
  top: 0;
  border-radius: 10px;
  transition: 0.3s ease;
  left: 0;
}
.auction-popup{
  width: 50%;
  top: 40%;
  position: absolute;
  left: 50%;
  transform: translate(-50%);

}
.modal-content{
  min-height: 250px;
  padding: 25px;
  padding-top:60px;
  border-radius: 10px;
}
@media(max-width: 800px){
  .auction-popup{
    width: 85%;
    top: 35%;
  }
  .modal-content{
    min-height: 190px;
    padding: 3.5%;
  }
}
</style>
<template>
  <TitleHeaderFootball>
    <span class="title1">WhatsGaming</span> <span class="title2">leaderboard</span>
  </TitleHeaderFootball>
  <div>
    <div class="container">
      <div class="text-center mainTitle">
        <b>Get attractive</b>
        <span class="mx-2">Coinboosts</span>
      </div>
      <p class="mainP mt-3 mb-5">
        We appreciate your loyalty. Season after season you are the ones who support us . we would like to thank you all with the whatsgaminG loyalty program. Starting at 5,000,000 FIFA Coins, you benefit from a 2% discount on all your future orders for the entire FIFA Season.
      </p>
      <div class="col-md-12">
        <div class="row justify-content-between">
          <div class="col-md-6 dt-container">
            <div>
              <leader-board-data-table :mode="leaderboardModes.Weekly"/>
            </div>
          </div>
          <div class="col-md-6 dt-container">
            <div>
              <leader-board-data-table :mode="leaderboardModes.Monthly"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TitleHeaderFootball from "../../../components/blocks/TitleHeaderFootball";
import LeaderBoardDataTable from "../../../components/leaderboard/leaderBoardDataTable";
import leaderboardModes from "../../../components/leaderboard/leaderboardModes";

</script>

<style scoped>
.container{
  max-width: 83%;
}
.title1{
  font-weight: bold;
  font-family: 'Montserrat' !important;
}
.title2{
  font-weight: 500;
  font-family: 'Montserrat' !important;
}
.mainTitle{
  font-size:var(--font-size-24px);
}
.mainP{
  font-size:var(--font-size-16px);
  font-weight: 500;
}
.dt-container{
  flex: 0 0 48%;
  box-sizing: border-box;
  border: 3px solid transparent;
  background-clip:padding-box;
  min-height: 850px;
  padding: 0;
}
.bg{
  background-color: red;
}
@media(max-width: 800px){
  .container{
    max-width: 100%;
  }
  .dt-container{
    width: 100%;
    flex:initial;
  }
}
</style>
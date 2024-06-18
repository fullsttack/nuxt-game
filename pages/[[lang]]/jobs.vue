<template>
  <div>
    <TitleHeaderFootball>
      {{ $t('job_offer.header') }}
    </TitleHeaderFootball>
    <div class="container">
      <section>
        <div class="text-title text-center">
          {{ $t('job_offer.current_jobs_title') }}
        </div>
        <div class="text-content mt-3 mb-5" style="text-align: justify;" v-html="$t('job_offer.current_jobs_desc')"></div>
      </section>
      <section>
        <div class="jobs-box justify-content-start d-none">
          <div class="desktop-view">
            <nuxt-img loading="lazy" src="/images/jobs/job1.webp"/>
          </div>
          <div class="d-block">
            <div class="text-title text-center">
              {{ $t('job_offer.block_1_title') }}
            </div>
            <nuxt-img loading="lazy" class="responsive-view img-res" src="/images/jobs/job1.webp" />
            <div class="text-content mt-3 mb-5" v-html="$t('job_offer.block_1_desc')"></div>
            <div class="text-content requirements">
              <p>{{ $t('job_offer.block_1_list_1_title') }}</p>
              <ul>
                <li>
                  {{ $t('job_offer.block_1_list_1_item_1') }}
                </li>
                <li>
                  {{ $t('job_offer.block_1_list_1_item_2') }}
                </li>
              </ul>

            </div>
            <div>
              <a class="btn btn-contact-us" href="mailto:jobs@whatsgaming.net">
                {{ $t('job_offer.block_1_button') }}
              </a>
            </div>
          </div>
        </div>

        <div class="jobs-box d-flex justify-content-start">
          <div class="desktop-view">
            <nuxt-img loading="lazy" src="/images/jobs/job2.webp"/>
          </div>
          <div class="d-block">
            <div class="text-title text-center">{{ $t('job_offer.block_2_title') }}</div>
            <nuxt-img loading="lazy" class="responsive-view img-res" src="/images/jobs/job2.webp"/>
            <div class="text-content mt-3 mb-5" v-html="$t('job_offer.block_2_desc')"></div>
            <div class="text-content requirements">
              <p>{{ $t('job_offer.block_2_list_1_title') }}</p>
              <ul>
                <li>
                  {{ $t('job_offer.block_2_list_1_item_1') }}
                </li>
                <li>
                  {{ $t('job_offer.block_2_list_1_item_2') }}
                </li>
                <li>
                  {{ $t('job_offer.block_2_list_1_item_3') }}
                </li>
              </ul>

              <p>{{ $t('job_offer.block_2_list_2_title') }}</p>
              <ul>
                <li>
                  {{ $t('job_offer.block_2_list_2_item_1') }}
                </li>
                <li>
                  {{ $t('job_offer.block_2_list_2_item_2') }}
                </li>
                <li>
                  {{ $t('job_offer.block_2_list_2_item_3') }}
                </li>
              </ul>

            </div>
            <div>
              <a class="btn btn-contact-us" href="mailto:jobs@whatsgaming.net" >
                {{ $t('job_offer.block_2_button') }}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    <auth-verification/>
  </div>
</template>

<script>
import TitleHeaderFootball from "../../components/blocks/TitleHeaderFootball";
import AuthVerification from "../../components/embeded/AuthVerification";
export default {
  name: "jobs",
  components: {AuthVerification, TitleHeaderFootball}
}
</script>

<style scoped>
.text-title{
  font-size: 19.5px;
  font-weight: bold;
  color:#201D56;
}
.text-content{
  font-size: 16px;
  font-weight: 500;
  color:#201D56;
  line-height: 30px;
}
.jobs-box{
  background-color: #F0F0F0;
  padding: 35px;
  width: 100%;
  min-height: 400px;
  gap: 40px;
  margin-bottom: 25px;
}
.jobs-box > div:last-child{
  width: 100%;
}
.btn-contact-us{
  width: 170px;
  height: 44px;
  border-radius: 8px;
  background-color: #201D56;
  color:white;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 8px;
}
.btn-contact-us:hover{
  color:gray !important;
}
.container{
  margin-top: 35px;
}
.jobs-box img{
  width: 285px;
}
.requirements p{
  font-weight: bold;
}
.requirements ul{
  list-style: none;
  padding-left: 0;
}
.requirements ul li{
  margin-bottom: 5px;
  font-weight: 500;
}
@media (max-width: 800px) {
  .jobs-box img{
    width: 140px;
  }
  .img-res{
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .text-title{
    font-size: 15px;
  }
  .text-content{
    font-size: 13px;
  }
  .jobs-box{
    padding: 20px;
    padding-top: 25px;
  }
  .btn-contact-us{
    width: 100%;
    padding-top: 6px;
  }
}

</style>
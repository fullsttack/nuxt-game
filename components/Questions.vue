<template>
  <div>
    <div class="row faq__container desktop" v-if="isDesktop">
      <div class="col-lg-5 mr-4">
        <div class="accordion">
          <div v-for="(item) in items" :class="{ active: item_selected.id === item.id }" class="faq--question" @click="selectItem(item)" :key="item.id">
            <h3>{{ item.question }}</h3>
            <nuxt-img loading="lazy" v-if="item_selected.id === item.id" src="/svg/ionic-ios-arrow-right.svg" alt="read more faq icon" />
            <nuxt-img loading="lazy" v-else src="/svg/ionic-ios-arrow-down-black.svg" alt="minimize faq icon"/>
          </div>
        </div>
      </div>

      <div v-for="(item) in items" class="col-lg-6" style="max-width: 100% !important; flex: 1 0 50%" v-show="item.id===item_selected.id">
        <div class="h-100 pt-1 pb-1 bg-purple" style="border-radius: 15px;">
          <div class="faq--item" v-html="removeStyleAttribute(item.answer)"></div>
        </div>
      </div>
    </div>

    <div class="row faq__container phone" v-else>
      <div class="col-lg-5 mr-4">
        <div class="accordion">
          <div v-for="(item) in items" :class="{ active: item_selected.id === item.id }" class="faq--question" @click="selectItem(item)" :key="item.id">
            <div class="title">
              <h3>{{ item.question }}</h3>
              <img loading="lazy" v-if="item_selected.id === item.id" src="/svg/icon-feather-minus-circle.svg" alt="icon close faq"  width="20.339" height="20.339"/>
              <img loading="lazy" v-else src="/svg/icon-feather-plus-circle.svg" alt="icon open faq" width="20.34" height="20.34"/>
            </div>
            <div v-show="item_selected.id === item.id" style="max-width: 100% !important; flex: 1 0 50%">
              <div class="h-100 pt-1 pb-1 bg-purple" >
                <div class="faq--item" v-html="item_selected.answer.replace('background:white','')"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {SSRRequest} from "../composables/SSRRequest";
import {ref} from "vue";
import UseUtils from "../composables/useUtils";

export default {
  props: {
    category: {type: String, default: ''}
  },
  setup(props) {
    const {removeStyleAttribute} = UseUtils();
    const faqs = ref([]);
    const items = ref([]);
    const item_selected = ref(null);
    let regex = /&(nbsp|amp|quot|lt|gt);/g;
    SSRRequest.get('questions?category=' + props.category).then((res)=>{
      if(res.data.length !== 0){
        faqs.value = res.data;
        items.value = faqs.value.map((i, key) => {
          i.question = i.question.replace(/<[^>]*>/g, '').replace(regex, " ");
          i.answer = i.answer.replace("</ol> </ol","");
          return i
        })
        item_selected.value = items.value[0];
      }
    })
    const { isDesktop } = useDevice();

    return {items, item_selected, removeStyleAttribute,isDesktop};
  },
  methods: {
    selectItem(item) {
      if (item.id === this.item_selected.id) {
        this.item_selected = this.items[0];
        return
      }
      this.item_selected = item
    }
  },
}
</script>

<style scoped>
@import "@/public/css/pages/buycoins.css";
.faq--item > p  *,.col-lg-6 > div > div > p > span{
  background: transparent !important;
}

</style>
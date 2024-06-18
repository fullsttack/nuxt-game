<template>
  <Teleport to="#modal_place">
    <div class="containermodal" id="myModal_container">
      <div id="myModal" class="modal fade visa-modal" role="dialog">
        <div class="modal-dialog modal-xs">
          <div v-show="processingRequest" class="modal-content">
            <div style="margin:0 auto;width: 35%;">
              <nuxt-img loading="lazy" alt="visa payment loading" src="/images/visa/loading.svg" />
            </div>
            <h4 class="text-center">{{ $t('buybox.credit_card.processing') }}</h4>
          </div>
          <div v-show="!processingRequest" class="modal-content">
            <div class="modal-body">
              <button type="button" class="close" @click="closeDialog">&times;</button>
              <div class="title">{{ $t('buybox.credit_card.title') }}</div>

              <div class="col-md-12">
                <div class="alert alert-danger" v-if="error !== ''">
                  {{ error }}
                </div>
                <div class="form-group">
                  <label for="inputcard">{{ $t('buybox.credit_card.card_number') }}</label>
                  <input
                      ref="card_input"
                      id="inputcard" type="text" class="form-control" :class="cardIcoCls"
                      placeholder='1234 1234 1234 1234' pattern="[0-9]*" inputmode="numeric"
                  />
                </div>
              </div>
              <div class="col-12 oneline">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="inputdate">{{ $t('buybox.credit_card.card_expire') }}</label>
                    <input
                        ref="input_date"
                        id="inputdate" type="text" pattern="[0-9]*" inputmode="numeric" class="form-control ico-date ico-light" placeholder='MM/YY' maxlength="7"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="inputdate">{{ $t('buybox.credit_card.cvv') }}</label>
                    <input
                        ref="input_ccv"
                        id="inputccv" type="text" pattern="[0-9]*" inputmode="numeric" maxlength="3"  class="form-control ico-cvv ico-light" placeholder='XXX'
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="inputcard">{{ $t('buybox.credit_card.card_holder') }}</label>
                  <input
                      v-model="modelValue.holder"
                      ref="card_cardname"
                      type="text" class="form-control ico-user ico-light"
                      :placeholder="$t('buybox.credit_card.card_holder_placeholder')"
                  />
                </div>
                <div class="form-group dflex" style="margin-left: 25px;">
                  <input class="form-check-input" type="checkbox" v-model="modelValue.save_card">
                  <div class="saveinfolbl">{{ $t('buybox.credit_card.save_card') }}</div>
                </div>
                <nuxt-img alt="visa logos" loading="lazy" src="/images/visa/logos.svg"/>
                <div class="hr"/>
              </div>

            </div>
            <div class="modal-footer">
              <div class="col-12 row res-footer" >
                <div class="col-md-6 text-left">
                  <p class="price">{{ modelValue.total_price_text }}</p>
                  <p>{{ $t('buybox.credit_card.total') }}</p>
                </div>
                <div class="col-md-6">
                  <button @click="BuyNow" class="btn btn-pay">{{ $t('buybox.credit_card.pay') }}</button>
                  <nuxt-img alt="safepay icon" loading="lazy" src="/images/visa/safepay.svg" style="float: right;"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import IMask from 'imask';
export default {
  name: "visaPayment",
  props:{
    open:{
      type:Boolean,
      default:false
    },
    payerror:{
      type:String
    },
    modelValue:{
      type:Object,
    }
  },
  emits: ['update:modelValue', 'close', 'buy'],
  data(){
    return{
      cardIcoCls:'',
      error:'',
      processingRequest:false,
      cardMasks:[
        {
          mask: '0000 000000 00000',
          regex: '^3[47]\\d{0,13}',
          cardtype: 'american express',
          ico:'ico-americanexpress'
        },
        {
          mask: '0000 0000 0000 0000',
          regex: '^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}',
          cardtype: 'discover',
          ico: 'ico-validcard'
        },
        {
          mask: '0000 000000 0000',
          regex: '^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}',
          cardtype: 'diners',ico: 'ico-validcard'
        },
        {
          mask: '0000 0000 0000 0000',
          regex: '^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}',
          cardtype: 'mastercard',
          ico:'ico-mastercard'
        },
        {
          mask: '0000 000000 00000',
          regex: '^(?:2131|1800)\\d{0,11}',
          cardtype: 'jcb15',ico: 'ico-validcard'
        },
        {
          mask: '0000 0000 0000 0000',
          regex: '^(?:35\\d{0,2})\\d{0,12}',
          cardtype: 'jcb',ico: 'ico-validcard'
        },
        {
          mask: '0000 0000 0000 0000',
          regex: '^(?:5[0678]\\d{0,2}|6304|67\\d{0,2})\\d{0,12}',
          cardtype: 'maestro',ico: 'ico-validcard'
        },
        // {
        //     mask: '0000-0000-0000-0000',
        //     regex: '^220[0-4]\\d{0,12}',
        //     cardtype: 'mir'
        // },
        {
          mask: '0000 0000 0000 0000',
          regex: '^4\\d{0,15}',
          cardtype: 'visa',
          ico:'ico-visa'
        },
        {
          mask: '0000 0000 0000 0000',
          regex: '^62\\d{0,14}',
          cardtype: 'unionpay',ico: 'ico-validcard'
        },
        {
          mask: '0000 0000 0000 0000',
          cardtype: 'Unknown'
        }
      ],
      cardnumber_mask:null
    }
  },
  computed: {
    // value: {
    //   get() {
    //     return this.modelValue
    //   },
    //   set(value) {
    //     this.$emit('update:modelValue', value)
    //   }
    // }
  },
  methods:{
    closeDialog(){
      $(".containermodal").css("display","none");
      $('#myModal').css("display","none").css('opacity','0');
      $("#myModal_container").css('position','relative');
      this.$emit('close');
    },
    toggle(){
      // $('#myModal').modal('toggle')
      $("#myModal_container").css('position','fixed');
      $(".containermodal").css("display","block");
      $('#myModal').css("display","block").css('opacity','1');
      this.error = '';
      // this.cardnumber_mask.value = "4000000000000000";
      // this.cardnumber_mask.updateValue();
      // this.$refs.card_input.focus();
      // this.$nextTick(()=>{
      //   this.$refs.card_input.blur();
      // });
    },
    BuyNow(){
      if(this.cardnumber_mask.masked.currentMask.isComplete && this.cardnumber_mask.masked.currentMask.cardtype != 'Unknown'){
        this.processingRequest = true;
        const cardInfo = {
          number : this.$refs.card_input.value.replaceAll(" ",""),
          expired_month_year:this.$refs.input_date.value,//.replaceAll(" ",""),
          cvv: this.$refs.input_ccv.value,
          holder:this.$refs.card_cardname.value,
          save_card:this.modelValue.save_card
        }
        this.$emit('buy',cardInfo)
      }else{
        this.error = "Invalid Card Number";
      }
    },
    initForm(){
      var $this = this;
      this.cardnumber_mask = new IMask(this.$refs.card_input, {
        mask: this.cardMasks,
        dispatch: function (appended, dynamicMasked) {
          var number = (dynamicMasked.value + appended).replace(/\D/g, '');
          for (var i = 0; i < dynamicMasked.compiledMasks.length; i++) {
            let re = new RegExp(dynamicMasked.compiledMasks[i].regex);
            if (number.match(re) != null) {
              return dynamicMasked.compiledMasks[i];
            }
          }
        }
      });
      var expirationdate_mask = new IMask(this.$refs.input_date, {
        mask:Date,
        pattern: 'm / Y',
        blocks: {
          m: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
            maxLength: 2,
          },
          Y: {
            mask: IMask.MaskedRange,
            from: 1900,
            to: 9999,
            maxLength: 2,
          }
        },
      });
      this.cardnumber_mask.on("accept", function () {
        $this.cardIcoCls = $this.cardnumber_mask.masked.currentMask.ico;
      });
    }
  },
  mounted() {
    //if (navigator.userAgent.indexOf("Firefox") == -1){}
    this.initForm();
  },
  watch:{
    open(o,n){
      if(o) {
        this.toggle();
      }
    },
    payerror(n){
      if(n !== ''){
        this.processingRequest = false;
      }
      this.error = n;
      // setTimeout(()=>{
      //   this.initForm();
      // },1000);
    }
  }
}
</script>

<style scoped>
@import "@/public/css/components/puremodal.css";
#myModal{
  z-index: 999999999;
}
.animate-delay{
  display: block;
  transition: 0.5s all ease;
}
.dflex{
  display: flex;
  align-items: flex-start;
}
.modal-sm {
  width: 480px !important;
  font-family: 'Montserrat';
}
.title{
  font-weight: bold;
  text-align: center;
  font-size: 26px;
  font-family: 'Montserrat';
  text-transform: uppercase;
  margin-top: 20px;
  margin-bottom: 15px;
}
input:not(input[type=checkbox]) {
  border-radius: 1px;
  height: 56px;
  color: black;
  font-weight: 500;
  font-size: 16px;
  background-color: #f4f4f4bd;
}
input:focus{
  border-color: inherit;
}
button.close{
  transform: scale(1.3);
}
label{
  font-family: 'Montserrat';
  font-size: 14px;
  color:#828187;
  font-weight: 500;
  margin-left: 3%;
}
.saveinfolbl{
  font-weight: 400;
  font-size: 13px;
  font-family: 'Montserrat';
  -webkit-text-stroke: 0.4px;
  margin-left: 10px;
}
input[type=checkbox]{
  transform: scale(1.2);
  margin-top: 2px;
}
.hr{
  width: 95%;
  background-color: #e7e7e7;
  height: 1px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;

}
.btn-pay{
  width: 100%;
  height: 50px;
  color:white;
  background-color: #35BBB8;
  font-size: 14px;
  padding-top: 14px;
  font-weight: 700;
  margin-bottom: 10px;
}
.modal-footer{
  border: 0;
}
.price{
  color:#5ED25B;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
}
.ico-visa{
  background-image: url(data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxwYXRoIGZpbGw9IiMxNTY1QzAiIGQ9Ik00NSwzNWMwLDIuMjA5LTEuNzkxLDQtNCw0SDdjLTIuMjA5LDAtNC0xLjc5MS00LTRWMTNjMC0yLjIwOSwxLjc5MS00LDQtNGgzNGMyLjIwOSwwLDQsMS43OTEsNCw0VjM1eiIvPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0xNS4xODYgMTlsLTIuNjI2IDcuODMyYzAgMC0uNjY3LTMuMzEzLS43MzMtMy43MjktMS40OTUtMy40MTEtMy43MDEtMy4yMjEtMy43MDEtMy4yMjFMMTAuNzI2IDMwdi0uMDAyaDMuMTYxTDE4LjI1OCAxOUgxNS4xODZ6TTE3LjY4OSAzMEwyMC41NiAzMCAyMi4yOTYgMTkgMTkuMzg5IDE5ek0zOC4wMDggMTloLTMuMDIxbC00LjcxIDExaDIuODUybC41ODgtMS41NzFoMy41OTZMMzcuNjE5IDMwaDIuNjEzTDM4LjAwOCAxOXpNMzQuNTEzIDI2LjMyOGwxLjU2My00LjE1Ny44MTggNC4xNTdIMzQuNTEzek0yNi4zNjkgMjIuMjA2YzAtLjYwNi40OTgtMS4wNTcgMS45MjYtMS4wNTcuOTI4IDAgMS45OTEuNjc0IDEuOTkxLjY3NGwuNDY2LTIuMzA5YzAgMC0xLjM1OC0uNTE1LTIuNjkxLS41MTUtMy4wMTkgMC00LjU3NiAxLjQ0NC00LjU3NiAzLjI3MiAwIDMuMzA2IDMuOTc5IDIuODUzIDMuOTc5IDQuNTUxIDAgLjI5MS0uMjMxLjk2NC0xLjg4OC45NjQtMS42NjIgMC0yLjc1OS0uNjA5LTIuNzU5LS42MDlsLS40OTUgMi4yMTZjMCAwIDEuMDYzLjYwNiAzLjExNy42MDYgMi4wNTkgMCA0LjkxNS0xLjU0IDQuOTE1LTMuNzUyQzMwLjM1NCAyMy41ODYgMjYuMzY5IDIzLjM5NCAyNi4zNjkgMjIuMjA2eiIvPjxwYXRoIGZpbGw9IiNGRkMxMDciIGQ9Ik0xMi4yMTIsMjQuOTQ1bC0wLjk2Ni00Ljc0OGMwLDAtMC40MzctMS4wMjktMS41NzMtMS4wMjljLTEuMTM2LDAtNC40NCwwLTQuNDQsMFMxMC44OTQsMjAuODQsMTIuMjEyLDI0Ljk0NXoiLz48L3N2Zz4=);
  background-repeat: no-repeat;
  background-position-x: 99%;
  background-position-y: 3.5px;
}
.ico-mastercard{
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACnUlEQVR4nO2YzWsTQRjGNxRR8VA9+dG01ngoIv4J2Y9m7aGrJtOKePbkxYNgGpM0Hz30qFc/ED2pbRHSXTcqaRT8FwR70UvWJHhQ0VLSg+ArM2lKW91spjM1G5kHnstmhzy/4Z2Zd0eShISEhISE/ieFo68GZWQ/U1BxRUFF8IlXZGQXtAsvRzzDKzH7qw8Cg4u/4YyuAOszDz73giuAz8oG/m77RzsA6AVLLAB6zISZ8QSUdQUcNQhr4X3ENfUoLOkq+W0UWVvHXDRhJpGE8n0dnEII1sr9xE4hRJ7lEynyzq4DZIwU1NQjAGGprevKYUgZmeaYqWmoWUMAb/e2dc06Dpl4ZncANPQc5sYmPINv9q9wAJYyEc/gsM1zty+BNmHzBaANj/3u6hnq8LDuJ7cu8wPAZUMb/g8/2EMNkY5n2QHwgsWLkxkgGgB4QwdQtwZdF3bHAHhHoQ27HB3ZcenANuem0mwAr3WZGuB98jQ3gNK9s2wAn9Rj7OXTMgpQAziFEBtAQ97PDyAiUQM0ygf/PUCj2M+thFZLh9gAHHWAGqD+MMgNoLLIWEK43+FWQtf66BfxXcZFnDdu8gO4Q3+YZVm30UjMhKpCtxP9lPvg86MB5vKpWUPsB1mzlUhTz/aH8yeZAVI3ct1t5jacpa/9xzybOWwtZsPTsUnqdnr5yqkddaIa73a65bQx3dGawB8018/NNsfEs1A1hz2DV83htmXDBaC1sHPjSSjpGlTUIDnsVuUD8FE7QZ4ljDz5ANoyZtIkjRnubfDejk9Y7MpiiDzDuw1+p5P/Zwbwg6VevlaRY/Z3VwB8fdftgIq3510B8N0jvr7z7eyj4hcFvQhKnvejqLiAb8C6HVjZMMky7xleSEhISEhI6jH9Bnm6laI4if4oAAAAAElFTkSuQmCC');
  background-repeat: no-repeat;
  background-position-x: 99%;
  background-position-y: 3.5px;
}
.ico-disovercard{
  background-image: url('data:image/png;base64,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');
  background-repeat: no-repeat;
  background-position-x: 99%;
  background-position-y: -3.5px;
}
.ico-jcb{
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEvElEQVR4nO2a/U9aVxjH/Q+2f2ZNf+/7L5vJbJslW7smTfdDu2RJF9upbUVFoUvbpWKxvCkI1c5GU4XKmx2oeAEV0aqggBV02Mp8fwEUfJZDMpbLBb0XLhLN+SbPTz7neD73PJyX5zlFRVhYWFhYWFhYWEek0iei048Eioraxlb+cTbEUPpEdDoj6KNnTV9yBEqb5I1u2exwg2XMc6wNMUje6JerBCriHu/lFxTg6gal1TziivlDG3CSzDTiilXWK/ooYYxmttCDy5eJ/tT+U8oTn0oCVwpaHqAQKPTA8mVmhxs4zxUV/4ezQPkH8cFLcRx0LUKNcgiu1RqhuOIdfF2mOdCEXRNp/6F3ZBycnGqwX74C1nPngDhz5kCbEIrT9mPzeeCprgXuKGvgR+l9uCYpPdCa+tWJdogNMR4ILNe7aUEeBjyleEUL8jDgNpuRFmRWwB0DXkagmYDdbzWMQDMBdzsJRqCMgH2f1uB7riFn4LnFZbB9W5Iz8OznFbitrMofcM+QPyvYVOAZgykr2FRg4+RoVrC0gWU9U6wAT8kUrAC/IvT5BRZ2TbACjAbNBjAaNAaW4BmGvIb05s4upCpTSNsuXoSATAaRYBBgfx8OU2pIj/pngK42wlugJLoKB2y7dAnWnU6K78rgIHgfPwYvjwcBqRSW9HrYCQQSH+QwYFfQB/x34qQ1D3RAeDdK8qnuflEY4L/b2ih+c42NGReroeLiQ4EJn5MSup0OA8lHPfbX0QO7ZHKIRyIkn/XRUcarNB1gaV87yafb+f7ogQNa8ldH8tTVsQ58s7kcvEt+kg9XLTx64E+EjeIzfutWzsBbkW34GFpIGlqo/lM0tgtdzl72F62dyB5pELHYfsGAV7c3kn/biYbB4nHAT4qH9IH1w/OJxrPB9bSwN/i9FJCF0Ba9kObxWA/pG7LfwBlwkXz6ZoboA4vUk7C0upNoWKcaoQC/tcxSQFSG6fSLVjhM8kNbVD4Wraf6JkoUMArpMrEV9mJxiO7Foe29B34R9MOvQgtorHOUs8PM/CqUPOxJvy21tjLalqznz2cFLLd0knyWt9aY/4YfSG2wskHeVlLVPx6EqxxdxssDOnisORyUdisEAV4+HzxcLnxsaIDFjg7YmJhIbGNMDx4i82vYjGyTfNRjpuwWre+q9CDXumE6sArhaCwx4/NLm6C1+eHuiwFatyXrhQuJ01R4YQH24/EDP2CuR0t04jJN2+FmUzm+Hlbj+/AHnAAAphmPZp2LlYzHpFzFSsaj1WrIb4pHO+xnBXi6t48VYOOkM3/AP9QaEyneXIHtJZcTKd5cgW8rqxMp3rwAf1OugU6Lj5Q8zwr47Flwd/eQ+skG+LrkHmjGrMk+WAVG5RiFgVqIYwqMyjFTLa2UfpgCo3LMa1svqQ8iV2AEeb3OCFzVMBCuRcog6QIjSPuVqzBWVQNeR/pCHB1gBPmzigvP9Eqw+6hFQSIV+KSXS00jLqisl5enFMT1J7YgLm7XhUgFcST0FgI9DziBsxurfK4wF6UKPfxAbyHE7doQCoFCP0rJ1RCDuF0XQrBpH7Ukw5snPoWe/FTVKxuPs3EEqrL7v7/8KiMoFhYWFhYWFhZWEbv6F1/SI9LgxsM5AAAAAElFTkSuQmCC');
  background-repeat: no-repeat;
  background-position-x: 99%;
  background-position-y: -2.5px;
}
.ico-americanexpress{
  background-image: url('data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxsaW5lYXJHcmFkaWVudCBpZD0iNGFRU0YzS1lzbUFVbEVaOEp6REhHYSIgeDE9IjIwLjM3NSIgeDI9IjI4Ljc0OCIgeTE9IjEzNjUuMDYxIiB5Mj0iMTM5NC45NDYiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtMTM1NCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMwMGIzZWUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDgyZDgiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGZpbGw9InVybCgjNGFRU0YzS1lzbUFVbEVaOEp6REhHYSkiIGQ9Ik00My4xMjUsOUg0Ljg3NUMzLjI4Nyw5LDIsMTAuMjg3LDIsMTEuODc1djI0LjI1QzIsMzcuNzEzLDMuMjg3LDM5LDQuODc1LDM5aDM4LjI1CUM0NC43MTMsMzksNDYsMzcuNzEzLDQ2LDM2LjEyNXYtMjQuMjVDNDYsMTAuMjg3LDQ0LjcxMyw5LDQzLjEyNSw5eiIvPjxwYXRoIGQ9Ik0yMy43NzgsMjcuOTgxYy0wLjgyNywwLTEuNS0wLjY3My0xLjUtMS41VjI2LjQ0bC0wLjMwOSwwLjY2OWMtMC4yNDQsMC41MjktMC43NzksMC44NzItMS4zNjIsMC44NzIJaC0wLjkxN2MtMC41OTMsMC0xLjEzMS0wLjM1LTEuMzcxLTAuODkybC0wLjI1NC0wLjU3MmMtMC4wMTksMC44MTEtMC42ODQsMS40NjQtMS41LDEuNDY0aC0yLjYzOGMtMC41OTYsMC0xLjEzNS0wLjM1My0xLjM3NC0wLjg5OAlsLTAuMjg5LTAuNjZoLTIuMTJsLTAuMjgsMC42NTFjLTAuMjM4LDAuNTUxLTAuNzc5LDAuOTA3LTEuMzc4LDAuOTA3SDcuMzgzYy0wLjY4OSwwLTEuMjUtMC41NjEtMS4yNS0xLjI1di0wLjA1NWwwLjAxMi0wLjEyCUw2LjE3OSwyNi40bDIuODQtNi41MDNDOS4yNjEsMTkuMzUyLDkuOCwxOSwxMC4zOTQsMTloMS42MjNjMC41OSwwLDEuMTI3LDAuMzQ4LDEuMzY5LDAuODg3bDAuOTU4LDIuMTQ2VjIwLjUJYzAtMC44MjcsMC42NzMtMS41LDEuNS0xLjVoMS44NzJjMC41ODksMCwxLjEyNiwwLjM0NywxLjM2OCwwLjg4NWwxLjA2MSwyLjM2MmwxLjA2Ny0yLjM2M0MyMS40NTMsMTkuMzQ3LDIxLjk5LDE5LDIyLjU3OCwxOUgyNC41CWMwLjgyNywwLDEuNSwwLjY3MywxLjUsMS41djUuOTgxYzAsMC44MjctMC42NzMsMS41LTEuNSwxLjVIMjMuNzc4eiIgb3BhY2l0eT0iLjA1Ii8+PHBhdGggZD0iTTIzLjc3OCwyNy40ODFjLTAuNTUxLDAtMS0wLjQ0OS0xLTF2LTIuMzE4TDIxLjUxNSwyNi45Yy0wLjE2MywwLjM1My0wLjUxOSwwLjU4MS0wLjkwOCwwLjU4MQloLTAuOTE3Yy0wLjM5NSwwLTAuNzU0LTAuMjMzLTAuOTE0LTAuNTk1bC0xLjIxLTIuNzI5djIuMzI0YzAsMC41NTEtMC40NDksMS0xLDFoLTIuNjM4Yy0wLjM5NywwLTAuNzU3LTAuMjM1LTAuOTE2LTAuNTk5CWwtMC40Mi0wLjk1OUg5LjgxNWwtMC40MSwwLjk1NGMtMC4xNTksMC4zNjctMC41MTksMC42MDQtMC45MTksMC42MDRINy4zODNjLTAuNDE0LDAtMC43NS0wLjMzNi0wLjc1LTAuNzV2LTAuMDY3bDAuMDM1LTAuMTU2CWwyLjgxLTYuNDExYzAuMTYxLTAuMzYzLDAuNTItMC41OTgsMC45MTYtMC41OThoMS42MjNjMC4zOTQsMCwwLjc1MSwwLjIzMiwwLjkxMywwLjU5MWwxLjkxNSw0LjI4OFYyMC41YzAtMC41NTEsMC40NDktMSwxLTFoMS44NzIJYzAuMzkzLDAsMC43NTEsMC4yMzEsMC45MTIsMC41OWwxLjUxNiwzLjM3NWwxLjUyMy0zLjM3NmMwLjE2Mi0wLjM1OCwwLjUyLTAuNTg5LDAuOTEyLTAuNTg5SDI0LjVjMC41NTEsMCwxLDAuNDQ5LDEsMXY1Ljk4MQljMCwwLjU1MS0wLjQ0OSwxLTEsMUgyMy43Nzh6IE0xMS40NjMsMjMuNDE1bC0wLjI5My0wLjY3MWwtMC4yODIsMC42NzFIMTEuNDYzeiIgb3BhY2l0eT0iLjA3Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI0LjUsMjBoLTEuOTIyYy0wLjE5NywwLTAuMzc1LDAuMTE1LTAuNDU2LDAuMjk0bC0xLjk4LDQuMzg5bC0xLjk3LTQuMzg4CUMxOC4wOTEsMjAuMTE2LDE3LjkxMiwyMCwxNy43MTUsMjBoLTEuODcxYy0wLjI3NiwwLTAuNSwwLjIyNC0wLjUsMC41djYuMjI2bC0yLjg3MS02LjQzQzEyLjM5MywyMC4xMTYsMTIuMjE0LDIwLDEyLjAxNywyMGgtMS42MjMJYy0wLjE5OCwwLTAuMzc4LDAuMTE3LTAuNDU4LDAuMjk5TDcuMTUsMjYuNjRjMCwwLTAuMDE3LDAuMDYzLTAuMDE3LDAuMDkxYzAsMC4xMzgsMC4xMTIsMC4yNSwwLjI1LDAuMjV2MGgxLjEwMwljMC4yLDAsMC4zOC0wLjExOSwwLjQ1OS0wLjMwMmwwLjU0MS0xLjI1NmgzLjQzMmwwLjU1MSwxLjI1OGMwLjA4LDAuMTgyLDAuMjU5LDAuMjk5LDAuNDU4LDAuMjk5aDIuNjM4YzAuMjc2LDAsMC41LTAuMjI0LDAuNS0wLjUJdi00LjY4NWwyLjE2Nyw0Ljg4OGMwLjA4LDAuMTgxLDAuMjU5LDAuMjk3LDAuNDU3LDAuMjk3aDAuOTE4YzAuMTk1LDAsMC4zNzItMC4xMTMsMC40NTQtMC4yOWwyLjIxNy00LjgwNXY0LjU5NQljMCwwLjI3NiwwLjIyNCwwLjUsMC41LDAuNUgyNC41YzAuMjc2LDAsMC41LTAuMjI0LDAuNS0wLjVWMjAuNUMyNSwyMC4yMjQsMjQuNzc2LDIwLDI0LjUsMjB6IE0xMC4xMzUsMjMuOTE1bDEuMDI2LTIuNDQJbDEuMDY2LDIuNDRIMTAuMTM1eiIvPjxwYXRoIGQ9Ik0zOC45OTQsMjhjLTAuNDMzLDAtMC44NDQtMC4xODctMS4xMjktMC41MTJsLTEuMTUtMS4zMTNsLTEuMTg5LDEuMzEzCWMtMC4yODMsMC4zMTMtMC42ODgsMC40OTQtMS4xMTIsMC40OTRIMjguNWMtMC44MjcsMC0xLjUtMC42NzMtMS41LTEuNVYyMC41YzAtMC44MjcsMC42NzMtMS41LDEuNS0xLjVoNi44MTFsMS40OTQsMS42OQlsMS4zMS0xLjQyMmwwLjA5OS0wLjA0MmMwLjE0NS0wLjExOSwwLjQwNS0wLjIwNywwLjY3OS0wLjIwN2gxLjU0MWMwLjY4OSwwLDEuMjUsMC41NjEsMS4yNSwxLjI1YzAsMC4yMDQtMC4wNTIsMC41MDktMC4zMDIsMC44MDQJbC0yLjE2LDIuMzZsMi41NjEsMi45N2wtMC4xMDMsMC4yNGMwLjAwMywwLjAzNiwwLjAwNSwwLjA3MiwwLjAwNSwwLjEwN2MwLDAuNjg5LTAuNTYxLDEuMjUtMS4yNSwxLjI1SDM4Ljk5NHoiIG9wYWNpdHk9Ii4wNSIvPjxwYXRoIGQ9Ik0zOC45OTQsMjcuNWMtMC4yODksMC0wLjU2My0wLjEyNS0wLjc1Mi0wLjM0MWwtMS41MjEtMS43MzZsLTEuNTY2LDEuNzMJYy0wLjE4OCwwLjIwOS0wLjQ1OSwwLjMyOS0wLjc0MSwwLjMyOUgyOC41Yy0wLjU1MSwwLTEtMC40NDktMS0xVjIwLjVjMC0wLjU1MSwwLjQ0OS0xLDEtMWg2LjU4NWwxLjcxMSwxLjkzNmwxLjYxMi0xLjc1CWwwLjAzMy0wLjAxNGMwLjEzLTAuMDk5LDAuMjg2LTAuMTUzLDAuNDUtMC4xNTNoMS41NDFjMC40MTQsMCwwLjc1LDAuMzM2LDAuNzUsMC43NWMwLDAuMTIxLTAuMDMyLDAuMzAyLTAuMTg0LDAuNDgxbC0yLjQ0NywyLjY3MwlsMi42NDcsMy4wNjlsLTAuMDM3LDAuMDg1YzAuMDE0LDAuMDU2LDAuMDIxLDAuMTE0LDAuMDIxLDAuMTcyYzAsMC40MTQtMC4zMzYsMC43NS0wLjc1LDAuNzVIMzguOTk0eiBNMzMuNTA3LDI1LjAxNmwwLjM0Ny0wLjM4MQloLTMuNjM4djAuMzgxSDMzLjUwN3ogTTM0LjA1NSwyNC40MTVsMC45MTYtMS4wMDVsLTAuOTE2LTEuMDI2VjI0LjQxNXogTTMzLjk5MSwyMi4zMTJsLTAuMjY1LTAuMjk2bC0zLjUxLTAuMDF2MC4zMDdIMzMuOTkxeiIgb3BhY2l0eT0iLjA3Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTQwLjYxNSwyNi41ODZsMC4wMDEtMC4wMDNsLTIuNzM0LTMuMTY5bDIuNzM0LTIuOTg2YzAuMDM3LTAuMDQ0LDAuMDY2LTAuMDk3LDAuMDY2LTAuMTU5CWMwLTAuMTM4LTAuMTEyLTAuMjUtMC4yNS0wLjI1Yy0wLjAwNywwLTEuNTM4LDAtMS41NDEsMGMtMC4wNzIsMC0wLjEzNSwwLjAzMy0wLjE4LDAuMDgybC0wLjAwNywwLjAwM2wtMS45MTYsMi4wNzlMMzQuODYsMjBIMjguNQljLTAuMjc2LDAtMC41LDAuMjI0LTAuNSwwLjV2NS45ODJjMCwwLjI3NiwwLjIyNCwwLjUsMC41LDAuNWg1LjkxM2MwLjE0MSwwLDAuMjc2LTAuMDYsMC4zNzEtMC4xNjRsMS45NDMtMi4xNDdsMS44OTEsMi4xNTgJQzM4LjcxMywyNi45MzgsMzguODUsMjcsMzguOTk0LDI3aDEuNDRjMC4xMzgsMCwwLjI1LTAuMTEyLDAuMjUtMC4yNUM0MC42ODMsMjYuNjg2LDQwLjY1NSwyNi42Myw0MC42MTUsMjYuNTg2eiBNMzMuNzI4LDI1LjUxNgloLTQuMDExdi0xLjM4MWgzLjgzOHYtMS4zMjNoLTMuODM4di0xLjMwOGw0LjIzNCwwLjAxMmwxLjY5MywxLjg5N0wzMy43MjgsMjUuNTE2eiIvPjwvc3ZnPg==');
  background-repeat: no-repeat;
  background-position-x: 99%;
  background-position-y: 3.5px;
}
.ico-validcard{
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5ElEQVR4nO2YOw7CMBBEfZBQIo7AEVJyBYRX4mwgPgXewH2oQWDJqzTIyNDGSZk1zJOmn/HuuhhjAAAAgF9ieZGJdbIjDp5Yog4FT06Oq3M7GzRPTm7jG5ZOWZZ78pgN8H358Y1Sv7bZALrWRrrlwrMngAKDPKxsgHm9iCXIIECNCUSsUBfFHzGV/o3SrwS4+pdKEQJ4TCBihfgffiFSLoMAjAlErFAXY68G4YhZf61inTxMDstyUB+AwyYbIHWPmqtFSt6aUGUDfA65CVWq71IDpsd4SF7261M77TUPAAAAmMJ4A08/Ru4Fa1HyAAAAAElFTkSuQmCC");
  background-repeat: no-repeat;
  background-position-x: 99%;
  background-position-y: 3.5px;
}
.ico-date{
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAOUlEQVR4nGNgGEDwH4qppY4+FvynEsYJRi34P2iCiFzwf9QCQmA0iAiC0SAaQkH0f8jWB6OAAR0AAMT6sU/eS6DuAAAAAElFTkSuQmCC");
  background-repeat: no-repeat;
  background-position-x: 95%;
  background-position-y: 14px;
  background-size: 27px;
}
.ico-cvv{
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADfUlEQVR4nO2ZW4hNURjHf+6EktswDJHGJR41RmjwoozLy7y4vahx96BEbrklDxSJJ0lKyqXkxaUMhow740EuucvwJDOYITNbX/13rY4zY5+Zvc6c0fnXV3uv9X1rrf9e67ucdSCLLLLIIoss4sUs4ArwDQgyTL4BZUDxv0jsyoDFBhFlZ1M7EbQxKU5G5EoGLCxIUS4nI1KTAQsLUpTqZESCNip/4b8j0lYQ+CTSHZgD7AMqgLfAd8X/F8ANYD8wA+iWiUSGAnuBLykcCQsue4CcTCDSCVinr262DQrja4AiYCDQUTJQbWuk0yAbs90MdGgtInnAHdnUA0eB/BTs82VTrzGMXG4K9rFHradAAc1HgcZo1fB7AehJy9FTYwWtQeQS0IX4YGNdSjeR50Av4kcvjZ0WIr+BQtksdqJPXHIdaAd0Vh7yRuSI9EcDtTGTCCTzNccyX0Ts64+U/lVPJALgsRMEfvggYiWGYbxHEoFkouY65YPIBunuTgOR7ZprpQ8i06V7zWl7BkyVcw4GDqvdisThwEW918qvTgL31VehPqvRRiTkEsv0hgk+iFhxaKhyItg4YJIWdQBoD9xVv5UhS/V8XvXUJ9kNANar74Sq4RpnrjeaK9cHka7SDaPVE73fdHTOaTfseaNqMgsSq1Q0hnor9BHseSEwN2EuKyYRwdiJhOVIWO2W6/1VI/qV6n8EDAMOOn12PA0vgb7A8XQSCavbN3qv0lEKF/ELWJRwI2PheoH0Pjrt9SrtF2invybM5fVomVMbzjptS4Ae8gULmf0dHzLZJJspScaz42aYnaSvTH2FqRKJch20RbqrnbYG/a4olU+8S7B5rXBdnmS8p+q73czwW52MSFkEIhY20Zmui7iLzZXCCAkx6QVdcYolygGPJCojligzaQQ7I0xyWrp9gA+eiMzTHMub0NnRGAl3Zy434TMNTh1UpOQWJ4lyp4xP9Lcara3RnYiK7Y4D91NbqYffJAGwDY+wr/TASWj2Hhcs8YX5556umrwiz/GNa87OtAS9HRLvgUGkCWMdMq8cn2kOJuuo2ljmE2NIM/KcY2Y+ckZlelSMAo45F3RWMadtJxLRWWHwp+OkD4GtwDQttoeuenJUpqxVZAoDRJ30vftEFAwBDqlkiBqVvsrGdjbj0A0oUdavkB+FmfkzcEuLL9FfEFn8t/gD/WCF3pq/e+sAAAAASUVORK5CYII=");
  background-repeat: no-repeat;
  background-position-x: 95%;
  background-position-y: 14px;
  background-size: 27px;
}
.ico-user{
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABgElEQVR4nO2ZTytEURiHn4SNLJRSsvcJMBY2spLSICtlO2yV2JjZUiMln4by7wNYWks2NtLclMjRrTvS6Tgz995z556j96nf7vae9znv/VcHBEEQhJJZA26ACFCeJwKugRVd4sSD5rKm+XsSKvBUY5FbDxrJmysCeSZUh7TwoAlXoewGRASZCM5vhwtgDhgCRoBN4DG0Z+QO6Df8YQwC5yGJ1Cy/S4shiSxYRGZDElm3iCwVKTKFnZmUC+9YatVdijT0C7sgzcLzljobrkRiCQoW2bfUOXUhUv+jMdcin8CYocZkBgmjSKNHInEODTWOXYn06taK8+yghrKJtGWKFnky1PhwLaJnuoNEJeXCL8Cqoc4W8FakiKvcA9vAsGVTRoFd4MFHkfdkt/vongHgAPjySWSP7Jz5JDKRQ6Tik0gexn0SKXyj1D8JZTcgImgTaXmwm3nzSnLOoALPJclhiQo8y+33dNODZrLmSP/oVJMRhXDMECW9/kxCEARBoAy+AeNmCd7CmTSDAAAAAElFTkSuQmCC");
  background-repeat: no-repeat;
  background-position-x: 97.5%;
  background-position-y: 14px;
  background-size: 27px;
}
.ico-light{
  background-blend-mode: saturation;
}
.oneline{
  display: flex;
  justify-content: space-between;
  padding: 0;
}
@media (max-width: 768px){
  .modal-sm{
    width: inherit !important;
  }
  .oneline{
    display: block;
  }
  .visa-modal{
    transform: scale(0.75);
    -webkit-transform: scale(0.75);
    width: 100%;
    padding: 0;
    padding-top: 10px;

  }
  .close{
    margin-top: 25px;
  }
  .res-footer{
    display: flex;
    align-items: flex-start;
    margin-top: -40px;
  }
  .res-footer > div{
      width: 50%;
      padding: 0;
  }
  #myModal{
    margin-top: -12%;
  }
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type=number] {
  -moz-appearance:textfield; /* Firefox */
}
</style>

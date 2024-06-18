<template>
  <article class="orders">
    <h2>{{ $t('account.orders.title') }}</h2>
    <div class="divider"></div>
    <div class="position-relative">
      <div>
        <div>
          <section v-for="(item, index) in invoices" class="boxArea">
            <div class="d-flex">
              <div class="d-none d-md-block number">
                {{((index + 1) + (page * take)) - take}}
              </div>
              <div class="box">
                <div class="d-block d-md-none number">
                  {{((index + 1) + (page * take)) - take}}.
                </div>
                <div class="row mt-3 mt-md-0">
                  <div class="col-5 label">
                    {{ $t('account.orders.id') }}
                  </div>
                  <div class="col-7 text">
                    {{ item.id }}
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-5 label">
                    {{ $t('account.orders.status') }}
                  </div>
                  <div class="col-7 text">
                    {{ item.status_text }}
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-5 label">
                    {{ $t('account.orders.date') }}
                  </div>
                  <div class="col-7 text">
                    {{ item.created_at_format }}
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-5 label">
                    Payment Reference
                  </div>
                  <div class="col-7 text">
                    {{ item.transaction_id }}
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-5 label">
                    Article
                  </div>
                  <div class="col-7 text">
                    {{ item.title }}
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-5 label">
                    <div>
                      {{ $t('account.order.coins') }}
                    </div>
                    <div class="mt-3">
                      {{ $t('account.orders.coins') }}
                    </div>
                  </div>
                  <div class="col-3 text">
                    <div>
                      {{ item.coins_text }}
                    </div>
                    <div class="mt-3">
                      € {{ item.price_euro }}
                    </div>
                  </div>
                  <div class="col-4 text">
<!--                    <button class="detailBtn">Details</button>-->
                  </div>
                </div>
              </div>
            </div>


          </section>
          <div class="pagination" v-if="pages_total > 0">
            <button @click="addInvoicePage(-1)" :disabled="page === 1">
              <svg width="8" height="12" viewBox="0 0 8 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M7.092 0.883089C6.91887 0.712096 6.68533 0.616211 6.442 0.616211C6.19866 0.616211 5.96513 0.712096 5.792 0.883089L1.235 5.45209C1.06781 5.61945 0.971522 5.84478 0.966121 6.08128C0.960721 6.31778 1.04663 6.54727 1.206 6.72209L5.693 11.2221C5.77702 11.3132 5.87859 11.3865 5.99162 11.4374C6.10465 11.4883 6.2268 11.5158 6.35074 11.5184C6.47469 11.5209 6.59786 11.4983 6.71286 11.4521C6.82787 11.4058 6.93234 11.3367 7.02 11.2491C7.10765 11.1614 7.17669 11.057 7.22296 10.942C7.26923 10.8269 7.29179 10.7038 7.28927 10.5798C7.28674 10.4559 7.2592 10.3337 7.20829 10.2207C7.15738 10.1077 7.08415 10.0061 6.993 9.92209L3.179 6.05009L7.089 2.17809C7.17479 2.09357 7.24297 1.99289 7.2896 1.88185C7.33624 1.77082 7.36039 1.65164 7.36067 1.53121C7.36095 1.41079 7.33735 1.2915 7.29123 1.18025C7.24511 1.069 7.1774 0.968001 7.092 0.883089Z"
                    fill="currentColor"/>
              </svg>
            </button>

            <button v-for="item in pagination_pages" @click="setInvoicePage(item)" :class="{ active: page === item}">{{ item }}</button>

            <button @click="addInvoicePage(1)" :disabled="page === pages_total">
              <svg width="7" height="12" viewBox="0 0 7 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0.769694 0.883089C0.942823 0.712096 1.17636 0.616211 1.41969 0.616211C1.66303 0.616211 1.89656 0.712096 2.06969 0.883089L6.62369 5.45209C6.79088 5.61945 6.88717 5.84478 6.89257 6.08128C6.89797 6.31778 6.81207 6.54727 6.65269 6.72209L2.16569 11.2221C2.08168 11.3132 1.9801 11.3865 1.86707 11.4374C1.75404 11.4883 1.63189 11.5158 1.50795 11.5184C1.38401 11.5209 1.26084 11.4983 1.14583 11.4521C1.03082 11.4058 0.926355 11.3367 0.838698 11.2491C0.751041 11.1614 0.682003 11.057 0.63573 10.942C0.589458 10.8269 0.566906 10.7038 0.569427 10.5798C0.571948 10.4559 0.599492 10.3337 0.650404 10.2207C0.701315 10.1077 0.774544 10.0061 0.865694 9.92209L4.68369 6.05309L0.773694 2.18109C0.687383 2.09659 0.618737 1.99577 0.571751 1.88449C0.524765 1.77322 0.500377 1.65371 0.500004 1.53293C0.499632 1.41214 0.523284 1.29248 0.569583 1.18092C0.615883 1.06936 0.683905 0.968119 0.769694 0.883089Z"
                    fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-if="loading" class="overlayLoading">
        Loading
      </div>
      <div v-if="invoices_total === 0 && !loading">
        No Data
      </div>
    </div>
  </article>

</template>

<style scoped>
.orders {
  max-width: 600px;
  min-width: 400px;
}

.orders h2 {
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 29px;
  color: #201D56;
}

.orders .divider {
  width: 100%;
  height: 2px;
  margin: 11px 0 35px;
  background-color: #D0D0D0;
}

.orders .number {
  font-weight: 700;
  font-size: 17px;
  line-height: 21px;
  color: #201D56;
  padding-right: 10px;
}

.orders .box {
  border-bottom: 4px solid #201D56;
  flex: 0 0 calc(100% - 24px);
  padding: 23px 28px;
  background: #F5F5F5;
  box-shadow: 0px 0px 7px rgba(135, 135, 135, 0.25);
}

.orders .boxArea {
  margin-bottom: 24px;
  direction: ltr;
}

.orders .boxArea:last-of-type {
  margin-bottom: 31px;
}

.orders .label {
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 17px;
  color: #201D56;
}

.orders .text {
  font-weight: 600;
  font-size: .875rem;
  line-height: 17px;
  color: #000000;
}

.orders .detailBtn {
  background: #201D56;
  font-weight: 700;
  font-size: .875rem;
  line-height: 17px;
  color: #FFFFFF;
  padding: 16px 0;
  width: 100%;
  border: 0;
}

.pagination {
  width: 90%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  background-color: transparent;
  line-height: 0;
  border: 2px solid #201D57;
  border-radius: 999px;
  width: 35px;
  height: 35px;
  margin: 0 6px;
  font-weight: 600;
  color:#201D57;
  padding-top: 3px;
}

.pagination button:disabled {
  opacity: .3;
}

.pagination button:not(:disabled):hover {
  background-color: #201D57;
  color: #fff;
}

.pagination button:disabled:hover {
  cursor: not-allowed;
}

.pagination button.active {
  background-color: #201D57;
  color: #fff !important;
}

.pagination button:first-child, .pagination button:last-child {

  width: 25px;
  height: 25px;

}

.overlayLoading {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  background: rgba(255, 255, 255, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 24px;
}
@media screen and (max-width: 768px) {
  .orders .box {
    flex: 0 0 100%;
    padding-left: 10px;
    transform: scale(0.95);
  }
}
.rtl_class .orders h2{
   text-align: right;
 }
</style>

<script>
import {ref} from "vue";
import {api} from "../../composables/api";

export default {
  setup() {
    const invoices = ref([])
    const page = ref(1)
    const pages_total = ref(0)
    const invoices_total = ref(0)
    const pagination_pages = ref([])
    const take = 3
    const loading = ref(true)
    const getInvoices = () => {
      api.get('invoices', { query_params: {take, skip: (page.value-1) * take }, progress_ref:loading}).then(res => {
        invoices.value = res.data
        invoices_total.value = res.meta.total;
        pages_total.value = Math.ceil(invoices_total.value / take)

        makePaginationPagesArray()
      })
    }

    const makePaginationPagesArray = () => {
      if (!pagination_pages.value.includes(page.value)) {
        let pagesTemp = []
        for (let i = page.value; i <= page.value + 2; i++) {
          if (i <= pages_total.value) {
            pagesTemp.push(i)
          }
        }
        pagination_pages.value = pagesTemp;
      } else if (pagination_pages.value.indexOf(page.value) === 2) {
        let pagesTemp = []
        for (let i = (page.value === pages_total.value ? page.value - 2 : page.value - 1); i <= page.value + 1; i++) {
          if (i <= pages_total.value) {
            pagesTemp.push(i)
          }
        }
        pagination_pages.value = pagesTemp;
      } else if (pagination_pages.value.indexOf(page.value) === 0 && page.value !== 1) {
        let pagesTemp = []
        for (let i = page.value - 1; i <= page.value + 1; i++) {
          if (i <= pages_total.value) {
            pagesTemp.push(i)
          }
        }
        pagination_pages.value = pagesTemp;
      }
    }

    const setInvoicePage = (val) => {
      if (page.value === val) {
        return
      }
      page.value = val
      getInvoices()
    }
    const addInvoicePage = (val) => {
      page.value += val
      getInvoices()
    }
    getInvoices()

    return {
      loading,
      take,
      invoices,
      page,
      invoices_total,
      pages_total,
      pagination_pages,
      getInvoices,
      setInvoicePage,
      addInvoicePage,
    }
  },
};
</script>

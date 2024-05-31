<template>
  <div class="dropdown">
    <input
      type="checkbox"
      class="dropdown__switch"
      ref="switch"
      :id="'filter-switch_' + name"
      hidden
    />
    <label :for="'filter-switch_' + name" class="dropdown__options-filter">
      <span class="title">{{ name }}</span>
      <ul class="dropdown__filter" role="listbox" tabindex="-1">
        <li class="dropdown__filter-selected" ref="selected" aria-selected="true">
          <div class="card-numbers" :class="getlangcls(selected_language)">
            <div>{{ selected_language.name }}</div>
          </div>
        </li>
        <li>
          <ul class="dropdown__select">
            <li
              class="dropdown__select-option"
              v-for="item in options"
              :key="item"
              :value="item"
              role="option"
              @click="selectCard(item)"
            >
              <div class="card-numbers">
                <span>{{ item.name }}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </label>
    <svg
      class="drop_down"
      width="16"
      height="9"
      viewBox="0 0 16 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 7V8H9V7H7Z"
        fill="#4568DA"
      />
    </svg>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  width: 100%;
  max-width: 498px;
}

.dropdown .title {
  position: absolute;
  top: 0;
  left: 15px;
  padding: 0 5px;
  transform: translateY(-50%);
  font-weight: 700;
  font-size: 16px;
  color: #201d56 !important;
  pointer-events: none;
  transition: 0.3s;
  background: white;
  z-index: 99;
}

.dropdown svg.drop_down {
  position: absolute;
  right: 15px;
  top: 25px;
  bottom: 10px;
  width: 21px;
}

img {
  width: 20px !important;
}

.dropdown__switch:checked + .dropdown__options-filter .dropdown__select {
  transform: scaleY(1);
}

.dropdown__switch:checked + .dropdown__options-filter .dropdown__filter:after {
  transform: rotate(-135deg);
}

.dropdown__options-filter {
  width: 100%;
  cursor: pointer;
  direction: ltr;
  text-align: center;
}

.dropdown__filter {
  position: relative;
  display: flex;
  padding: 15px;
  font-weight: 600;
  text-transform: capitalize;
  transition: 0.3s;
  align-items: center;
  width: 100%;
  height: 58px;
  border-radius: 6px;
  font-size: 14px;
  padding: 0 25px;
  border: 2px solid #d8d8d8;
  background: transparent;
  color: #000000;
  outline: none;
  text-align: left;
}

.dropdown__filter:focus {
  outline: none;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
}

.dropdown__filter::after {
  position: absolute;
  top: 45%;
  left: 30px;
  content: "";
  width: 10px;
  height: 10px;
  border-right: 2px solid var(--text-primary-color);
  border-bottom: 2px solid var(--text-primary-color);
  transform: rotate(45deg) translateX(-45%);
  transition: 0.2s ease-in-out;
}

.dropdown__select {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 5px;
  overflow: hidden;
  box-shadow: 0 5px 10px 0 rgba(152, 152, 152, 0.6);
  transform: scaleY(0);
  transform-origin: top;
  transition: 0.2s ease-in-out;
  font-weight: 600;
  z-index: 999;
  background: white;
}

.dropdown__filter-selected {
  display: flex;
  gap: 6px;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  text-transform: uppercase;
}

.dropdown__select-option {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 15px 5px;
  background-color: var(--background-text-info);
  border-bottom: 1px solid #aaa8a8;
  transition: 0.3s;
}

.dropdown__select-option:last-of-type {
  border-bottom: 0;
}

.dropdown__select-option:hover {
  background-color: var(--background-color-dark-gray);
}

.dropdown__select-option .card-numbers {
  display: flex;
  flex-direction: column;
}

.dropdown__select-option .card-numbers span:last-of-type {
  font-size: 14px;
  line-height: 22px;
  color: #aaa8a8;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

ul li {
  list-style: none;
  margin-bottom: 0 !important;
}

@media (max-width: 990px) {
  .dropdown {
    width: 100%;
  }

  .dropdown__filter {
    height: 51px;
  }

  .dropdown__select-option {
    padding: 10px 5px !important;
  }

  .dropdown__filter-selected {
    font-size: 12px !important;
  }
  .dropdown svg.drop_down{
    top: 22px;
  }
}

ol,
ul,
dl {
  margin-bottom: 0;
}

.card-numbers div{
  margin-left: 40px;
  margin-top: -3px;
}

.rtl_class .dropdown .title{
  left: inherit;
  right: 15px;
}
</style>

<script>
export default {
  props: {
    options: Array,
    name: String,

  },
  data(){
    return{
        selected_language:''
    }
  },
  created() {
      this.selected_language = this.options[0];
  },
  mounted() {
    const label = document.querySelector(".dropdown__filter-selected");
    const options = Array.from(
      document.querySelectorAll(".dropdown__select-option")
    );
  },

  methods: {
    imgUrl(image) {
      return new URL(image, import.meta.url).href;
    },
    getlangcls(item){
      var L = item.locale.toLowerCase();
      return 'sprite sprite-flag-'+L;
    },
    selectCard: function (card) {
      this.selected_language = card;
      this.$emit("selected", card);
    },
  },
};
</script>

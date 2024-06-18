<template>
  <div class="dropdown" >
    <input type="text" placeholder="Enter Here" v-model="form.advertising[key_num].link" />
    <input
      type="checkbox"
      class="dropdown__switch"
      ref="switch"
      :id="'filter-switch_' + name"
      hidden
    />
    <label :for="'filter-switch_' + name" class="dropdown__options-filter" :class="{errorfield:errorz['advertising.'+key_num+'.link']!==undefined}">
      <span class="title">{{ name }}</span>
      <ul class="dropdown__filter" role="listbox" tabindex="-1">
        <li
          class="dropdown__filter-selected"
          ref="selected"
          aria-selected="true"
        >
          <div class="card-numbers">
            <span>{{ selected_value.name }}</span>
          </div>
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
    <div class="error_txt errm" v-if="errorz['advertising.'+key_num+'.link']!==undefined">{{errorz['advertising.'+key_num+'.link']}}</div>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  width: 100%;
  height: 50px;
  max-width: 498px;
}

.dropdown input[type="text"] {
  position: absolute;
  left: 0;
  background: white;
  border: none;
  height: 40px;
  top: 8px;
  left: 1px;
  outline: none;
  color: black;
  padding: 0 12px 0px 10px;
  width: 69%;
  z-index: 99;
}

.dropdown input[type="text"]::placeholder {
  color: #d8d8d8;
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
  right: 2px;
  top: 23px;
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
  padding-left: 78%;
  justify-content: flex-end;
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
  font-size: 16px;
  line-height: 22px;
  color: #666666;
  text-transform: capitalize;
}

.dropdown__select-option {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 15px 5px;
  background-color: var(--background-text-info);
  border-bottom: 1px solid #d6d6d6;
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
  font-size: 16px;
  line-height: 22px;
  color: #666666;
  text-transform: capitalize;
  letter-spacing: 0.4px;
}

ul li {
  list-style: none;
  margin-bottom: 0 !important;
}

@media (max-width: 1198px) {
  .dropdown__filter {
    padding-left: 75%;
  }
}

@media (max-width: 990px) {
  .dropdown {
    width: 100%;
    height: 60px;
    background-color: white !important;
  }

  .dropdown__filter {
    height: 51px;
    padding-left: 72%;
  }

  .dropdown__select-option {
    padding: 10px 5px !important;
  }

  .dropdown__filter-selected {
    font-size: 12px !important;
  }
  .errm{
    margin-top: -9px;
  }
  .dropdown input[type="text"]{
    width: 68%;
  }
}

@media (max-width: 768px) {
  .dropdown__filter {
    padding-left: 80%;
  }
  .dropdown__options-filter {
    background-color: white;
  }
}

@media (max-width: 500px) {
  .dropdown__filter {
    padding-left: 55vw;
  }

  svg.drop_down {
    right: 0 !important;
    margin-right: 5px;
    margin-top: -2px;
    transform: scale(0.8);
  }
  .card-numbers{
    margin-left: -10px;
  }
}

ol,
ul,
dl {
  margin-bottom: 0;
}
.rtl_class .dropdown .title{
  left: inherit;
  right: 15px;
}
input{
  text-align: left !important;
}
</style>

<script>
export default {
  props: {
    options: Array,
    name: String,
    form:Object,
    num:String,
    errorz:{
      type:Array,
      default:[]
    }
  },
  data(){
      return {
        selected_value:'',
        key_num:0
      }
  },
  created() {
    if(this.options.length !== 0){
        this.selected_value = this.options[0];
    }
    this.key_num = this.num - 1;
    this.form.advertising[this.key_num].space_id = this.selected_value.value;
  },
  methods: {
    imgUrl(image) {
      return new URL(image, import.meta.url).href;
    },

    selectCard: function (card) {
      this.selected_value = card;
      this.form.advertising[this.key_num].space_id = card.value;
    },
  },
};
</script>

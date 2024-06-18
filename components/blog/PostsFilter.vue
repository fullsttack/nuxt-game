<template>
    <div class="post-filter">
      <div class="container">
        <div class="post-filter__form clearfix">
          <div
            @click="
              selected != 'category' ? (selected = 'category') : (selected = '')
            "
            :class="{ active: selected == 'category' }"
            class="post-filter__div"
          >
            <label class="post-filter__label">Category</label>
            <div
              class="cs-select cs-skin-border"
              :class="{ active: selected == 'category' }"
            >
              <span
                v-if="selectedOption['category'] == '0'"
                value=""
                disabled
                dived>All Articles</span>
              <span v-else>{{ selectedOptionView["category"] }}</span>
              <Transition>
                <div class="list" v-if="selected == 'category'">
                  <span @click="selectedOption.category=0">All Authors</span>
                  <span v-for="cat in categories" @click="applayFilter('category',cat.cat_id,cat.ct_title)" :key="cat.cat_id">{{cat.ct_title}}</span>
                </div>
              </Transition>
            </div>
          </div>
          <div
            @click="
              selected != 'filterBy' ? (selected = 'filterBy') : (selected = '')
            "
            class="post-filter__div"
            :class="{ active: selected == 'filterBy' }"
          >
            <label class="post-filter__label">Filter By</label>
            <div
              class="cs-select cs-skin-border"
              :class="{ active: selected == 'filterBy' }"
            >
              <span
                v-if="selectedOption['filterBy'] == '0'"
                value=""
                disabled
                dived
                >Article Date</span
              >
              <span v-else>{{ selectedOptionView["filterBy"] }}</span>
              <Transition>
                <div class="list" v-if="selected == 'filterBy'">
                  <span
                    @click="applayFilter('filterby','date','Article Date')"
                    value="date"
                    >Article Date</span
                  >
                  <!-- <span
                    @click="applayFilter('filterby','cm','Last Comments')"
                    value="comments"
                    >Last Comments</span
                  >
                  <span
                    @click="applayFilter('filterby','random','Random')"
                    value="random"
                    >Random</span
                  > -->
                </div>
              </Transition>
            </div>
          </div>
          <div
            @click="selected != 'order' ? (selected = 'order') : (selected = '')"
            class="post-filter__div"
            :class="{ active: selected == 'order' }"
          >
            <label class="post-filter__label">Order</label>
            <div
              class="cs-select cs-skin-border"
              :class="{ active: selected == 'order' }"
            >
              <span v-if="selectedOption['order'] == 'desc'" value="" disabled dived
                >Descending</span
              >
              <span v-else>{{ selectedOptionView["order"] }}</span>
              <Transition>
                <div class="list" v-if="selected == 'order'">
                  <span
                    @click="applayFilter('order','asc','Ascending')"
                    value="ascending"
                    >Ascending</span
                  >
                  <span
                    @click="applayFilter('order','desc','Descending')"
                    value="descending"
                    >Descending</span
                  >
                </div>
              </Transition>
            </div>
          </div>
          <div
            @click="
              selected != 'author' ? (selected = 'author') : (selected = '')
            "
            class="post-filter__div"
              :class="{ active: selected == 'author' }"
          >
            <label class="post-filter__label">Author</label>
            <div
              class="cs-select cs-skin-border"
              :class="{ active: selected == 'author' }">
              <span v-if="selectedOption['author'] == '0'" value="" disabled dived>All Authors</span>
              <span v-else>{{ selectedOptionView["author"] }}</span>
              <Transition>
                <div class="list" v-if="selected == 'author'">
                  <span @click="selectedOption.author=0">All Authors</span>
                  <span v-for="author in authors" @click="applayFilter('author',author.author_id,author.author_namefamily)" :key="author.author_id">{{author.author_namefamily}}</span>
                </div>
              </Transition>
            </div>
          </div>
          <div class="post-filter__submit">
            <button @click="fireFilter" type="submit" class="btn btn-default btn-lg btn-block">
              Filter Blog
            </button>
          </div>
        </div>
      </div>
    </div>

</template>

<style scoped>
div.cs-select {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  text-align: left;
  background: #fff;
  z-index: 100;
  width: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
div.cs-select:focus {
  outline: none;
  /* For better accessibility add a style for this in your skin */
}

/* Post Filter
/* ------------------------- */
.post-filter {
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  position: relative;
  z-index: 5;
}

.post-filter__form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
@media (min-width: 992px) {
  .post-filter__form {
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
  }
}

@media (max-width: 991px) {
  div.cs-skin-border > span:first-of-type {
    top: 3px !important;
  }
}


@media (max-width: 479px) {
  .container,
  .container-fluid,
  .container-xl,
  .container-lg,
  .container-md,
  .container-sm {
    padding: 0 !important;
    margin: auto;
  }
}

.post-filter__div {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: max-content;
}

.post-filter__div .post-filter__label {
  display: block;
  position: absolute;
  z-index: 2;
  left: 25px;
  top: 25px;
  line-height: 1.2em;
  color: #000000;
  font-size: 8px;
  text-transform: capitalize;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  font-weight: 500;
  letter-spacing: -0.02em;
}

@media (min-width: 992px) {
  .post-filter__div {
    width: 100%;
    max-width: 100%;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
  }
  .post-filter__div + .post-filter__div div.cs-skin-border > span:first-child {
    margin-left: -1px;
  }
}
.post-filter__div .post-filter__label {
  display: block;
  position: absolute;
  z-index: 2;
  left: 25px;
  top: 25px;
  line-height: 1.2em;
  color: #000000;
  font-size: 8px;
  text-transform: capitalize;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  font-weight: 500;
  letter-spacing: -0.02em;
}
@media (min-width: 992px) {
  .post-filter__div .post-filter__label {
    z-index: 102;
  }
}

.post-filter__div .cs-select {
  position: relative;
  display: flex;
  flex-direction: column;
}

.post-filter__div .cs-select {
  position: absolute;
  z-index: 1;
  background: white;
  border: 1px solid #e4e7ed;
}

.post-filter__div .cs-select.active .list {
  position: absolute;
  top: 75px;
  left: -1px;
  width: calc(100% + 2px);
  background: white;
  border: 1px solid #e4e7ed;
  border-top: none;
  padding: 10px 0;
}

.post-filter__div .cs-select.active .list span {
  padding: 1em;
  transition: 0.3 all ease-in-out;
}

.post-filter__div .cs-select.active .list span:hover {
  color: #201d56;
}

.post-filter__submit {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
}
@media (min-width: 992px) {
  .post-filter__submit {
    width: 100%;
    max-width: 100%;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
  }
}

.post-filter__submit .btn {
  border-radius: 0;
  border: none;
  width: 100%;
  max-width: 100%;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  background: #34307c;
  color: white;
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  text-transform: uppercase;
  min-height: 79px;
}

.post-filter--boxed .post-filter__submit .btn {
  border-radius: 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
@media (min-width: 992px) {
  .post-filter--boxed .post-filter__submit .btn {
    border-bottom-left-radius: 0;
    border-top-right-radius: 4px;
  }
}

.cs-select select {
  display: none;
}
.cs-select span {
  display: block;
  position: relative;
  cursor: pointer;
  padding: 26px 24px 12px 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (min-width: 992px) {
  .cs-select > span:first-child {
    padding-top: 32px;
    padding-bottom: 24px;
  }
}
.cs-select > span {
  padding-right: 3em;
}

.cs-select > span:first-child:after {
  speak: none;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  content: "";
  right: 23px;
  display: block;
  width: 6px;
  height: 4px;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6 4'%3E%3Cpath transform='translate(-586.156 -1047.28)' fill='%2331404b' d='M586.171,1048l0.708-.71,2.828,2.83-0.707.71Zm4.95-.71,0.707,0.71L589,1050.83l-0.707-.71Z'/%3E%3C/svg%3E");
  background-size: 6px 4px;
  background-repeat: no-repeat;
  background-position: center center;
  -webkit-transition: -webkit-transform 0.2s ease;
  transition: -webkit-transform 0.2s ease;
  transition: transform 0.2s ease;
  transition: transform 0.2s ease, -webkit-transform 0.2s ease;
}
.cs-select.cs-active > span::after {
  -webkit-transform: translateY(-50%) rotate(180deg);
  transform: translateY(-50%) rotate(180deg);
}
.cs-select .cs-options {
  position: absolute;
  overflow: hidden;
  background: #fff;
  visibility: hidden;
  width: 100%;
}
.post-filter__div.active {
  z-index: 99 !important;
}

@media (min-width: 992px) {
  .cs-select .cs-options {
    left: -1px;
    width: calc(100% + 1px);
  }
}

@media (max-width: 992px) {
  .post-filter__submit .btn {
    min-height: 61px;
  }

  .post-filter__div {
    z-index: 0;
  }

  .cs-select {
    position: relative !important;
    z-index: -1;
  }

  .cs-select .list {
    position: absolute;
    z-index: 999;
    top: 50px !important;
  }
}

@media (max-width: 767px) {
  .post-filter .container {
    padding-left: 0;
    padding-right: 0;
  }
}

/* Skin */
div.cs-skin-border {
  background: transparent;
  font-size: 14px;
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-transform: capitalize;
  top: 1px;
}
div.cs-skin-border > span:first-of-type {
  border-bottom: 1px solid #e4e7ed;
  color: #31404b;
  -webkit-transition: background 0.2s, border-color 0.2s;
  transition: background 0.2s, border-color 0.2s;
}
.post-filter--outline div.cs-skin-border > span:first-of-type {
  border: 1px solid #e4e7ed;
}
@media (min-width: 992px) {
  div.cs-skin-border > span:first-of-type {
    border-bottom: 0;
  }

  .post-filter--outline div.cs-skin-border > span:first-of-type {
    border: 1px solid #e4e7ed;
  }
}
div.cs-skin-border ul span::after {
  content: "";
  opacity: 0;
}
div.cs-skin-border .cs-placeholder {
  font-style: normal;
}
div.cs-skin-border .cs-selected span {
  color: #31404b;
}
div.cs-skin-border.cs-active > span {
  color: #31404b;
  background-color: #fff;
}
div.cs-skin-border .cs-options {
  border: 1px solid #e4e7ed;
  border-top: none;
  color: rgba(49, 64, 75, 0.4);
  font-size: 11px;
  font-style: normal;
  opacity: 0;
  -webkit-transition: opacity 0.2s, visibility 0s 0.2s;
  transition: opacity 0.2s, visibility 0s 0.2s;
}
div.cs-skin-border.cs-active .cs-options {
  opacity: 1;
  -webkit-transition: opacity 0.2s;
  transition: opacity 0.2s;
}
div.cs-skin-border ul span {
  /*padding: 5px 24px;*/
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: color 0.2s ease;
  transition: color 0.2s ease;
  color: black;
  font-size: 14px;
}
div.cs-skin-border ul span:hover {
  color: #037979 !important;
}
div.cs-skin-border .cs-options li span:hover,
div.cs-skin-border li.cs-focus span {
  color: #31404b;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
  position: absolute;
  top: 74px;
  left: -9px;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<script>
import {blogapi} from "../../composables/blogapi"
export default {
  async setup(){
    var filterData = await blogapi.get('/filter_data')
    const authors = filterData.data.authors;
    const categories = filterData.data.categories;
    const languages = filterData.data.languages;
    return {authors,categories,languages};
  },
  props:['def_options'],
  data: () => {
    return {
      selected: "",
      selectedOption: {
        author: "0",
        order: "desc",
        filterBy: "0",
        category: "0",
      },
      selectedOptionView: {
        author: "",
        order: "",
        filterBy: "",
        category: "",
      },
    };
  },
  created() {
    this.selectedOption = this.def_options;
  },
  mounted() {
    var u_author = this.authors.find(e=>e.author_id == this.selectedOption.author);
    var u_order = this.selectedOption.order;
    var u_category = this.categories.find(e=>e.cat_id == this.selectedOption.category);
    if(u_author !== undefined)
      this.selectedOptionView.author = u_author.author_namefamily;
    if(u_category !== undefined){
      this.selectedOptionView.category = u_category.ct_title;
    }
    this.selectedOptionView.order = u_order === 'asc' ? 'Ascending' : 'Descending';
  },
  methods:{
      fireFilter(){
        this.$emit('on_filter',this.selectedOption);
      },
      applayFilter(mode,id,title){
        switch(mode){
          case 'author':
            this.selectedOption.author = id;
            this.selectedOptionView.author = title;
            break;
          case 'order':
            this.selectedOption.order = id;
            this.selectedOptionView.order = title;
            break;
          case 'filterby':
            this.selectedOption.filterBy = id;
            this.selectedOptionView.filterBy = title;
            break;
          case 'category':
            this.selectedOption.category = id;
            this.selectedOptionView.category = title;
            break;
        }
      }
  }

};
</script>

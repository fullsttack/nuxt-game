<template>
    <div>
      <PostsFilter :def_options="filterOptions" @on_filter="onFilter"/>
      <div class="container">
        <div class="blogs-container">
          <template v-for="(article,index) in news">
            <BlogItem :post="article"/>
            <BlogPostAds v-if="index==3" :promotion="{showTimer: false}" style="margin-top: -20px;" />
            <BlogPostAds v-if="index==8" :promotion="{showTimer: true}" style="margin-top: -20px;" />
          </template>
        </div>
        <br><br>
        <BlogPaginator :pages="newspayload.data.blogs.links" len="2" :current_page="page"></BlogPaginator>
      </div>
    </div>
  </template>

  <script>

  import PostsFilter from "../../components/blog/PostsFilter.vue";
  import BlogItem from "../../components/blog/BlogItem";
  import BlogPostAds from "../../components/blog/BlogPostAds.vue";
  import BlogPaginator from "../../components/blog/BlogPaginator.vue";
  import {blogapi} from "../../composables/blogapi";
  export default {
    name: "BlogMain",
    components: {BlogPostAds, BlogItem, PostsFilter,BlogPaginator},
    data(){
        return {
            filter_path:'',
        }
    },
    async setup(){
      const route = useRoute();
      var newspayload = reactive([]);
      var news = reactive([]);
      var page = route.params.page;
      var filter_author = route.params.filter_author;
      var filter_category = route.params.filter_category;
      var filter_order = route.params.filter_order;
      var tag = route.query.tag;
      if(page == undefined){
        page = 1;
      }
      var filterOptions = reactive({
        author: filter_author == undefined ? "0" : filter_author,
        order: filter_order == undefined ? "desc" : filter_order,
        filterBy: "0",
        category: filter_category == undefined ? "0" : filter_category,
      });



      async function getNews(){
        var payload = {
          'page':parseInt(page),
          'filter_author':filterOptions.author,
          'filter_order':filterOptions.order,
          'filter_filterby':filterOptions.filterBy,
          'filter_category':filterOptions.category,
        };
        if(tag !== undefined){
          payload['tag'] = tag;
        }
        return await blogapi.post('/index',payload);
      }
      function onFilter(options){
        filterOptions = options;
        const router = useRouter();
        router.push({ path: (route.params.lang === '' ? '':"/"+ route.params.lang.substring(0,2))  + "/blog/page/"+page+"/filter/"+filterOptions.category+"/"+filterOptions.order+"/"+filterOptions.author});
      }
      newspayload = await getNews();
      if(newspayload.data.blogs.data.length === 0){
        throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
        return;
      }
      watch(newspayload, nvalue => {
        news = nvalue.data.blogs.data;
      },{deep: true, immediate: true});

      return {page,newspayload,onFilter,news,filterOptions}
    },
    validate(data){
      return !isNaN(data.params.id)
    },
  }
  </script>

  <style scoped>
  .blogs-container {
    display: grid;
    /*grid-template-columns: 400px 400px 400px;*/
    grid-template-columns: repeat(auto-fill, minmax(400px, 400px));
    grid-column-start: 1;
    grid-column-end: 3;
    gap: 35px;
    margin: 0 auto;
    width: 100%;
    row-gap: 20px !important;
  }

  @media (min-width: 1200px) and (max-width: 1600px) {
    .blogs-container {
      grid-template-columns: 377px 377px 377px;
      width: 95%;
    }
  }
  @media (max-width: 768px){
    .blogs-container{
      grid-template-columns: 100% !important;
      width: 95%;
    }
  }
  @media screen and (min-width: 100px) and (max-width: 500px) {
    .container, .container-fluid, .container-xl, .container-lg, .container-md, .container-sm {
      padding: 0 !important;
    }
  }
  @media (min-width: 768px) and (max-width: 820px){
    .blogs-container {
      grid-template-columns: 49% 49%;
      gap: 15px;
    }
  }
  </style>
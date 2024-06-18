<template>
  <TitleHeaderNews>
    <strong><span style="color:#59b9b7;">{{ $t('news.title_part_1') }}</span></strong> <strong><span>{{ $t('news.title_part_2') }}</span></strong>
  </TitleHeaderNews>
  <div class="site-content marginer">
    <div class="container" v-if="show_content">
      <div class="row">
        <!-- Content -->
        <div class="content col-lg-8">
          <div class="content-top">
            <!-- Article -->
            <article class="card card--lg post post--single">
              <figure class="post__thumbnail">
                <nuxt-img loading="lazy" :src="getBlogImage(blog)" :alt="blog.blog_picture_alt" style="width: 100%;" width="100%" />
              </figure>

              <div class="card__content">
                <header class="post__header">
                  <ul class="post__meta meta desktop">
                    <li class="meta__item meta__item--date">
                      <time datetime="2017-08-23">{{getSubmiitedDate(blog.blog_submitteddate)}}</time>
                    </li>
                    <div class="meta__items">
                      <li class="meta__item meta__item--views">
                        <a ><nuxt-img loading="lazy" src="/images/icon_feather-eye.png" width="14" height="11" alt="view icon"/>{{ blog.blog_views }}</a>
                      </li>
                      <li class="meta__item meta__item--comments">
                        <a ><nuxt-img loading="lazy" src="/images/icon_awesome-comment.png" width="14" height="11"  alt="comment icon"/>{{ blog.comments_count }}</a>
                      </li>
                      <li class="meta__item meta__item--likes">
                        <a ><nuxt-img loading="lazy" src="/images/icon_feather-heart.png" width="14" height="11"  alt="like icon"/> {{ blog.blog_likes }}</a>
                      </li>
                    </div>
                  </ul>
                  <h1 class="post__title">
                    {{ blog.bd_subject }}
                  </h1>

                  <ul class="post__meta meta phone">
                    <li class="meta__item meta__item--date">
                      <time datetime="2017-08-23">{{getSubmiitedDate(blog.blog_submitteddate)}}</time>
                    </li>
                    <div class="meta__items">
                      <li class="meta__item meta__item--views">
                        <a ><nuxt-img loading="lazy" src="/images/icon_feather-eye.png" width="14" height="11" alt="view icon"/>/{{ blog.blog_views }}</a>
                      </li>
                      <li class="meta__item meta__item--comments">
                        <a ><nuxt-img loading="lazy" src="/images/icon_awesome-comment.png" width="14" height="11" alt="comment icon"/>{{ blog.comments_count }}</a>
                      </li>
                      <li class="meta__item meta__item--likes">
                        <a ><nuxt-img loading="lazy" src="/images/icon_feather-heart.png" width="14" height="11" alt="like icon"/> {{ blog.blog_likes }}</a>
                      </li>
                    </div>
                  </ul>

                  <div class="post__author">
                    <nuxt-img loading="lazy" :src="getAuthorImage(blog)" alt="Post Author Avatar" width="33" height="33"/>
                    <h2 class="post__author">{{ blog.author_namefamily }}</h2>
                  </div>
                </header>

                <div class="post__content" v-html="blog.bd_content">

                </div>
                <BlogPostAds style="width: calc(100% + 32px);margin: -16px;" v-if="GetScreenWidth <= 992" :promotion="{showTimer: true}"  />
              </div>
            </article>
            <!-- Article / End -->

            <!-- Post Sharing Buttons -->
            <div class="post-sharing">
              <a :href="'https://www.facebook.com/sharer/sharer.php?u='+getSharableLink" target="_blank" class="btn btn-default btn-facebook btn-icon btn-block">
                <div class=""><img src="/images/facebook.png" alt="share facebook icon" width="30" height="30" style="margin-right: 10px;" /> </div>
                <span class="post-sharing__label d-none d-sm-inline-block">Share on Facebook</span>
              </a>
              <a :href="'https://twitter.com/intent/tweet?url='+getSharableLink" target="_blank" class="btn btn-default btn-twitter btn-icon btn-block">
                <div class=""><img src="/images/t2.svg" alt="share twitter icon" style="margin-right: 10px;" width="40" height="40"/> </div>
                <span class="post-sharing__label d-none d-sm-inline-block">Share on Twitter</span>
              </a>
              <a :href="'https://www.instagram.com/?url='+getSharableLink" target="_blank" class="btn btn-default instagram btn-icon btn-block">
                <div class=""><img src="/images/instagram.png" alt="share instagram icon" style="margin-right: 10px;" width="30" height="30" /> </div>
                <span class="post-sharing__label d-none d-sm-inline-block">Share on Instagram</span>
              </a>
            </div>
            <div class="post-author card card--lg">
              <div class="card__content">
                <header class="post-author__header">
                  <figure class="post-author__avatar">
                    <nuxt-img loading="lazy" :src="getAuthorImage(blog)" quality="60" sizes="sm:60px md:60px lg:60px" alt="Post Author Avatar" width="60" height="60"/>
                  </figure>
                  <div class="post-author__info">
                    <span class="post-author__name">{{blog.author_namefamily}}</span>
                    <span class="post-author__slogan">{{ blog.author_title }}</span>
                  </div>
                  <ul class="post-author__social-links social-links social-links--btn">
                    <li class="social-links__item" v-if="blog.author_media_fb != 'N/A'">
                      <a :href="blog.author_media_fb" target="_blank" class="social-links__link social-links__link--fb">
                        <i class="fab fa-facebook"></i>
                      </a>
                    </li>
                    <li class="social-links__item" v-if="blog.author_media_twitter != 'N/A'">
                      <a :href="blog.author_media_fb" class="social-links__link social-links__link--twitter">
                        <i class="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li class="social-links__item" v-if="blog.author_media_instagram != 'N/A'">
                      <a :href="blog.author_media_instagram" class="social-links__link social-links__link--twitter" style="background-color: orangered;">
                        <i class="fab fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </header>
                <div class="post-author__description">
                  {{blog.author_bio}}
                </div>
              </div>
            </div>
            <!-- Post Sharing Buttons / End -->

            <!-- Post Comments -->
            <div class="post-comments card card--lg">
              <header class="post-commments__header card__header">
                <span>Comments ({{ blog.comments_count }})</span>
              </header>
              <div class="post-comments__content card__content">
                <ul class="comments">
                  <li class="comments__item" v-for="cm in comments_list" :key="cm.cm_id">
                    <div class="comments__inner">
                      <header class="comment__header">
                        <div class="comment__author">
                          <div class="comment__author-info">
                            <span class="comment__author-name">{{ cm.cm_name }}</span>
                            <time class="comment__post-date">{{ getSubmiitedDate(cm.cm_date) }}</time>
                          </div>
                        </div>
                      </header>
                      <div class="comment__body">
                        {{cm.cm_comment}}
                      </div>
                    </div>
                  </li>
                </ul>

                <!-- Comments Pagination -->
                <!--                <nav-->
                <!--                    aria-label="Comments Pavigation"-->
                <!--                    class="post__comments-pagination"-->
                <!--                >-->
                <!--                  <ul class="pagination justify-content-center">-->
                <!--                    <li class="page-item active">-->
                <!--                      <a class="page-link" href="#">1</a>-->
                <!--                    </li>-->
                <!--                    <li class="page-item">-->
                <!--                      <a class="page-link" href="#">2</a>-->
                <!--                    </li>-->
                <!--                    <li class="page-item">-->
                <!--                      <a class="page-link" href="#">3</a>-->
                <!--                    </li>-->
                <!--                    <li class="page-item">-->
                <!--                      <span class="page-link">...</span>-->
                <!--                    </li>-->
                <!--                    <li class="page-item">-->
                <!--                      <a class="page-link" href="#">16</a>-->
                <!--                    </li>-->
                <!--                  </ul>-->
                <!--                </nav>-->
                <!-- Comments Pagination / End -->
              </div>
            </div>
            <!-- Post Comments / End -->
          </div>
          <!-- Post Comment Form -->
          <div class="post-comment-form card card--lg">
            <header class="post-comment-form__header card__header">
              <span style="font-weight: bold">Write a Comment</span>
            </header>
            <div class="post-comment-form__content card__content">
              <form class="comment-form" v-if="!comment_sent">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="control-label" for="input-name">Name</label>
                      <input
                          type="text"
                          id="input-name"
                          name="input-name"
                          class="form-control"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="control-label" for="input-email"
                      >Email</label
                      >
                      <input
                          type="email"
                          id="input-email"
                          name="input-email"
                          class="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label" for="textarea-comment"
                  >Your Comment</label
                  >
                  <textarea
                      name="textarea-comment"
                      id="textarea-comment"
                      rows="7"
                      class="form-control"
                  ></textarea>
                </div>
                <div class="form-group">
                  <a
                      @click="submitComment"
                      ref="btn_submit_cm"
                      class="btn btn-default btn-block btn-lg">
                    Post Your Comment
                  </a>
                </div>
              </form>
              <div class="alert alert-success" v-else>
                Your comment will be published after checking it
              </div>
            </div>
          </div>
          <!-- Post Comment Form / End -->
        </div>
        <!-- Content / End -->

        <!-- Sidebar -->
        <div id="sidebar" class="sidebar col-lg-4">
          <!-- Widget: Social Buttons -->
          <aside class="widget widget--sidebar widget-social">
            <a class="social-media instagram" :href="'https://www.instagram.com/?url='+getSharableLink" target="_blank" style="text-decoration: none;">
              <nuxt-img loading="lazy" src="/images/instagram.png" alt="instagram icon" width="30" height="30" />
              <div class="content" >
                <b>Like Our Instagram page</b>
                <span>Likes</span>
              </div>
              <nuxt-img loading="lazy" src="/images/icon_feather-plus-circle.png" alt="like icon"  height="28" width="28"/>
            </a>
          </aside>
          <!-- Widget: Social Buttons / End -->
          <aside>
            <BlogPostAds v-if="GetScreenWidth > 992" :promotion="{showTimer: true}" class="promotion" />
          </aside>

          <!-- Widget: Popular News -->
          <aside class="widget widget--sidebar card widget-popular-posts">
            <div class="widget__title card__header">
              <span class="bld">Popular News</span>
            </div>
            <div class="widget__content card__content">
              <ul class="posts posts--simple-list">
                <li class="posts__item posts__item--category-1" v-for="p_blog in popularBlogs" :key="p_blog.blog_id">
                  <figure class="posts__thumb">
                    <a href="#"><nuxt-img loading="lazy" :src="getBlogImageThumb(p_blog)" :alt="p_blog.blog_picture_alt" quality="80" width="80" height="80"/></a>
                  </figure>
                  <div class="posts__inner">
                    <div class="posts__title">
                      <NuxtLink no-prefetch :to="urlwithLocal('blog/'+ p_blog.bd_subject_link)">{{p_blog.bd_subject}}</NuxtLink>
                    </div>
                    <time class="posts__date">{{ getSubmiitedDate(p_blog.blog_submitteddate) }}</time>
                  </div>
                </li>

              </ul>
            </div>
          </aside>
          <!-- Widget: Popular News / End -->

          <!-- Widget: Banner -->
          <aside class="widget card widget--sidebar widget-banner">
            <div class="widget__title card__header">
              <span class="bld">Advertisement</span>
            </div>
            <nuxt-link :to="urlwithLocal('fc-coins/fc-24-coins')" class="widget__content card__content advertisement adshref">
              <nuxt-img loading="lazy" src="/images/promotion/banner.webp" alt="ads picture" width="340" height="285" />
            </nuxt-link>
          </aside>
          <!-- Widget: Banner / End -->
        </div>
        <!-- Sidebar / End -->
      </div>
    </div>
  </div>
</template>

<script setup>
import TitleHeaderNews from "../../../../components/blocks/TitleHeaderNews.vue";
import {blogapi} from "../../../../composables/blogapi";
import BlogPostAds from "../../../../components/blog/BlogPostAds";
import moment from "moment";
import {LOCALES_AVAILABLE} from '~/plugins/i18n'
import {useCommonStore} from "~/stores/commonStore";
import {getLocaleRoutePath} from "~/plugins/i18n";
import useUtils from "../../../../composables/useUtils";
import {useNuxtApp} from "nuxt/app";
import { callWithNuxt } from '#app'
import {useI18n} from "vue-i18n";
import {computed, onMounted} from "vue";

let GetScreenWidth = ref(0);
let comment_sent = ref(false);
let orginurl = ref('');
const { t } = useI18n({ useScope: 'global' })
const {urlwithLocal} = useUtils();
const route = useRoute();
const router = useRouter();
var blog_id = route.params.title;
const nuxtApp = useNuxtApp()
onMounted(()=>{
  GetScreenWidth.value = window.innerWidth;
  orginurl.value = location.origin;
})
const blogResponse = await blogapi.get('/blog/'+blog_id);
if(blogResponse.code !== 200){
  let path = 'blog'
  if (blogResponse?.data?.payload?.bd_subject_link) {
    path += '/' + blogResponse.data.payload.bd_subject_link
  }
  path = encodeURI(getLocaleRoutePath(path));
  callWithNuxt(nuxtApp, navigateTo, [path])
}

const blog = blogResponse.data.blog;
const show_content = ref(true)
const comments_list = blog?.comments;
const popularBlogs = blogResponse.data.populars;

function getBlogImage(b){
  return 'https://blogadmin.whatsgaming.net/uploads/blogs/'+b.blog_picture;
}
function getBlogImageThumb(b){
  return 'https://blogadmin.whatsgaming.net/uploads/blogs/thumb_'+b.blog_picture;
}
var canonical_val = router.currentRoute.value.fullPath;

const commonStore = useCommonStore()
const setBlogLocalizationPaths = () => {
  commonStore.blogLocalizationPaths = {}
  let links = []
  blog.hrefs.map(i => {
    const lang = i.lang.toLowerCase().replace("pt-pt","pt");
    if (!LOCALES_AVAILABLE.includes(lang)) {
      return
    }
    commonStore.blogLocalizationPaths[lang] = '/' + lang+'/blog/' + i.bd_subject_link;

    if(i.bd_subject_link !== ""){
    links.push({
      rel: 'alternate',
      href: 'https://whatsgaming.net'  + (lang==='en' ? '':'/' + lang)+'/blog/' + i.bd_subject_link,
      hreflang: lang
    })
    if(lang === 'en') {
      links.push({
        rel: 'alternate',
        href: 'https://whatsgaming.net' + '/blog/' + i.bd_subject_link,
        hreflang: "x-default"
      })
    }
    }
  })
  return links
}
//useHead(makeMeta(route.path, blog.bd_subject, blog.bd_seo_description || blog.bd_subject, blog.tags.toString()))

const schema_org_data =  {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://whatsgaming.net" + route.path
  },
  "headline": blog.bd_subject,
  "description": blog.bd_seo_description || blog.bd_subject,
  "image": getBlogImage(blog),
  "author": {
    "@type": "Person",
    "name": blog.author_namefamily
  },
  "publisher": {
    "@type": "Organization",
    "name": "Whatsgaming",
    "logo": {
      "@type": "ImageObject",
      "url": "https://whatsgaming.net/_ipx/_/images/logo_4.png"
    }
  },
  "datePublished": (new Date(blog.blog_submitteddate * 1000)).toISOString().substr(0,10),
  "dateModified": (new Date(blog.blog_submitteddate * 1000)).toISOString().substr(0,10)
}
const breadcrumbs_schema_org_data =  makeBreadcrumbsSchemaOrgData([
  {path: urlwithLocal(''), title: 'Whatsgaming'},
  {path: urlwithLocal('blog'), title: t('home.navigation.blog')},
  {path: route.path, title: blog.bd_subject},
])

useHead({
  title:blog.bd_subject + ' | WG',
  meta: [
    { name: 'og:site_name',content: 'Whatsgaming'},
    { name: 'description', content: blog.bd_seo_description || blog.bd_subject },
    { name: 'keywords', content: blog.tags.toString() },
    { name: 'og:url', content: 'https://whatsgaming.net' + router.currentRoute.value.fullPath },
    { name: 'og:type',content: 'article'},
    { name: 'title',content: blog.bd_subject },
    { name: 'og:title',content: blog.bd_subject},
    { name: 'og:description',content: blog.blog_seo_description || blog.bd_subject},
    { name: 'og:image',content: getBlogImage(blog)},
    { name: 'thumbnail',content: getBlogImage(blog)},
    { name: 'article:published_time', content: new Date(blog.blog_submitteddate * 1000).toISOString()},
    { name: 'article:modified_time', content: new Date(blog.blog_submitteddate * 1000).toISOString()}
  ],
  link: [
    {rel: 'canonical', href: 'https://whatsgaming.net' + canonical_val},
    ...setBlogLocalizationPaths()
  ],
  script: [
    { innerHTML: JSON.stringify(breadcrumbs_schema_org_data), type: 'application/ld+json' },
    {innerHTML: JSON.stringify(schema_org_data), type: 'application/ld+json'}
  ]
})

const getSubmiitedDate = (date) => {
  return moment(date * 1000).format("DD.MM.Y");
}
const getAuthorImage = (b) => {
  if(b.author_picture == "N/A"){
    return "/images/avatar-1.png";
  }else{
    return 'https://blogadmin.whatsgaming.net/uploads/author/'+b.author_picture;;
  }
}
const submitComment = () =>{
  this.$refs.btn_submit_cm.disabled = true;
  this.$refs.btn_submit_cm.innerHTML = "sending...";
  setTimeout(()=>{
    this.comment_sent.value = true;
  },1000);
}

const getSharableLink = computed(()=>{
  return orginurl.value + router.currentRoute.value.fullPath;
})

onMounted(()=>{
  const links = document.querySelectorAll('.ct_link');
  links.forEach(link => {
    link.addEventListener('click', function(event) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          window.scrollTo({
            top: window.scrollY - 180, // Adjust the offset as needed
            behavior: 'smooth'
          });
        }, 0);
      }
    });
  });
})
</script>

<style scoped>
@import "~/public/css/infoBlock.css";
@import '~/public/css/home.css';
@import "@/public/fonts/FontAwesome/style.css";
@import "@/public/css/pages/blogview.css";
.meta__item--views::before,.meta__item--comments::before {
  content: "" !important;
}
.meta__item img{
  margin-top: -5px;
  margin-right: 5px;
  transform: scale(1) !important;
}
.marginer{
  margin-top: 80px;
}
@media (max-width: 992px) {
  .marginer{
    margin-top: 0px;
  }
}
h2 {
  font-size: 22px;
  text-transform: none;
  font-style: normal;
  color: #000000;
}
.post__thumbnail img {
  min-height: 456px;
}
@media screen and (max-width: 480px) {
  .post__thumbnail img {
    min-height: 220px;
  }
}
.adshref{
  cursor: pointer;
}
</style>

<style>
.post__content{
  width: 100%;
  overflow: auto;
}
.post__content > h2{
  font-size: 20px !important;
}
.post__content > p  img,.article-post > img,article img,li img{
  max-width: 100%;
}
.post__content tbody:before,.post__content tbody:after{
  display: none;
}
.post__content table::before{
  position: relative;
}
.post__content table{
  overflow: scroll;
  width: 100%;
  max-width: 600px;
}
.post__content table td{
  white-space: pre;
  line-height: initial;
}
.ct_table{
  background: #d5d0d0;
  padding: 15px;
  padding-left: 30px;
}
.ct_table li{
  font-family: "Montserrat" !important;
  font-weight: 500;
  margin-top: 5px;
  font-size: 17px;
}
.ct_h3{
  font-size: 16px !important;
}
@media(max-width: 800px){
  .ct_table li{
    font-size: 15px;
  }
  .post__content table{
    border: 1px solid;
  }
  .post__content table td{
    line-height: 30px;
  }
}
.post-author__header{
  text-align: left;
  direction: ltr;
}
.site-content,.post-author__info{
  direction: ltr;
}
.rtl_class .card__content
,.rtl_class .post-commments__header
,.rtl_class .post-comment-form__header span
,.rtl_class .posts__item--quote .title,
.rtl_class .card__header>span{
  direction: rtl;
  text-align: right;
}
.rtl_class .card__header{
  justify-content: flex-end;
}

</style>
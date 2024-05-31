<template>
  <div class="post-grid__item">
    <div class="posts__item posts__item--card posts__item--category-1 card">
      <figure class="posts__thumb">
        <NuxtLink :to="urlwithLocal('blog/'+post.bd_subject_link)">
          <nuxt-img loading="lazy" :src="getBlogThumbImage"  :alt="post.blog_picture_alt" width="100" height="100"/>
        </NuxtLink>
      </figure>
      <div class="posts__inner card__content">
        <time datetime="2016-08-23" class="posts__date">{{ getSubmiitedDate }}</time>
        <h6 class="posts__title">
          <NuxtLink :to="urlwithLocal('blog/'+post.bd_subject_link)">{{ post.bd_subject }}</NuxtLink>
        </h6>
      </div>
      <footer class="posts__footer card__footer">
        <div class="post-author">
          <figure class="post-author__avatar">
            <nuxt-img loading="lazy" :src="getAuthorImage" alt="Post Author Avatar" width="100" height="100" />
          </figure>
          <div class="post-author__info">
            <h4 class="post-author__name">{{ post.author_namefamily }}</h4>
          </div>
        </div>
        <ul class="post__meta meta">
          <li class="meta__item meta__item--views">
            <nuxt-img loading="lazy" src="/images/icon_feather-eye.png" alt="eye icon" />
            {{post.blog_views}}
          </li>
          <li class="meta__item meta__item--likes">
            <nuxt-img loading="lazy" src="/images/icon_awesome-comment.png" alt="comment icon" />
            {{post.comments_count}}
          </li>
          <li class="meta__item meta__item--comments">
            <nuxt-img loading="lazy" src="/images/icon_feather-heart.png" alt="likes icon" />
            {{post.blog_likes}}
          </li>
        </ul>
      </footer>
    </div>
  </div>
</template>

<style scoped>

.posts__item {
  margin-bottom: 1em;
}
.posts__item:last-child {
  margin-bottom: 0;
}

.posts__cat {
  display: block;
  overflow: hidden;
  margin-bottom: 8px;
  padding-right: 5px;
  z-index: 1;
}

.posts__cat-label {
  background-color: #ffcc00;
  display: block;
  float: left;
  font-style: normal;
}
.posts__cat-label + .posts__title {
  margin-top: 0.55em;

}

.posts__cat-label + .posts__cat-label {
  margin-left: 0.5em;
}

.posts__item--category-1 .posts__cat-label {
  background-color: #ffcc00;
}
.posts__item--category-1 .posts__title--color-hover > a:hover {
  color: #ffcc00;
}
.posts__item--category-1 .posts__thumb--hover::before {
  background-color: #ffcc00;
}

.posts__item--category-2 .posts__cat-label,
.posts__item--category-2 .posts__cta {
  background-color: #9a66ca;
}
.posts__item--category-2 .posts__title--color-hover > a:hover {
  color: #9a66ca;
}
.posts__item--category-2 .posts__thumb--hover::before {
  background-color: #9a66ca;
}

.posts__item--category-3 .posts__cat-label,
.posts__item--category-3 .posts__cta {
  background-color: #ff7e1f;
}
.posts__item--category-3 .posts__title--color-hover > a:hover {
  color: #ff7e1f;
}
.posts__item--category-3 .posts__thumb--hover::before {
  background-color: #ff7e1f;
}

.posts__item--category-4 .posts__cat-label,
.posts__item--category-4 .posts__cta {
  background-color: #31404b;
}
.posts__item--category-4 .posts__title--color-hover > a:hover {
  color: #31404b;
}
.posts__item--category-4 .posts__thumb--hover::before {
  background-color: #31404b;
}

.posts__item .posts__cat-label--category-1 {
  background-color: #ffcc00;
}
.posts__item .posts__cat-label--category-2 {
  background-color: #9a66ca;
}
.posts__item .posts__cat-label--category-3 {
  background-color: #ff7e1f;
}
.posts__item .posts__cat-label--category-4 {
  background-color: #31404b;
}

.posts__thumb {
  float: left;
  margin: 0 10px 0 0;
}

.posts__thumb--hover {
  position: relative;
}
.posts__thumb--hover::before {
  content: "";
  display: block;
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: #ffdc11;
  color: #fff;
  opacity: 0;
  -webkit-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.posts__thumb--hover > a {
  position: relative;
  display: block;
}
.posts__thumb--hover > a::before,
.posts__thumb--hover > a::after {
  content: "";
  display: block;
  position: absolute;
  background-color: #fff;
  overflow: hidden;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%) scale(0);
  transform: translate(-50%, -50%) scale(0);
  z-index: 2;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.posts__thumb--hover > a::before {
  height: 4px;
  width: 18px;
}
.posts__thumb--hover > a::after {
  height: 18px;
  width: 4px;
}
.posts__thumb--hover:hover::before {
  opacity: 0.8;
}
.posts__thumb--hover:hover > a::before,
.posts__thumb--hover:hover > a::after {
  -webkit-transform: translate(-50%, -50%) scale(1);
  transform: translate(-50%, -50%) scale(1);
}

.posts__thumb--video {
  position: relative;
}
.posts__thumb--video::before {
  content: "\f04b";
  display: block;
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  margin: -30px 0 0 -30px;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-radius: 50% !important;
  color: #fff;
  font-size: 28px;
  text-indent: 4px;
  background-color: rgba(0, 0, 0, 0.8);
  text-rendering: auto;
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  pointer-events: none;
  -webkit-transition: -webkit-transform 0.3s ease;
  transition: -webkit-transform 0.3s ease;
  transition: transform 0.3s ease;
  transition: transform 0.3s ease, -webkit-transform 0.3s ease;
}
.posts__thumb--video:hover::before {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.posts__thumb--video-sm::before {
  width: 32px;
  height: 32px;
  margin: -16px 0 0 -16px;
  line-height: 32px;
  font-size: 14px;
  text-indent: 2px;
}

.posts__thumb--video-md::before {
  width: 40px;
  height: 40px;
  margin: -20px 0 0 -20px;
  line-height: 40px;
  font-size: 14px;
  text-indent: 3px;
}

.posts__thumb--video-has-overlay::after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  pointer-events: none;
}

.posts__thumb--video-colored-icon::before {
  background-color: #f34141;
}

.posts__thumb.h-100 img {
  -o-object-fit: cover;
  object-fit: cover;
}

.posts__thumb--has-ratio {
  float: none;
  margin-right: 0;
}
.posts__thumb--has-ratio img {
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}

.posts__thumb--ratio-16-9 img {
  aspect-ratio: 16/9;
}

.posts__thumb--ratio-16-8-5 img {
  aspect-ratio: 16/8.5;
}

.posts__thumb--ratio-16-10 img {
  aspect-ratio: 16/10;
}

.posts__thumb--ratio-20-9 img {
  aspect-ratio: 20/9;
}

.posts__title {
  text-transform: uppercase;
  letter-spacing: -0.03em;
  font-style: normal;
}
.posts__title + .posts__date {
  margin-top: 0.7em;
}

.posts__title a {
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
  -webkit-transition: color 0.2s ease-in-out;
  transition: color 0.2s ease-in-out;
}

.widget__content.card__content .posts__title a {
  margin-bottom: 0;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #201d56;
  text-transform: capitalize;
}

.card__content .posts__date {
  font-weight: 400;
  font-size: 10px;
  line-height: 12px !important;
  color: #201d56 !important;
}

.posts__title a:hover {
  color: #4f6779;
}

.posts__date {
  display: inline-block;
  text-transform: capitalize;
  font-family: "Montserrat", sans-serif;
  line-height: 1.2em;
  margin-left: 2px;
  font-weight: 400;
  font-size: 11px;
  color: #000000 !important;
}


.posts__item--card .posts__inner {
  padding-top: 18px;
  position: relative;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}
.posts__item--card .posts__footer {
  padding: 17px 24px;
  border-top: 1px solid #e4e7ed;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
}
.post-author {
  -ms-flex-preferred-size: 50%;
  flex-basis: 50%;
  text-align: left;
}
@media (max-width: 479px) {
  .posts__item--card .post-author {
    -ms-flex-preferred-size: 40%;
    flex-basis: 40%;
  }
}
.posts__item--card .post-author__avatar {
  width: 24px;
  height: 24px;
  margin-right: 4px;
  vertical-align: middle;
  border-radius: 50%;
  overflow: hidden;
}
.posts__item--card .post-author__avatar img {
  vertical-align: top;
}
@media (max-width: 479px) {
  .posts__item--card .post-author__avatar {
    display: none;
  }
}
.posts__item--card .post-author__name {
  font-size: 11px;
  text-transform: capitalize;
  color: #4a4a4a;
  font-weight: 400;
  font-style: normal;
}
.posts__item--card .post__meta {
  display: flex;
  gap: 13px;
  -ms-flex-preferred-size: 50%;
  margin-left: auto;
  text-align: right;
  margin-right: -12px;
}

.posts__item--card-height-auto {
  height: auto;
}


/* Post Meta */
.meta {
  list-style: none;
  padding: 0;
  margin: 0;
}

.meta__item {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  text-transform: uppercase;
  line-height: 1.2em;
  display: inline-block;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  gap: 5px;
}
.meta__item img{
  transform: scale(1.2);
}
.meta__item--likes img{
  margin-top:-1px;
}
.meta__item + .meta__item {
  margin-left: 8px;
}
@media (min-width: 992px) {
  .meta__item + .meta__item {
    margin-left: 0;
  }
}
.meta__item::before {
  font-size: 13px;
  line-height: 1em;
  vertical-align: middle;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  font-family: "simple-line-icons";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-right: 4px;
  position: relative;
  top: -1px;
}
@media (min-width: 992px) {
  .meta__item::before {
    margin-right: 8px;
  }
}
.meta__item a {
  color: #9a9da2;
  -webkit-transition: color 0.2s ease;
  transition: color 0.2s ease;
}
.meta__item a:hover {
  color: #31404b;
}
.meta__item--likes .meta-like {
  vertical-align: middle;
  font-size: 12px;
}
.meta__item--likes .meta-like--active {
  color: #f1365e;
}

.meta__item--author img {
  border-radius: 50%;
  margin-right: 6px;
}

/* Side Meta Block */
.post__meta-block--side {
  padding: 24px;
}
.post__meta-block--side .post-author__name {
  font-size: 13px;
}
.post__meta-block--side .social-links--btn {
  margin-left: 74px;
}
.post__meta-block--side .post__meta {
  display: none;
}
@media (min-width: 992px) {
  .post__meta-block--side {
    padding: 0;
    float: left;
    width: 60px;
    margin: 43px 0 0 24px;
  }
  .post__meta-block--side + .card__content {
    overflow: hidden;
    padding-left: 24px;
  }
  .post__meta-block--side .post-author {
    text-align: center;
    padding-bottom: 34px;
  }
  .post__meta-block--side .post-author__avatar {
    float: none;
    margin: 0 auto 8px auto;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .post__meta-block--side .post-author__name {
    font-size: 10px;
    line-height: 1.2em;
    margin-bottom: 0.75em;
  }
  .post__meta-block--side .post-author__slogan {
    font-size: 9px;
  }
  .post__meta-block--side .post__meta {
    display: block;
  }
  .post__meta-block--side .meta__item {
    display: block;
    text-align: center;
    margin: 0 0 21px 0;
  }
  .post__meta-block--side .meta__item::before {
    display: block;
    margin: 0 auto 6px auto;
  }
  .post__meta-block--side .meta__item--likes .meta-like {
    display: block;
    margin: 0 auto 6px auto;
  }
  .post__meta-block--side .social-links--btn {
    text-align: center;
    padding-bottom: 20px;
    margin-left: 0;
  }
  .post__meta-block--side .social-links--btn .social-links__item {
    display: block;
    margin: 0 auto 12px auto;
  }
}

.post__meta-block--top {
  padding-bottom: 65px;
}
.post__meta-block--top .post__category {
  margin-bottom: 22px;
}
.post__meta-block--top .posts__cat-label {
  display: inline-block;
  float: none;
  font-size: 10px;
}
.post__meta-block--top .page-heading__title {
  font-size: 24px;
  line-height: 1em;
  margin-bottom: 0.475em;
}
@media (min-width: 992px) {
  .post__meta-block--top .page-heading__title {
    font-size: 42px;
  }
}
.post__meta-block--top .page-heading__title > a {
  color: #fff;
}
.post__meta-block--top .post__meta {
  color: #fff;
  margin-bottom: 22px;
}
.post__meta-block--top .meta__item a {
  color: #fff;
}
.post__meta-block--top .post-author {
  text-align: center;
}
.post__meta-block--top .post-author__avatar {
  display: block;
  width: 40px;
  height: 40px;
  margin: 0 auto 10px auto;
}
.post__meta-block--top .post-author__name {
  font-size: 13px;
  color: #fff;
}
.post__meta-block--top .post-author__slogan {
  font-size: 10px;
  font-weight: 400;
}

.post__meta-block-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
@media (min-width: 992px) {
  .post__meta-block-wrapper {
    height: 450px;
  }
}
@media (min-width: 1200px) {
  .post__meta-block-wrapper {
    height: 545px;
  }
}
.post__meta-block-wrapper .post__meta-block--top {
  padding-bottom: 0;
}


/* Post: Cards */
.posts__item--card-row {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
}

.posts__item--card {
  height: max-content;
  min-height: 508px;
}
.posts__item--card,
.posts__item--card:last-child {
  margin-bottom: 15px;
}
.posts__item--card .posts__thumb {
  float: none;
  margin: 0;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.posts__item--card .posts__thumb:first-child {
  overflow: hidden;
  border-radius: 4px 4px 0 0;
}
.posts__item--card .posts__thumb:last-child {
  overflow: hidden;
  border-radius: 0 0 4px 4px;
}
.posts__item--card .posts__thumb img {
  width: 100%;
  height: auto;
  /*height: 250px;*/
  -webkit-transition: -webkit-transform 0.5s ease;
  transition: -webkit-transform 0.5s ease;
  transition: transform 0.5s ease;
  transition: transform 0.5s ease, -webkit-transform 0.5s ease;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.posts__item--card .posts__thumb:hover img {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.posts__item--card .posts__thumb .posts__cta {
  top: 13px;
  right: 13px;
  -webkit-transform: none;
  transform: none;
}
.posts__item--card.posts__item--card-condensed {
  margin-bottom: 0;
  border-bottom: none;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.posts__item--card .posts__cta {
  display: block;
  position: absolute;
  top: 0;
  right: 23px;
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.posts__item--card .posts__cta::before,
.posts__item--card .posts__cta::after {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #fff;
  -webkit-transition: -webkit-transform 0.25s ease;
  transition: -webkit-transform 0.25s ease;
  transition: transform 0.25s ease;
  transition: transform 0.25s ease, -webkit-transform 0.25s ease;
}
.posts__item--card .posts__cta::before {
  width: 17px;
  height: 3px;
}
.posts__item--card .posts__cta::after {
  width: 3px;
  height: 17px;
}
.posts__item--card .posts__cta:hover::before,
.posts__item--card .posts__cta:hover::after {
  -webkit-transform: translate(-50%, -50%) rotate(90deg);
  transform: translate(-50%, -50%) rotate(90deg);
}
.posts__item--card .posts__cat {
  display: block;
  position: absolute;
  left: 23px;
  top: 23px;
}
.posts__item--card .posts__inner .posts__cat {
  position: static;
  margin-bottom: 18px;
}
.posts__item--card .posts__cat-label {
  font-size: 10px;
  padding-top: 0.6em;
}
.posts__item--card .posts__date {
  font-size: 10px;
  line-height: 1.2em;
}
.posts__item--card .posts__date + .posts__title {
  margin-top: 5px;
}
@media (min-width: 992px) {
  .posts__item--card .posts__date + .posts__title {
    margin-top: 10px;
  }
}
@media (min-width: 992px) {
  .posts__item--card .posts__date {
    font-size: 11px;
  }
}
.posts__item--card .posts__title {
  font-size: 18px;
  line-height: 1em;
  margin-bottom: 0.2em;
}
@media (min-width: 992px) {
  .posts__item--card .posts__title {
    font-size: 20px;
  }
}
@media (min-width: 1200px) {
  .posts__item--card .posts__title {
    font-size: 24px;
  }
}
@media (min-width: 992px) {
  .posts__item--card .posts__title--sm {
    font-size: 18px;
  }
}
@media (min-width: 992px) {
  .posts__item--card .posts__title--sm + .posts__excerpt {
    padding: 10px 0 0 0;
  }
}
.posts__item--card .posts__excerpt {
  padding: 13px 0 0 0;
  font-size: 15px;
  line-height: 26px;
}
@media (min-width: 992px) {
  .posts__item--card .posts__excerpt {
    padding: 23px 0 8px 0;
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


/* Post Author
/* ------------------------- */
.post-author__header {
  overflow: hidden;
  margin-bottom: 26px;
}

.post-author__avatar {
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 14px 0 0;
  display: inline-block;
  vertical-align: middle;
}
.post-author__avatar img {
  max-width: 100%;
  height: auto;
}

.post-author__info {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-left: 5px;
}

.post-author__name {
  margin-bottom: 0.2em;
}

.post-author__slogan {
  display: block;
  font-size: 11px;
  line-height: 1.2em;
  font-family: "Montserrat", sans-serif;
  color: #9a9da2;
  font-weight: 400;
}

.post-author__social-links.social-links {
  padding: 10px 0 0 0;
}
@media (min-width: 992px) {
  .post-author__social-links.social-links {
    padding: 0;
    float: right;
    margin-right: -2px;
  }
}

.post-author--avatar-left .post-author__header {
  margin-bottom: 12px;
  padding-top: 5px;
}
.post-author--avatar-left .post-author__avatar {
  float: left;
  margin-right: 24px;
}


/* Card
/* ------------------------- */
.card {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  margin-bottom: 15px;
  margin-top: 20px;
}

.card--row {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
}

.card--block {
  display: block;
}

.card--clean {
  background: none;
  border: none;
}

.card__header {
  background-color: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
}

.card--clean > .card__content {
  padding: 15px 0 0 0;
}

.card--has-table > .card__content {
  padding: 0;
}
.card--has-table > .card__content .table {
  margin-bottom: 0;
}

.card--no-paddings > .card__content {
  padding: 0 !important;
}
@media (min-width: 992px) {
  .card--no-paddings > .card__content {
    padding: 0 !important;
  }
}

.card--squared-top {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.card__header {
  display: flex;
  align-items: center;
  padding-left: 26px;
  font-weight: 700;
  font-size: 16px;
  height: 72px;
  color: #000000;
  height: 72px;
  border-left: 6px solid #34307c;
  border-bottom: 1px solid #ececec;
  width: 100%;
}
.card__header ~ .card__header {
  border-radius: 0;
}
.card__header ~ .card__header::before {
  border-radius: 0;
}

.card__header > h4 {
}
@media (min-width: 992px) {
  .card__header .card-header__button {
    float: right;
  }
}

.card__header--has-btn {
  padding-top: 24px;
  padding-bottom: 24px;
}
.card__header--has-btn > h4 {
  margin-bottom: 0.5em;
}
@media (min-width: 480px) {
  .card__header--has-btn > h4 {
    display: inline-block;
    margin-bottom: 0;
  }
}

.card__header-secondary {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  gap: 12px;
}
.card__header-secondary .form-group {
  margin-bottom: 0;
}

.card__header--has-filter {
  padding-top: 24px;
  padding-bottom: 24px;
}
.card__header--has-filter > h4 {
  display: inline-block;
}
.card__header--has-filter .category-filter {
  padding-top: 5px;
}
@media (min-width: 480px) {
  .card__header--has-filter .category-filter {
    float: right;
    padding-top: 0;
  }
}

.card__header--has-legend {
  padding-top: 24px;
  padding-bottom: 24px;
}
.card__header--has-legend > h4 {
  display: inline-block;
}
.card__header--has-legend .chart-legend {
  padding-top: 5px;
}
@media (min-width: 480px) {
  .card__header--has-legend .chart-legend {
    float: right;
    padding-top: 0;
  }
}

.card__header--has-checkbox {
  padding-top: 24px;
  padding-bottom: 24px;
}
.card__header--has-checkbox > h4 {
  margin-bottom: 0.5em;
}
@media (min-width: 480px) {
  .card__header--has-checkbox > h4 {
    display: inline-block;
    margin-bottom: 0;
  }
}
@media (min-width: 480px) {
  .card__header--has-checkbox .checkbox {
    float: right;
    padding-top: 0;
    font-weight: bold;
    font-size: 10px;
  }
}

.card__header--has-toggle {
  padding-top: 24px;
  padding-bottom: 24px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.card__header--has-toggle .switch {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  text-align: right;
}

.card__header--has-arrows .slick-prev,
.card__header--has-arrows .slick-next {
  top: 25px;
}

.card__header--has-team-info {
  padding-top: 21px;
  padding-bottom: 21px;
}

.card__header--no-highlight::before {
  display: none;
}

.card__header--double {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.card__header--double::after {
  content: "";
  display: block;
  position: absolute;
  width: 6px;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #9a66ca;
  border-radius: 0 3px 0 0;
}

.card__header--hero {
  position: relative;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  min-height: 140px;
}
.card__header--hero .card__header-hgroup {
  position: relative;
  z-index: 4;
  text-align: center;
}
.card__header--hero .card__header-title {
  font-size: 30px;
  line-height: 1.2em;
  text-transform: uppercase;
  color: #fff;
  -webkit-margin-after: 0.4em;
  margin-block-end: 0.4em;
}
.card__header--hero .card__header-subtitle {
  font-size: 14px;
  line-height: 1.2em;
  text-transform: uppercase;
  color: #fff;
  -webkit-margin-after: 0;
  margin-block-end: 0;
}
.card__header--hero .card__header-bg {
  position: absolute;
  inset: 0;
  background-image: url("../images/hockey/samples/ticket-bg-1.jpg");
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: cover;
  isolation: isolate;
}
.card__header--hero .card__header-bg--2 {
  background-image: url("../images/hockey/samples/ticket-bg-2.jpg");
}

.card__content {
  padding: 18px 26px;
}

.card__content-inner {
  padding: 20px;
}

.card__content--header-bg {
  background-color: transparent;
}

.card__content--pattern-dotted {
  background-image: url("../images/pattern-12x12.gif");
  background-position: 6px 10px;
}


/* Simple Posts List */
.posts__item {
  overflow: hidden;
  margin-bottom: 18px;
}
.card .posts__item {
  border-bottom: 1px solid #e4e7ed;
  margin-left: -24px;
  margin-right: -24px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 18px;
  height: 100%;
  margin-bottom: 0 !important;
}
.posts__item:last-child,
.card .posts__item:last-child {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}
.card .posts--simple-list.posts--simple-list-numbered .posts__item {
  padding-left: 100px;
}
.card .posts--simple-list.posts--simple-list-numbered .posts__item::before {
  width: 100px;
  text-align: center;
  margin-top: -16px;
}
.card
.posts--simple-list.posts--simple-list-numbered
.posts__item:last-child::before {
  margin-top: -4px;
}
.card
.posts--simple-list.posts--simple-list-numbered
.posts__item
.posts__title {
  font-size: 14px;
}
.posts__cat-label + .posts__title {
  margin-top: 0.55em;
}
.posts__title {
  margin-bottom: 0;
  line-height: 1em;
}

.posts__thumb {
  border-radius: 0;
}
.posts__thumb::before {
  border-radius: 0;
}
.posts__thumb img {
  width: 80px;
  height: 80px;
  border-radius: 0;
}
.posts__excerpt--space {
  padding: 20px 0;
}
.posts__excerpt--space-sm {
  padding-top: 10px;
}
.posts__footer {
  padding-top: 17px;
}

.posts__item--card {
  height: max-content;
  /*min-height: 508px;*/
  min-height: 460px;
}

.posts__item--card,
.posts__item--card:last-child {
  margin-bottom: 15px;
}

@media (max-width: 479px) {
  .post-author {
    width: 40%;
  }
}

.post-author__avatar {
  width: 24px;
  height: 24px;
  margin-right: 4px;
  vertical-align: middle;
  border-radius: 50%;
  overflow: hidden;
}

.post-author__avatar img {
  vertical-align: top;
}

@media (max-width: 479px) {
  .post-author__avatar {
    display: none;
  }
}
.post-author__name {
  font-size: 10px;
  text-transform: uppercase;
  color: #9a9da2;
  font-weight: 400;
}

@media (max-width: 992px) {

  .card {
    border: none;
  }

  .posts__title a {
    color: #201d56;
  }

  .card__header {
    border-top: none;
    border-right: none;
  }
}
.rtl_class .post-author{
  text-align: right !important;
}
</style>

<script>
import moment from 'moment';
import {getLocaleRoutePath} from "~/plugins/i18n";
import useUtils, {urlwithLocal} from "../../composables/useUtils";
export default {
    setup(){
      const {urlwithLocal} = useUtils();
      return {urlwithLocal};
    },
    name: "blogItem",
    props: {
        post: Object,
    },
  data() {
    return {
      getLocaleRoutePath
    }
  },
    computed: {
        getSubmiitedDate() {
            return moment(this.post.blog_submitteddate * 1000).format("DD.MM.Y");
        },
        getBlogImage(){
          return 'https://blogadmin.whatsgaming.net/uploads/blogs/'+this.post.blog_picture;
        },
        getBlogThumbImage(){
          return 'https://blogadmin.whatsgaming.net/uploads/blogs/thumb_'+this.post.blog_picture;
        },
        getAuthorImage(){
          if(this.post.author_picture == "N/A"){
            return "/images/avatar-1.png";
          }else{
            return 'https://blogadmin.whatsgaming.net/uploads/author/'+this.post.author_picture;;
          }
        },
    },
}
</script>
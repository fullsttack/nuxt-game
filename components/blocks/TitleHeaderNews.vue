<template>
  <div class="page-heading">
    <div class="container page-heading__container">
      <div class="row">
        <div class="page-heading__title" >
          <h1><slot></slot></h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TitleHeaderNews",
  props:{
    htmltitle:{
      default:'',
      type:String
    }
  }
}
</script>

<style scoped>
/*
// #Page Heading
// --------------------------------------------------
*/
.page-heading {
  background-color: #1e2024;
  background-image: url("/images/ezgif-1-82a9f5cca2.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  text-align: center;
  padding: 50px 0;
  position: relative;
  max-height: 248px;
  height: 100%;

}
@media (min-width: 992px) {
  .page-heading {
    padding: 110px 0 106px 0;
  }
}
.page-heading .breadcrumb {
  font-size: 10px;
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  font-weight: bold;
  padding: 0;
}
@media (min-width: 992px) {
  .page-heading .breadcrumb {
    font-size: 11px;
    padding: 3px 0;
  }
}
.page-heading .breadcrumb > li {
  padding-left: 5px;
}
.page-heading .breadcrumb > li + li::before {
  padding-right: 5px;
  color: #9a9da2;
  font-weight: normal;
  content: "/";
}
.page-heading .breadcrumb > li > a {
  color: #fff;
}
.page-heading .breadcrumb > li > a:hover {
  color: #ffdc11;
}
.page-heading::before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /*background-image: url("/images/page-heading-pattern.png");*/
  background-size: auto;
  background-position: 100% 0;
  background-repeat: no-repeat;
  opacity: 0.4;
}
.page-heading.effect-duotone .container {
  position: relative;
  z-index: 3;
}

.page-heading--horizontal {
  text-align: inherit;
}
@media (max-width: 767px) {
  .page-heading--horizontal:not(.page-heading--title-highlight) .row {
    display: block;
    text-align: center;
  }
  .page-heading{
    margin-top: -10px !important;
  }
}

.page-heading__container {
  background: rgba(52, 48, 124, 0.7);
  width: 100%;
  height: 100%;
  max-width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100% !important;
}

.page-heading__title {
  width: 100%;
  height: 100%;
  color: #fff;
  letter-spacing: -0.02em;
  font-size: 36px;
  white-space: nowrap;
  font-weight: bold;
  margin-bottom: 0;
  font-style: normal;
}
.page-heading__title h1{
  font-size: 36px;
}

.page-heading__title::before {
  content: "";
  position: absolute;
  width: 155px;
  height: 4px;
  left: 0;
  right: 0;
  margin: auto auto;
  background: #ffffff;
  border-radius: 3px;
  margin-top: 60px;
}

.page-heading__title .highlight {
  color: #ffdc11;
}

.page-heading--simple .page-heading__img {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center center;
  object-position: center center;
}
@media (max-width: 768px){
  .page-heading__title,.page-heading__title h1{
    font-size: 18px;
  }
  .page-heading__title::before {
    height: 3px;
    margin-top: 30px;
  }
}

</style>
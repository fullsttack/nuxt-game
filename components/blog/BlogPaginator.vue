<template>
    <div class="paginator_block">
    <template v-for="page in pages" :key="page.label" >
        <NuxtLink class="btn btn-page" :class="page.label == current_page ? 'btn-active':''" :to="getUrl(page)" v-if="avBtns.includes(getBtnLabel(page.label))">
            {{ getBtnLabel(page.label) }}
        </NuxtLink>
        <a v-else class="hide-link">{{ getBtnLabel(page.label) }}</a>
    </template>
    </div>
</template>

<script>
import {getLocaleRoutePath} from "~/plugins/i18n";
export default {
    name: "blogPaginator",
    props:['pages',"len",'current_page','filter_path'],
    data(){
        return {
            avBtns:[],
            cpage:0,
            blen:0
        }
    },
    created(){
        this.cpage = parseInt(this.current_page);
        this.blen = parseInt(this.len);
        for(var j=1;j<=this.blen;j++){
            for(var i=0;i<=this.pages.length-1;i++){
                if((this.cpage + j) == i){
                    this.avBtns.push(i.toString());
                }
                if((this.cpage - j) == i){
                    this.avBtns.push(i.toString());
                }
            }
        }
        this.avBtns.push(this.cpage.toString());
        if(this.cpage !== 1) {
          this.avBtns.push("<");
        }
        try{
          if(!this.pages[this.pages.length-1].url.toString().endsWith(this.pages[this.pages.length-2].url.toString().substring(this.pages[this.pages.length-2].url.length-2))){
            this.avBtns.push(">");
          }
        }catch (e) {
          this.avBtns.push(">");
        }

    },
    methods:{
        getBtnLabel(lbl){
            return lbl.toString().replace("&laquo; Previous","<").replace("Next &raquo;",">");
        },
      getUrl(p){
        var _url = getLocaleRoutePath('blog/page/'+p.label.toString().replace("&laquo; Previous",this.cpage - 1).replace("Next &raquo;",this.cpage + 1))
        var path = this.$route.path;
        if(path.indexOf('filter') !== -1){
          _url = _url + "/" + path.substring(path.indexOf('filter'));
        }
        if(this.$route.query.tag !== undefined){
          _url = _url + "?tag="+this.$route.query.tag;
        }
        _url = _url.replace('//', '/')
        return _url;
      }
    },
    mounted() {
      console.log(this.pages);
    }
}
</script>

<style scoped>
.paginator_block{
    display: flex;
    justify-content: center;
}
.btn-page{
    background-color: rgb(244, 239, 239);
    height: max-content;
    min-width: 40px;
    margin:5px;
    color:black;
    font-size:16px;
}
.btn-active{
    background-color: black !important;
    color:white !important;
}
.hide-link{
    display: none;
}
</style>
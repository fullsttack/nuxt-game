export default defineEventHandler(async (event) => {
    console.log(event);
    const query = getQuery(event)
    const blog_id = query.blog_id;
    var _burl = 'https://blogadmin.whatsgaming.net/';
    // if(process.env.NODE_ENV === 'development'){
    //     _burl = 'http://127.0.0.1:8000/';
    // }
    const res = await $fetch(_burl + 'api/comments',{
        method: 'POST',
        body: { blog_id : blog_id,current_page:1}
    });
    return res.data.comments.data;
})
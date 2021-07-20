{
    // method to submit new data of the form thru ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',                   //method type
                url: '/post/upload-post',       //place where to send
                data: newPostForm.serialize(),  //converts data into json
                success: function(data){
                   let newPost = newPostDom(data.data.post);
                   $('#post-list-container').prepend(newPost);
                   deletePost($(' .delete-post-button', newPost));
                }, error: function(err){
                    console.log(error.responseText);
                } 
            });
        });
    }

    let newPostDom = function(post){
        return $(`<li id = "post-${post._id}">
        <p>
        <small>${post.content}</small>
        <small><a class="delete-post-button" href = "/post/distroy/${post._id}" id="post-delete">Delete</a></small>
        <br>
        <small>${post.user.name}</small>
        </p>
    <div>
        <form action="/comment/create" method="POST">
                <input type="text" name="content" placeholder="Type comment here" required>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add Comment">
        </form>
        <div id="post-list-container">
            <ul>
            </ul>
        </div>
    </div>
    </li>`);
    }

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(err){
                    console.log(error.responseText);
                }
            })
        });
    }


    createPost();
}
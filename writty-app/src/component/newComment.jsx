const NewComment=(props)=>{
    let {handleSumit,handleInput,body}=props
    // console.log(body)
    return (   
        <div className="comment-form">
            <form onSubmit={handleSumit}>
                <textarea value={body} onChange={handleInput} name="comment" cols="30" rows="10" placeholder="Write a comment..." />
                <div>
                  <figure>
                    <img src={props.currentUser.image} alt="" />
                  </figure>
                <input type="submit" value="Post comment" />
                </div>
            </form>
            </div>
    )

}
export default NewComment
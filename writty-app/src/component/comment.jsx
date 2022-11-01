import { Link } from "react-router-dom";

const Comment =(props)=>{
// console.log(props)
let dl = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];
let ml = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let date = new Date(props.createdAt)
  return(
    <article>
    <h4>{props.body}</h4>
    <div>
<div>
    <figure>
        <img src={props.author.image} alt="author" />
    </figure>
    <h4>{props.author.username}</h4>
    <time>{dl[date.getDay()].slice(0, 3)} {ml[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</time>
</div>
    {
    props.user?
    <a onClick={props.handleDelete}><i class="fa-regular fa-trash-can"></i></a>:""
}
</div>
    </article>
  )
}

export default Comment
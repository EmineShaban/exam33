import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyToys } from "../api/data.js";
import { getUserData } from "../util.js";
import { toyPreview } from './common.js'


let myBooksTemplate = (toy) => html`

<section id="my-posts-page">
    <h1 class="title">My Posts</h1>
    <div class="my-posts">
        ${toy.length == 0 ?
               html`<h1 class="title no-posts-title">You have no posts yet!</h1>` :
               html`${toy.map(toyPreview)}`
        }
               </div>
</section>
`

export async function myPostPage(ctx) {
    let userData = getUserData()
    let books = await getMyToys(userData.id)
    ctx.render(myBooksTemplate(books))
}
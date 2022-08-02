import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllPets } from "../api/data.js";
import { petPreview } from './common.js'

let dashboardTemplate = (pet) => html`
       <section id="dashboard">
            <h2 class="dashboard-title">Services for every animal</h2>
            <div class="animals-dashboard"></div>
${pet.length == 0 ?
                html`<div><p class="no-pets">No pets in dashboard</p></div>` :
                html`${pet.map(petPreview)}`} 
                </div> </section>`

export async function dashboardPage(ctx) {
    let pet = await getAllPets()
    ctx.render(dashboardTemplate(pet))
}
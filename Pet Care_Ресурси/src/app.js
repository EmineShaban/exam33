import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { logoutB } from "./api/api.js";
import { getUserData } from './util.js';
import { loginPage } from "./views/login.js";
import { registerPage } from './views/register.js';
import { dashboardPage } from './views/dashboard.js';
import { homePage } from './views/home.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
// // import { searchPage } from './views/search.js';
import { detailsPage } from './views/details.js';
// import { myPostPage } from './views/myBook.js';

let root = document.getElementById('content')

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root)
    ctx.updateUserNav = updateUserNav()
    next()
}

function updateUserNav() {
    const user = getUserData()
    if (user) {
      document.querySelectorAll('.user').forEach(x => x.style.display = 'inline');
      document.querySelectorAll('.guest').forEach(x => x.style.display = 'none');
    } else {
      document.querySelectorAll('.user').forEach(x => x.style.display = 'none');
      document.querySelectorAll('.guest').forEach(x => x.style.display = 'inline');
    }
  }

document.getElementById('logoutBtn').addEventListener('click', (e) => {
    logoutB()
    updateUserNav()
    page.redirect('/')
})

page(decorateContext)
page('/login', loginPage)
page('/register', registerPage)
page('/', homePage)
page('/dashboard', dashboardPage)

page('/create-postcard', createPage)
page('/edit/:id', editPage)
// // page('/search', searchPage)
page('/details/:id', detailsPage)

updateUserNav()
page.start()
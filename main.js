const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const resourcesBox = $('#resources-box')
const tabs = $$('.category-tab-item')
const expandResourceDailog = $('#expand-resource-dialog')
// expandResourceDailog.showModal()
const baseUrl = 'https://6d3l73-8080.csb.app/resources'

filterByCategory()
handleCategoryTab()

function handleCategoryTab() {
    tabs.forEach((tab, index) => {
        tab.onclick = function() {
            $('.category-tab-item.active').classList.remove('active')
            this.classList.add('active')
            if (this.innerText === 'All') {
                filterByCategory()
            } else {
                filterByCategory(this.innerText)
            }
        }
    })
}

function filterByCategory(category) {
    let url = baseUrl;
    if (arguments.length == 1) {
        url += `?category=${category}`
    }
    fetch(url)
    .then(response => response.json())
    .then(data => {
        renderResources(data)
    })
}

function renderResources(resources) {
    let htmls = ''
        
    resources.map(function(resource) {
        htmls+= `
            <div class="card-container z-1 flex flex-col gap-16">
                <div class="card-inner text-center" style="background: var(--color-radial-gradient)">
                    <img src=${resource.image} alt="" style="max-height: 27rem; margin: 3.2rem auto">
                </div> 

                <div class="flex flex-col gap-48 card-content px-24">
                    <div>
                        <h4 class="mb-12">${resource.name}</h4>
                        <h6 class="mb-12 category-tag">${resource.category}</h6>
                        <div class="flex justify-between">`
        resource.tag.forEach(function(tag) {
            htmls += `<p>${tag}</p>`
            })

        htmls +=
                        `</div>
                    </div>

                    <div class="flex gap-16 mb-24">
                        <a href="${resource.link}" class="button button-filled flex-grow" target="_blank" rel="noopener noreferrer">Try it</a>
                        <button class="button button-outline" onclick=expandResource('${resource.id}')><span class="material-symbols-rounded">pan_zoom</span></button>
                    </div>
                </div>
            </div>
        `
    })
    resourcesBox.innerHTML = htmls
}

function expandResource(resourceId) {
    let url = baseUrl + `?id=${resourceId}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let htmls = `
        <div class="flex gap-24 flex-wrap dialog-container relative">
            <div class="card-inner text-center" style="background: var(--color-radial-gradient); margin: 0;">
                <img src="${data[0].image}" alt="" style="max-height: 27rem; margin: 3.2rem 3.2rem">
            </div>
            <div class="relative flex flex-col flex-grow justify-between">
                <div class="flex flex-col gap-24">
                    <h4 class="text-primary">${data[0].name}</h4>
                    <div>
                        <p class="category-tag">${data[0].category}</p>
                    </div>
                    <p>${data[0].description}</p>
                    <div class="flex gap-48 tag">`
        data[0].tag.forEach(function(tag) {
            htmls += `<p>${tag}</p>`
            })
        htmls += `
                    </div>
                </div>
                <div class="flex">
                    <a href="${data[0].link}" class="button button-filled flex-grow" target="_blank" rel="noopener noreferrer">Try it</a>
                </div>
            </div>
            <button class="button button-outline absolute bottom-40 right-40" onclick=closeResourceDialog()><span class="material-symbols-rounded">close</span></button>
        </div>`
        expandResourceDailog.innerHTML = htmls
        showResourceDialog()
    })

}

function showResourceDialog() {
    expandResourceDailog.showModal()
}

function closeResourceDialog() {
    expandResourceDailog.close()
}

expandResourceDailog.addEventListener("click", (event) => {
    let dialogContainer = $('.dialog-container')
    if(!dialogContainer.contains(event.target)) {
        expandResourceDailog.close()
    }
})
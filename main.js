const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const resourcesBox = $('#resources-box')
const tabs = $$('.category-tab-item')

const res = 'http://localhost:3000/resources/'

filter()
handleCategoryTab()

function handleCategoryTab() {
    tabs.forEach((tab, index) => {
        tab.onclick = function() {
            $('.category-tab-item.active').classList.remove('active')
            this.classList.add('active')
            if (this.innerText === 'All') {
                filter()
            } else {
                filter(this.innerText)
            }
        }
    })
}

function filterByCategory(resources ,category) {
    let filteredResources = resources.filter(function(resource) {
        return resource.category === `${category}`
    })
    return filteredResources
}

function renderResources(resources, num) {
    let htmls = ''
        
    resources.map(function(resource) {
        htmls+= `
            <div class="card-container z-1 flex flex-col gap-16">
                <div class="card-inner text-center" style="background: var(--color-radial-gradient)">
                    <img src=${resource.image} alt="" style="max-height: 27rem; margin: 3.2rem auto">
                </div> 

                <div class="flex flex-col gap-24 card-content px-24">
                    <div>
                        <h4 class="mb-12">${resource.name}</h4>
                        <h6 class="mb-12">${resource.category}</h6>
                        <div class="flex justify-between">`
        resource.tag.forEach(function(tag) {
            htmls += `<p>${tag}</p>`
            })

        htmls +=
                        `</div>
                    </div>

                    <div class="flex gap-16 mb-24">
                        <a href="${resource.link}" class="button button-filled flex-grow" target="_blank" rel="noopener noreferrer">Try it</a>
                        <button class="button button-outline"><span class="material-symbols-rounded">pan_zoom</span></button>
                    </div>
                </div>
            </div>
        `
    })
    resourcesBox.innerHTML = htmls
}

function filter(category) {
    fetch(res)
    .then(response => response.json())
    .then(data => {
        if (arguments.length != 1) {
            renderResources(data, data.length)
        } else {
            let filteredResources = filterByCategory(data, category)
            renderResources(filteredResources, filteredResources.length)
        }
    })
}
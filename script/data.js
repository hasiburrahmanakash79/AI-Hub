const loadData= async(seeMoreBTN)=>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url)
    const data = await res.json();

    loadingSpinner(true)
    displayData(data.data.tools, seeMoreBTN)
    

}

// sort button make sorting card
const sortButton = document.getElementById('BTN-sort') 
sortButton.addEventListener('click', function(){
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res => res.json())
    .then(data => sortData(data.data.tools))
})
function sortData(data){
    let seeMore = true
    const filterData = data.sort((a, b) => new Date(a.published_in) - new Date(b.published_in))
    console.log(filterData)
    displayData(filterData, seeMore)
    loadingSpinner(false)
}


// load data to click see more button 
const displayData = (tools, seeMoreBTN) =>{
    console.log(tools);

    // by default show 6 card for 6 tool 
    if(!seeMoreBTN){
        tools= tools?.slice(0, 6) 
    }
    else{
        tools = tools
        const seeMoreBTN = document.getElementById('show-all');
        seeMoreBTN.classList.add('d-none')
        loadingSpinner(true)
    }

    const toolContainer = document.getElementById('tool-items')
    toolContainer.innerHTML="";

    // display all tools card 
    for(tool of tools){
        const toolDiv = document.createElement('div')
        toolDiv.innerHTML=`
        <div class="col">
            <div class="card h-100" style="max-width: 540px;">
            <img src="${tool?.image}" class="rounded card-img-top p-3" alt="image">
            <div class="card-body">
                <h4 class="card-title fw-semibold">Features</h4>
                <ol>
                    <li>${tool?.features[0] ? tool?.features[0] : "No Data Found"}</li>
                    <li>${tool?.features[1] ? tool?.features[1] : "No Data Found"}</li>
                    <li>${tool?.features[2] ? tool?.features[2] : "No Data Found"}</li>
                </ol>
                <p class="card-text"></p>
                </div>
                <div class="p-4">
                <hr class="my-0 mb-3">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h4>${tool?.name}</h4>
                        <div class="d-flex gap-2 align-items-center">
                            <i class="fa-sharp fa-regular fa-calendar-days"></i>
                            <p class="m-0">${tool?.published_in}</p>
                        </div>
                    </div>
                    <div>
                        <button
                        id=${tool?.id}
                        onClick="modalBTNClick(this.id)"
                        
                        class="btn border-0 rounded-circle p-3" 
                        style="background-color: rgba(253, 228, 231, 0.562);"
                        data-bs-toggle="modal" 
                        data-bs-target="#toolsDetail"
                        >
                        <i class="fa-solid fa-arrow-right fa-lg rounded-5" style="color: #EB5757;"></i>
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        `
        toolContainer.appendChild(toolDiv)
    }
    loadingSpinner(false)
}
// spinner for loading 
function loadingSpinner(isLoading){
    const loadingField = document.getElementById('Loading')
    if(isLoading){
        loadingField.classList.remove('d-none')
    }
    else{
        loadingField.classList.add('d-none')
    }
}

// see more button click function 
document.getElementById('btn-see-more').addEventListener('click',function(){
    let seeMore = true
    tools = loadData(seeMore)
    loadingSpinner(false)
})

// modal BTN 
function modalBTNClick(buttonId) {
    modalDetails(buttonId)
    console.log(buttonId);
  }


// modal details section 
const modalDetails = async(id) =>{
    const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data?.data);
}

const displayDetails =(tool)=>{
    console.log(tool);
    const modalContainer = document.getElementById('modalDetails')
    modalContainer.innerHTML = "";

    // display modal details in innerHTML 
    const modalDiv = document.createElement('div')
    modalDiv.classList.add('modal-content')
    modalDiv.innerHTML=`
        <div class="modal-body d-flex justify-content-end">
            <button type="button" class="btn-close rounded-circle p-2" style="background-color: #EB5757; " data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-xxl-5">
            <div class="d-md-flex gap-4">
                <div class="w-sm-full w-md-50 border border-danger-subtle shadow rounded-4 p-4" style="background-color: rgba(235, 87, 87, 0.05);">
                    <h3 class="fw-bold">${tool?.description ? tool?.description : "No Data Found"}</h3>
                    <div class="d-flex justify-content-evenly align-items-center ">
                        <h5 class="fw-bold price text-center text-success rounded-4 bg-white">${tool?.pricing ? tool?.pricing[0]?.plan : "Free"} ${tool?.pricing ? tool?.pricing[0]?.price : " of cost"}</h5>
                        <h5 class="fw-bold price text-center text-warning rounded-4 bg-white">${tool?.pricing ? tool?.pricing[1]?.plan : "Free"} ${tool?.pricing ? tool?.pricing[1]?.price : " of cost"}</h5>
                        <h5 class="fw-bold price text-center text-danger rounded-4 bg-white"> ${tool?.pricing ? tool?.pricing[2]?.plan : "Enterprise"} ${tool?.pricing ? tool?.pricing[2]?.price : "Contact us for pricing"}</h5>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div>
                            <h4 class="card-title fw-semibold">Features</h4>
                            <ul>
                                <li>${tool?.features[1]?.feature_name ? tool?.features[1]?.feature_name : "No Data Found"}</li>
                                <li>${tool?.features[2]?.feature_name ? tool?.features[2]?.feature_name : "No Data Found"}</li>
                                <li>${tool?.features[3]?.feature_name ? tool?.features[3]?.feature_name : "No Data Found"}</li>
                            </ul>   
                        </div>
                        <div>
                            <h4 class="card-title fw-semibold">Integrations</h4>
                            <ul>
                                <li>${tool?.integrations ? tool?.integrations[0] : "No Data Found"}</li>
                                <li>${tool?.integrations === undefined ? tool?.integrations[1] : "No Data Found"}</li>
                                <li>${tool?.integrations === undefined ? tool?.integrations[2] : "No Data Found"}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="card w-sm-full w-md-50 shadow rounded-4">
                    <img src="${tool.image_link[0]}" class="img-fluid p-3" alt="...">

                    
                    <p class="${tool?.accuracy?.score === null ? "d-none" : "px-3 py-1 text-white rounded-2"}" style="position: absolute; top: 30px; right: 30px; background-color: #EB5757;">${tool?.accuracy?.score*100}% accuracy</p>
                    <div class="card-body">
                        <h4 class="text-center fw-medium">${tool?.input_output_examples ? tool?.input_output_examples[0]?.input : "No question found"}</h4>
                        <p class="card-text text-center">${tool?.input_output_examples ? tool?.input_output_examples[0]?.output : "No Answer found"}</p>
                    </div>
                </div>
            </div>
        </div>
        `
        modalContainer.appendChild(modalDiv) 
    }
    
loadData()
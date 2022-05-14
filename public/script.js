let update
let error
let no;
const urlparams = new URLSearchParams(window.location.search);
const _data = {location: urlparams.get("city"), type: urlparams.get("type")}

document.getElementById("heading").innerHTML = `${urlparams.get("city").toUpperCase()}'S ${urlparams.get("type").toUpperCase()}`

async function getupdates(){
    await fetch('/data', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(_data),
      })
      .then(response => response.json())
      .then(data => {
        update = data
        error = false
      })
      .catch((error) => {
          error = true
        console.error('Error:', error);
      });
}

const candidate_html = `<div class="candidate">
    <img src="images/default.jpg" alt="NotFound" class="candidateimage" id="imgloc">
    <h1>Candidate Name</h2>
    <h2>NoVotes</h1>
</div>`;

function createupdate(){
    getupdates().then(()=>{
        candiarray = document.getElementById("candi")
        no = update.length
        if (error == false){
            for (let index = 0; index < no; index++) {
                candiarray.innerHTML += candidate_html
                const element = candiarray.children[index];
                element.children[1].innerText = update[index].name.toUpperCase()
                element.children[0].src = "/images/" + update[index].name + ".jpg";
                element.children[2].innerText = "NoVotes: " +update[index].votes
            }
        }
        else{
            console.log("error wtf!")
        }
    });
};

function updatedata(){
    getupdates().then(()=>{
        candiarray = document.getElementById("candi")
        if (error == false){
            for (let index = 0; index < no; index++) {
                const element = candiarray.children[index];
                // element.children[1].innerText = update[index].name
                // element.children[0].src = "/images/" + update[index].name + ".jpg";
                let oldvotes = parseInt(element.children[2].innerText.slice(9))
                let newvotes = parseInt(update[index].votes)
                console.log(oldvotes, newvotes);
                if (oldvotes !== newvotes){
                    if (oldvotes < newvotes){
                        while(oldvotes != newvotes){
                            oldvotes += 1;
                            //setInterval(()=>{element.children[2].innerText = "NoVotes: " + toString(oldvotes)}, 300)
                        }
                    }
                    else{
                        while(oldvotes !== newvotes){
                            oldvotes -= 1;
                            setInterval(()=>{element.children[2].innerText = "NoVotes: " + toString(oldvotes)}, 300)
                        }
                    }
                }
            }
        }
        else{
            console.log("error wtf!")
        }
    })
}

createupdate()
setInterval(()=>{updatedata()}, 3000)
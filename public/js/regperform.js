const regperform = document.querySelector(".regperform")

console.log("reg performs");
console.log(regperform)


regperform.addEventListener("submit",async(e)=>{
    console.log("subimit rfefcsdnn")
    e.preventDefault()

    let name = regperform.name.value
    let mobile = regperform.mobile.value
    let location = regperform.location.value
    let desc = regperform.desc.value
    let category = regperform.category.value
    let upperfees = regperform.upperfees.value
    let lowerfees = regperform.lowerfees.value

    console.log(name);
    

    try {
        console.log("trying");
        const res = await fetch("/regperform",{
            method:"POST",
            body: JSON.stringify({name,mobile,location,desc,category,upperfees,lowerfees}),
            headers:{"Content-type":'application/json'} 
        })
        const data = await res.json()
        if(!data._id)
        {
           console.log("no user found");
        }
        else
        {
            console.log("done");
            window.location.assign("/")
        }
    } catch (error) {
        console.log(error)
    }
})
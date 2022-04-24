const bookingform = document.querySelector(".bookingform")

console.log("booking form");
console.log(bookingform);


bookingform.addEventListener("submit",async(e)=>{
    e.preventDefault()


    let description = bookingform.description.value
    let bookingdate = bookingform.bookingdate.value
    let action = bookingform.getAttribute("action")
    console.log(action,typeof(action))

    try {
        const res = await fetch(action,{
            method:"POST",
            body: JSON.stringify({description,bookingdate}),
            headers:{"Content-type":'application/json'} 
        })
        const data = await res.json()
        if(!data._id)
        {
           console.log("user does not exist");
        }
        else
        {
            location.assign("/dashboard")
        }
    } catch (error) {
        console.log("Hi bhai error")
        console.log(error)
    }
})
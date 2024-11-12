
document.addEventListener("DOMContentLoaded", function() {
    
    const userId = localStorage.getItem("selectedUserId");

    if (userId) {
        
        fetch(`https://localhost:7257/api/Student/${userId}`)
            .then(response => response.json())
            .then(user => {
                
                document.querySelector(".main-body h4").innerText = user.name;
                document.querySelector(".main-body .text-secondary.mb-1").innerText = user.jobTitle || 'Full stack Developer';
                document.querySelector(".main-body .text-muted.font-size-sm").innerText = user.location || 'Islamabad';
                document.querySelector("input[readonly][value='John Doe']").value = user.name;
                document.querySelector("input[readonly][value='john@example.com']").value = user.email;
                document.querySelector("input[readonly][value='(239) 816-9029']").value = user.phone || '03488888888';
                document.querySelector("input[readonly][value='(320) 380-4539']").value = user.mobile || '051121212';
                document.querySelector("input[readonly][value='Bay Area, San Francisco, CA']").value = user.address || 'G9-4 Islamabad';
            })
            .catch(error => console.error("Error fetching user details:", error));
    } else {
        console.error("No user ID found.");
    }
});


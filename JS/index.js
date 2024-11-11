document.addEventListener('DOMContentLoaded', function() {
  const apiCoursesUrl = 'https://localhost:7257/api/Course';
  const apiTeachersUrl = 'https://localhost:7257/api/Teacher';
  const apiStudentsUrl = 'https://localhost:7257/api/Student';

  const token = localStorage.getItem("token");
  console.log(token)

  if (!token) {
      alert("You are not logged in. Please log in to access the data.");
      
      window.location.href = "login.html"; 
      return;
  }

  async function fetchData() {
    try {
      const [coursesResponse, teachersResponse, studentsResponse] = await Promise.all([
        fetch(apiCoursesUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        }),
        fetch(apiTeachersUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        }),
        fetch(apiStudentsUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        })
      ]);
      
      const coursesData = await coursesResponse.json();
      const teachersData = await teachersResponse.json();
      const studentsData = await studentsResponse.json();

      console.log("Courses Data:", coursesData);
      console.log("Teachers Data:", teachersData);
      console.log("Students Data:", studentsData);

      createTeacherChart(teachersData.length || 0);
      createStudentChart(studentsData.length || 0);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function createStudentChart(studentCount) {
    const ctx = document.getElementById('studentsChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Students'],
        datasets: [{
          data: [studentCount],
          backgroundColor: ['rgba(114, 162, 235, 0.6)']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        }
      }
    });
  }

  function createTeacherChart(teacherCount) {
    const ctx = document.getElementById('teachersChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Teachers'],
        datasets: [{
          data: [teacherCount],
          backgroundColor: ['rgba(255, 99, 132, 0.6)'],
          borderWidth: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        }
      }
    });
  }

  async function fetchCoursesAndTeachers() {
      const apiCoursesUrl = 'https://localhost:7257/api/Course';
      const apiTeachersUrl = 'https://localhost:7257/api/Teacher';
  
      try {
          const [coursesResponse, teachersResponse] = await Promise.all([
              fetch(apiCoursesUrl, {
                  method: 'GET',
                  headers: {
                      'Authorization': `Bearer ${token}` 
                  }
              }),
              fetch(apiTeachersUrl, {
                  method: 'GET',
                  headers: {
                      'Authorization': `Bearer ${token}` 
                  }
              })
          ]);
  
          const coursesData = await coursesResponse.json();
          const teachersData = await teachersResponse.json();
  
          createCourseChart(coursesData, teachersData);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }
  
  function createCourseChart(coursesData, teachersData) {
      
      const teacherMap = {};
      teachersData.forEach(teacher => {
          teacherMap[teacher.teacherId] = teacher.name; 
      });
  
      const courseCountMap = {};
      
      coursesData.forEach(course => {
          const teacherName = teacherMap[course.teacherId]; 
          if (teacherName) {
              if (!courseCountMap[teacherName]) {
                  courseCountMap[teacherName] = 0; 
              }
              courseCountMap[teacherName]++; 
          }
      });
  
      const teacherNames = Object.keys(courseCountMap);
      const courseCounts = teacherNames.map(teacher => courseCountMap[teacher]);
  
      const ctx = document.getElementById('coursesChart').getContext('2d');
      new Chart(ctx, {
          type: 'bar',
          data: {
              labels: teacherNames,
              datasets: [{
                  label: 'Number of Courses Taught',
                  data: courseCounts,
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 0.3
              }]
          },
          options: {
              responsive: true,
              scales: {
                  y: { beginAtZero: true }
              }
          }
      });
  }

  fetchCoursesAndTeachers();
  fetchData();
});


    function validateLoginForm(event) {
      event.preventDefault(); 

      const username = document.getElementById("loginusername").value;
      const password = document.getElementById("loginPassword").value;

      if (!username || !password) {
        alert("Please fill in all fields.");
        return false;
      }

      loginUser(username, password);
      return false;
    }


    async function loginUser(username, password) {
      const response = await fetch("https://localhost:7257/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token.result; 

        localStorage.setItem("token", token); 
        window.location.href = "index.html"; 
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Login failed");
      }
    }


function validateRegistrationForm(event) {
  event.preventDefault(); 

  const username = document.getElementById("regUsername").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  
  const isAdmin = document.getElementById("isAdmin").checked;
  const role = isAdmin ? "Admin" : "User";

  if (!username || !email || !password) {
    alert("Please fill in all fields.");
    return false;
  }

  registerUser(username, email, password, role);
  return false;
}

async function registerUser(username, email, password, role) {
  const response = await fetch("https://localhost:7257/api/auth/register?role=" + role, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  });

  if (response.ok) {
    alert("Registration successful. Please login.");
    document.getElementById("check").checked = false; 
  } else {
    const errorData = await response.json();
    alert(errorData.message || "Registration failed");
  }
}


 
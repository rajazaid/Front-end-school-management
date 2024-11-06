document.addEventListener('DOMContentLoaded', function() {
    const apiCoursesUrl = 'https://localhost:7257/api/Courses';
    const apiTeachersUrl = 'https://localhost:7257/api/Teachers';
    const apiStudentsUrl = 'https://localhost:7257/api/Students';

    async function fetchData() {
      try {
        const [coursesResponse, teachersResponse, studentsResponse] = await Promise.all([
          fetch(apiCoursesUrl),
          fetch(apiTeachersUrl),
          fetch(apiStudentsUrl)
        ]);
        
        const coursesData = await coursesResponse.json();
        const teachersData = await teachersResponse.json();
        const studentsData = await studentsResponse.json();

        console.log("Courses Data:", coursesData);
        console.log("Teachers Data:", teachersData);
        console.log("Students Data:", studentsData);
        
        createStudentChart(studentsData.length || 0);
        createTeacherChart(teachersData.length || 0);
        createCourseChart(coursesData.map(course => course.title));
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
        const apiCoursesUrl = 'https://localhost:7257/api/Courses';
        const apiTeachersUrl = 'https://localhost:7257/api/Teachers';
    
        try {
            const [coursesResponse, teachersResponse] = await Promise.all([
                fetch(apiCoursesUrl),
                fetch(apiTeachersUrl)
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
    
    // Call the function to fetch data and create the chart
    fetchCoursesAndTeachers();
    

    fetchData();
  });


  function validateLoginForm() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
      alert('Please fill in all fields.');
      return false; 
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    if (email!="zaidkhan7150@gmail.com" && password != "1234") {
      alert("Wrong credentials..");
      return false;
    }
    window.location.href = "index.html"; 
    return false; 
  }

  function validateRegistrationForm() {
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (!email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return false;
    }
    
    return true; 
  }

 
let currentStudent;
 const token = localStorage.getItem("token");

function fetchStudents() {
    $.ajax({
        url: 'https://localhost:7257/api/Student',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` 
          },
        success: function(data) {
            $('#user-list').empty();
            data.forEach(student => {
                $('#user-list').append(`
                    <tr>
                        <td>${student.studentId}</td>
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                        <td>
                            <button class="btn btn-primary btn-md" onclick="openEditModal(${student.studentId})">Edit</button>
                            <button class="btn btn-danger btn-md" onclick="deleteStudent(${student.studentId})">Delete</button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function(error) {
            console.error('Error fetching students:', error);
            alert('Failed to fetch students.');
        }
    });
}

function openEditModal(id) {
    $.ajax({
        url: `https://localhost:7257/api/Student/${id}`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` 
          },
        success: function(student) {
            currentStudent = student;
            $('#studentName').val(student.name);
            $('#studentEmail').val(student.email);
            $('#editStudentModal').modal('show');
        },
        error: function(error) {
            console.error('Error fetching student details:', error);
            alert('Failed to fetch student details.');
        }
    });
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        $.ajax({
            url: `https://localhost:7257/api/Student/${id}`,
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}` 
              },
            success: function() {
                alert('Student deleted successfully.');
                fetchStudents();
            },
            error: function(error) {
                console.error('Error deleting student:', error);
                alert('Failed to delete student.');
            }
        });
    }
}

$(document).ready(function() {
    fetchStudents();

    $('#editStudentForm').on('submit', function(e) {
        e.preventDefault();
        
        const updatedStudent = {
            ...currentStudent,
            name: $('#studentName').val(),
            email: $('#studentEmail').val()
        };

        $.ajax({
            url: `https://localhost:7257/api/Student/${updatedStudent.studentId}`,
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}` 
              },
            contentType: 'application/json',
            data: JSON.stringify(updatedStudent),
            success: function() {
                alert('Student updated successfully.');
                $('#editStudentModal').modal('hide');
                fetchStudents();
            },
            error: function(error) {
                console.error('Error updating student:', error);
                alert('Failed to update student.');
            }
        });
    });
});

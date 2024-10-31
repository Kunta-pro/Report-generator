// Initialize Supabase
const SUPABASE_URL = 'https://your-supabase-url.supabase.co';
const SUPABASE_KEY = 'your-supabase-public-api-key';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Fetch and display report card data
async function fetchReportCard(studentName) {
    const { data, error } = await supabase
        .from('report_cards') // replace 'report_cards' with your table name
        .select('*')
        .eq('name', studentName)
        .single();

    if (error) {
        console.error("Error fetching data:", error);
        alert("Student not found.");
        return;
    }

    // Update report card fields
    document.getElementById("studentName").textContent = data.name;
    document.getElementById("studentID").textContent = data.student_id;
    document.getElementById("studentClass").textContent = data.class;
    document.getElementById("term").textContent = data.term;
    document.getElementById("agrGrade").textContent = data.agriculture_grade;
    document.getElementById("agrDesc").textContent = data.agriculture_desc;
    document.getElementById("agrTeacher").textContent = data.agriculture_teacher;
    // Add similar updates for other subjects...
    document.getElementById("achievement").textContent = data.overall_achievement;
    document.getElementById("classTeacherRemarks").textContent = data.class_teacher_remarks;
    document.getElementById("headTeacherRemarks").textContent = data.head_teacher_remarks;
}

// Print the report card
function printReportCard() {
    window.print();
}

// Fetch and display the report card based on name input (for testing, hardcoded name here)
fetchReportCard('John Doe'); // Replace 'John Doe' with the student's name input

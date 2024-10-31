// Initialize Supabase
const SUPABASE_URL = 'https://your-supabase-url.supabase.co';
const SUPABASE_KEY = 'your-supabase-public-api-key';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Generate report based on student name input
async function generateReport() {
    const studentName = document.getElementById("studentNameInput").value;
    if (!studentName) {
        alert("Please enter the student's name.");
        return;
    }

    const { data, error } = await supabase
        .from('report_cards') // replace 'report_cards' with your table name
        .select('*')
        .eq('name', studentName)
        .single();

    if (error || !data) {
        console.error("Error fetching data:", error);
        alert("Student not found.");
        return;
    }

    // Populate the report card
    document.getElementById("studentName").textContent = data.name;
    document.getElementById("studentID").textContent = data.student_id;
    document.getElementById("studentClass").textContent = data.class;
    document.getElementById("term").textContent = data.term;
    document.getElementById("achievement").textContent = data.overall_achievement;
    document.getElementById("classTeacherRemarks").textContent = data.class_teacher_remarks;
    document.getElementById("headTeacherRemarks").textContent = data.head_teacher_remarks;

    const subjectTable = document.getElementById("subjectTable");
    subjectTable.innerHTML = ""; // Clear any existing table rows

    // Determine if O Level or A Level and populate accordingly
    if (data.level === "O Level") {
        subjectTable.innerHTML = `
            <tr>
                <th>Subject</th>
                <th>Grade</th>
                <th>Grade Descriptor</th>
                <th>Teacher</th>
            </tr>
            ${generateSubjectRow("Agriculture", data.agriculture_grade, data.agriculture_desc, data.agriculture_teacher)}
            ${generateSubjectRow("Biology", data.biology_grade, data.biology_desc, data.biology_teacher)}
            ${generateSubjectRow("Chemistry", data.chemistry_grade, data.chemistry_desc, data.chemistry_teacher)}
            ${generateSubjectRow("CRE", data.cre_grade, data.cre_desc, data.cre_teacher)}
            ${generateSubjectRow("English", data.english_grade, data.english_desc, data.english_teacher)}
            ${generateSubjectRow("Geography", data.geography_grade, data.geography_desc, data.geography_teacher)}
            ${generateSubjectRow("History", data.history_grade, data.history_desc, data.history_teacher)}
            ${generateSubjectRow("Mathematics", data.mathematics_grade, data.mathematics_desc, data.mathematics_teacher)}
            ${generateSubjectRow("Physics", data.physics_grade, data.physics_desc, data.physics_teacher)}
        `;
    } else if (data.level === "A Level") {
        subjectTable.innerHTML = `
            <tr>
                <th>Subject</th>
                <th>Grade</th>
                <th>Teacher</th>
            </tr>
            ${generateSubjectRow("Agriculture", data.agriculture_grade, "", data.agriculture_teacher)}
            ${generateSubjectRow("Biology", data.biology_grade, "", data.biology_teacher)}
            ${generateSubjectRow("Chemistry", data.chemistry_grade, "", data.chemistry_teacher)}
            ${generateSubjectRow("Mathematics", data.mathematics_grade, "", data.mathematics_teacher)}
            ${generateSubjectRow("Physics", data.physics_grade, "", data.physics_teacher)}
        `;
        // Add Points row for A Level
        subjectTable.innerHTML += `<tr><td colspan="3"><strong>Points:</strong> ${data.points}</td></tr>`;
    }

    document.getElementById("reportCard").style.display = "block";
}

// Helper function to create subject row
function generateSubjectRow(subject, grade, desc, teacher) {
    return `
        <tr>
            <td>${subject}</td>
            <td>${grade}</td>
            <td>${desc}</td>
            <td>${teacher}</td>
        </tr>
    `;
}

// Print the report card
function printReportCard() {
    window.print();
}

function generateCertificate() {
    // Get input values from form
    const recipientName = document.getElementById("recipientName").value;
    const assignmentScore = document.getElementById("assignmentScore").value;
    const quizScore = document.getElementById("quizScore").value;
    const liveTestScore = document.getElementById("liveTestScore").value;
    const ctfScore = document.getElementById("ctfScore").value;
    const studentId = document.getElementById("studentId").value;
    const courseDuration = document.getElementById("courseDuration").value;

    // Update the certificate with form values
    document.getElementById("displayRecipientName").textContent = recipientName;
    document.getElementById("displayRecipientStrong").textContent = recipientName;
    document.getElementById("displayAssignmentScore").textContent = `${assignmentScore}%`;
    document.getElementById("displayQuizScore").textContent = `${quizScore}%`;
    document.getElementById("displayLiveTestScore").textContent = `${liveTestScore}%`;
    document.getElementById("displayCtfScore").textContent = `${ctfScore}%`;
    document.getElementById("displayStudentId").textContent = `STUDENT ID: ${studentId}`;
    document.getElementById("displayCourseDuration").textContent = `COURSE DURATION: ${courseDuration}`;
}
const generatePDF = async (name) =>{
    const {PDFDocument , rgb} = PDFLib;
    const exBytes = await fetch("./certificate.pdf").then(res=>
        res.arrayBuffer());
    const exFont = await fetch("./Sanchez-Regular.ttf").then(res => {
        return res.arrayBuffer();
    });

    

    



    const pdfDoc = await PDFDocument.load(exBytes);
    pdfDoc.registerFontkit(fontkit);
    const myfont = await pdfDoc.embedFont(exFont);

    const pages = pdfDoc.getPages();
    const firstPg = pages[0];

    firstPg.drawText(name,{
        x: 60,
        y: 285,
        size: 58,
        font: myfont,
        
        
    })
    const uri = await pdfDoc.saveAsBase64({dataUri : true});
    window.open(uri);
    saveAs(uri,"Certificate.pdf", {autoBom : true})
    //document.querySelector("#mypdf").src = uri;

};
const submitButton = document.getElementById("submit");
const inputVal = document.querySelector("#name")
submitButton.addEventListener("click",()=>{

    const val = inputVal.value;
    generatePDF(val);
    
});

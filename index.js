document.addEventListener('DOMContentLoaded', function() {
    // Get all form elements
    let fullName = document.querySelector('#fullName');
    let profession = document.querySelector('#profession');
    let photo = document.querySelector('#photo');
    let email = document.querySelector('#email');
    let phone = document.querySelector('#phone');
    let location = document.querySelector('#location');
    let summary = document.querySelector('#summary');
    let workExperience = document.querySelector('#workExperience');
    let addWorkExperience = document.querySelector('#addWorkExperience');
    let education = document.querySelector('#education');
    let addEducation = document.querySelector('#addEducation');
    let skills = document.querySelector('#skills');
    let generateButton = document.querySelector('#generateCV');
    let cvModal = new bootstrap.Modal(document.getElementById('cvModal'));

    // Add new work experience section
    addWorkExperience.addEventListener('click', function() {
        let newWorkSection = document.querySelector('.experience-entry').cloneNode(true);
        
        let inputs = newWorkSection.querySelectorAll('input, textarea');
        for(let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
        
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm mt-2';
        
        deleteButton.onclick = function() {
            this.parentElement.remove();
        };
        
        newWorkSection.appendChild(deleteButton);
        workExperience.insertBefore(newWorkSection, addWorkExperience);
    });

    // Add new education section
    addEducation.addEventListener('click', function() {
        let newEduSection = document.querySelector('.education-entry').cloneNode(true);
        
        let inputs = newEduSection.querySelectorAll('input');
        for(let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
        
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm mt-2';
        
        deleteButton.onclick = function() {
            this.parentElement.remove();
        };
        
        newEduSection.appendChild(deleteButton);
        education.insertBefore(newEduSection, addEducation);
    });

    // Generate CV when button is clicked
    generateButton.addEventListener('click', function() {
        let cvData = {
            personalInfo: {
                name: fullName.value,
                profession: profession.value,
                photo: photo.files[0]
            },
            contactInfo: {
                email: email.value,
                phone: phone.value,
                location: location.value
            },
            summary: summary.value,
            work: [],
            education: [],
            skills: skills.value.split(',')
        };

        let workSections = document.querySelectorAll('.experience-entry');
        for(let i = 0; i < workSections.length; i++) {
            let work = {
                jobTitle: workSections[i].querySelector('.job-title').value,
                company: workSections[i].querySelector('.company').value,
                startDate: workSections[i].querySelector('.work-start-date').value,
                endDate: workSections[i].querySelector('.work-end-date').value,
                responsibilities: workSections[i].querySelector('.responsibilities').value
            };
            cvData.work.push(work);
        }

        let eduSections = document.querySelectorAll('.education-entry');
        for(let i = 0; i < eduSections.length; i++) {
            let education = {
                degree: eduSections[i].querySelector('.degree').value,
                school: eduSections[i].querySelector('.school').value,
                startDate: eduSections[i].querySelector('.edu-start-date').value,
                endDate: eduSections[i].querySelector('.edu-end-date').value
            };
            cvData.education.push(education);
        }

        // Generate CV HTML
        let cvHTML = `
            <div class="cv-preview">
                <div class="personal-info mb-4">
                    <h2>${cvData.personalInfo.name}</h2>
                    <p class="text-muted">${cvData.personalInfo.profession}</p>
                </div>

                <div class="contact-info mb-4">
                    <h4>Contact Information</h4>
                    <p>Email: ${cvData.contactInfo.email}</p>
                    <p>Phone: ${cvData.contactInfo.phone}</p>
                    <p>Location: ${cvData.contactInfo.location}</p>
                </div>

                <div class="summary mb-4">
                    <h4>Professional Summary</h4>
                    <p>${cvData.summary}</p>
                </div>

                <div class="work-experience mb-4">
                    <h4>Work Experience</h4>
                    ${cvData.work.map(work => `
                        <div class="work-entry mb-3">
                            <h5>${work.jobTitle} at ${work.company}</h5>
                            <p class="text-muted">${work.startDate} - ${work.endDate}</p>
                            <p>${work.responsibilities}</p>
                        </div>
                    `).join('')}
                </div>

                <div class="education mb-4">
                    <h4>Education</h4>
                    ${cvData.education.map(edu => `
                        <div class="education-entry mb-3">
                            <h5>${edu.degree}</h5>
                            <p>${edu.school}</p>
                            <p class="text-muted">${edu.startDate} - ${edu.endDate}</p>
                        </div>
                    `).join('')}
                </div>

                <div class="skills">
                    <h4>Skills</h4>
                    <p>${cvData.skills.join(', ')}</p>
                </div>
            </div>
        `;

        // Display CV in modal
        document.getElementById('cvPreview').innerHTML = cvHTML;
        cvModal.show();
    });

    // Download CV functionality
    document.getElementById('downloadCV').addEventListener('click', function() {
        let cvContent = document.getElementById('cvPreview').innerHTML;
        let blob = new Blob([`
            <html>
                <head>
                    <title>My CV</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
                </head>
                <body class="p-4">
                    ${cvContent}
                </body>
            </html>
        `], { type: 'text/html' });
        
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'my-cv.html';
        link.click();
    });
});
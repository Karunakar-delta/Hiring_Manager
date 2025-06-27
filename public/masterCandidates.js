function updateCandidate(applicantId) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login.html";
    return;
  }

  const modal = document.getElementById("updateCandidateModal");
  const closeButton = document.querySelector(".close-button");

  // Get the applicant's name and populate the modal fields
  console.log(applicantId);
  const applicantName = document.getElementById(`applicantName-${applicantId}`).value;
  document.getElementById("applicantNameDisplay").innerText = `Applicant Name: ${applicantName}`;
  document.getElementById("profileOwner").value=document.getElementById(`profileOwner-${applicantId}`).value;
  document.getElementById("applicantName").value = applicantName;
  document.getElementById("applicantPhone").value = document.getElementById(`applicantPhone-${applicantId}`).value;
  document.getElementById("applicantEmail").value = document.getElementById(`applicantEmail-${applicantId}`).value;
  document.getElementById("currentCompany").value = document.getElementById(`currentCompany-${applicantId}`).value;
  document.getElementById("candidateWorkLocation").value = document.getElementById(`candidateWorkLocation-${applicantId}`).value;
  document.getElementById("nativeLocation").value = document.getElementById(`nativeLocation-${applicantId}`).value;
  document.getElementById("qualification").value = document.getElementById(`qualification-${applicantId}`).value;
  document.getElementById("experience").value = document.getElementById(`experience-${applicantId}`).value;
  document.getElementById("skills").value = document.getElementById(`skills-${applicantId}`).value;
  document.getElementById("noticePeriod").value = document.getElementById(`noticePeriod-${applicantId}`).value;
  document.getElementById("currentctc").value = document.getElementById(`currentctc-${applicantId}`).value;
  document.getElementById("expectedctc").value = document.getElementById(`expectedctc-${applicantId}`).value;
  document.getElementById("band").value = document.getElementById(`band-${applicantId}`).value;
  document.getElementById("dateApplied").value = document.getElementById(`dateApplied-${applicantId}`).value;
  document.getElementById("positionTitle").value = document.getElementById(`positionTitle-${applicantId}`).value;
  document.getElementById("positionId").value = document.getElementById(`positionId-${applicantId}`).value;
  document.getElementById("interviewer").value = document.getElementById(`interviewer-${applicantId}`).value;
  document.getElementById("status").value = document.getElementById(`status-${applicantId}`).value;
  document.getElementById("stage").value = document.getElementById(`stage-${applicantId}`).value;
  document.getElementById("interviewDate").value = document.getElementById(`interviewDate-${applicantId}`).value;
  document.getElementById("dateOfOffer").value = document.getElementById(`dateOfOffer-${applicantId}`).value;
  document.getElementById("reasonNotExtending").value = document.getElementById(`reasonNotExtending-${applicantId}`).value;
  document.getElementById("notes").value = document.getElementById(`notes-${applicantId}`).value;
  modal.style.display = "block";

  closeButton.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  document.getElementById("saveButton").onclick = function() {
    const updatedCandidate = {
      profileOwner: document.getElementById("profileOwner").value || '',
      applicantName: document.getElementById("applicantName").value,
      interviewer: document.getElementById("interviewer").value,
      status: document.getElementById("status").value,
      stage: document.getElementById("stage").value,
      interviewDate: document.getElementById("interviewDate").value || null,
      dateOfOffer: document.getElementById("dateOfOffer").value || null,
      reasonNotExtending: document.getElementById("reasonNotExtending").value || null,
      notes: document.getElementById("notes").value || null,
      applicantPhone: document.getElementById("applicantPhone").value,
      applicantEmail: document.getElementById("applicantEmail").value,
      currentCompany: document.getElementById("currentCompany").value,
      candidateWorkLocation: document.getElementById("candidateWorkLocation").value,
      nativeLocation: document.getElementById("nativeLocation").value,
      qualification: document.getElementById("qualification").value,
      experience: document.getElementById("experience").value,
      skills: document.getElementById("skills").value,
      noticePeriod: document.getElementById("noticePeriod").value,
      currentctc: document.getElementById("currentctc").value,
      expectedctc: document.getElementById("expectedctc").value,
      band: document.getElementById("band").value,
      dateApplied: document.getElementById("dateApplied").value,
      positionTitle: document.getElementById("positionTitle").value,
      positionId: document.getElementById("positionId").value,
    };
  
    // Basic validation
    if (!updatedCandidate.profileOwner || !updatedCandidate.applicantName) {
      alert("Profile Owner and Applicant Name are required.");
      return;
    }
  
    fetch(`/candidates/${applicantId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedCandidate),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(errData => {
          throw new Error(errData.message || 'Failed to update candidate');
        });
      }
      return response.json();
    })
    .then(data => {
      alert(data.message);
      modal.style.display = "none"; // Close the modal on success
    })
    .catch(err => {
      console.error(err);
      alert("Failed to update candidate: " + err.message);
    });
  };
  
  };

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const searchInput = document.getElementById("searchInput");
  const stageFilter = document.getElementById("stageFilter");
  let allCandidates = []; // Store all candidates
  let filteredCandidates = []; // Store filtered candidates

  if (!token) {
    window.location.href = "/login.html";
  }

  fetch("/auth/verify", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((userData) => {
      localStorage.setItem("username", userData.username);
      localStorage.setItem("role", userData.role);

      const usernameElem = document.getElementById("username");
      const roleElem = document.getElementById("role");

      if (usernameElem && roleElem) {
        usernameElem.innerText = userData.username;
        roleElem.innerText = userData.role === "admin" ? "Admin" : "User";
      }

      fetch("/candidates?isgetAll=true", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const candidateList = document.getElementById("candidateList");
          const statusFilter = document.getElementById("statusFilter");
          const ownerFilter = document.getElementById("ownerFilter");
          allCandidates = data;
          filteredCandidates = data; // Initially, all candidates are filtered

          // Populate "Profile Owner" dropdown
          const profileOwners = [
            ...new Set(data.map((candidate) => candidate.profileOwner)),
          ];
          profileOwners.forEach((owner) => {
            const option = document.createElement("option");
            option.value = owner;
            option.textContent = owner;
            ownerFilter.appendChild(option);
          });

          // Populate "Stage" dropdown
          const stages = [...new Set(data.map((candidate) => candidate.stage))];
          stages.forEach((stage) => {
            const option = document.createElement("option");
            option.value = stage;
            option.textContent = stage;
            stageFilter.appendChild(option);
          });

          function renderCandidates(candidates) {
            candidateList.innerHTML = "";

            candidates.forEach((candidate) => {
              const row = document.createElement("tr");
              // <i class="fas fa-edit action-icon" style="color: blue; cursor: pointer;" onclick="updateCandidate(${candidate.applicantId})" title="Edit"></i>
              row.innerHTML = `
                <td class="sticky-col first-col">
                  <i class="fas fa-trash delete-icon" data-id="${candidate.applicantId}" style="color: red; cursor: pointer; margin-left: 10px;" title="Delete"></i>       
                </td>
                <td class="sticky-col second-col">${candidate.profileOwner}</td>
                <td class="sticky-col third-col">${candidate.applicantName}</td>
                <td>${candidate.applicantPhone}</td>
                <td>${candidate.applicantEmail}</td>
                <td>${candidate.currentCompany}</td>
                <td>${candidate.candidateWorkLocation}</td>
                <td>${candidate.nativeLocation}</td>
                <td>${candidate.qualification}</td>
                <td>${candidate.experience}</td>
                <td>${candidate.skills}</td>
                <td>${candidate.noticePeriod}</td>
                <td>${candidate.currentctc}</td>
                <td>${candidate.expectedctc}</td>
                <td>${candidate.band}</td>
                <td>${candidate.dateApplied}</td>
                <td>${candidate.positionTitle}</td>
                <td>${candidate.positionId}</td>
                <td>${candidate.status}</td>
                <td>${candidate.stage}</td>
                <td>${candidate.interviewer}</td>
                <td>${candidate.interviewDate || ""}</td>
                <td>${candidate.dateOfOffer || ""}</td>
                <td>${candidate.reasonNotExtending || ""}</td>
                <td>${candidate.notes || ""}</td>

            `;
              candidateList.appendChild(row);
            });
            attachActionEvents();
          }

          // Initial rendering
          renderCandidates(data);

          // Apply filters
          function applyFilters() {
            const selectedStatus = statusFilter.value;
            const selectedOwner = ownerFilter.value;
            const selectedStage = stageFilter.value;

            filteredCandidates = allCandidates.filter(
              (candidate) =>
                (selectedStatus === "all" || candidate.status === selectedStatus) &&
                (selectedOwner === "all" || candidate.profileOwner === selectedOwner) &&
                (selectedStage === "all" || candidate.stage === selectedStage)
            );

            renderCandidates(filteredCandidates);
          }

          statusFilter.addEventListener("change", applyFilters);
          ownerFilter.addEventListener("change", applyFilters);
          stageFilter.addEventListener("change", applyFilters);

          searchInput.addEventListener("input", () => {
            const searchTerm = searchInput.value.toLowerCase();
            filteredCandidates = allCandidates.filter(
              (candidate) =>
                candidate.applicantName.toLowerCase().includes(searchTerm) ||
                candidate.applicantEmail.toLowerCase().includes(searchTerm) ||
                candidate.applicantPhone.toLowerCase().includes(searchTerm)
            );
            renderCandidates(filteredCandidates);
          });
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to fetch candidates");
        });
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to verify user");
    });

    
    function attachActionEvents() {

  document.querySelectorAll(".delete-icon").forEach((icon) => {
    icon.addEventListener("click", () => {
      const id = icon.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this candidate?")) {
        deleteCandidate(id);
      }
    });
  });
}

    function deleteCandidate(id) {
      fetch(`/candidates/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          location.reload(); // Or re-fetch and re-render the table
        })
        .catch((err) => {
          console.error("Error deleting candidate:", err);
          alert("Failed to delete candidate.");
        });
    }



    function normalizeCandidateRow(row) {
  return {
    profileOwner: row["Profile Owner"] || "",
    applicantName: row["Applicant Name"] || "",
    applicantPhone: row["Phone"] || "",
    applicantEmail: row["Email"] || "",
    currentCompany: row["Current Company"] || "",
    candidateWorkLocation: row["Work Location"] || "",
    nativeLocation: row["Native Location"] || "",
    qualification: row["Qualification"] || "",
    experience: row["Experience"] || "",
    skills: row["Skills"] || "",
    noticePeriod: row["Notice Period"] || "",
    currentctc: row["Current CTC"] || "",
    expectedctc: row["Expected CTC"] || "",
    band: row["Band"] || "",
    dateApplied: (row["Date Applied"] || "").split("T")[0], // removes time
    positionTitle: row["Position Title"] || "",
    positionId: row["Position ID"] || "",
    status: row["Status"] || "",
    stage: row["Stage"] || "",
    interviewer: row["Interviewer"] || "",
    interviewDate: row["Interview Date"] || "",
    dateOfOffer: row["Date of Offer"] || "",
    reasonNotExtending: row["Reason Not Extending"] || "",
    notes: row["Notes"] || "",
  };
}


  // Import data from Excel
  document.getElementById("importButton").addEventListener("click", () => {
  document.getElementById("importModal").style.display = "block";
});

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("importModal").style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == document.getElementById("importModal")) {
    document.getElementById("importModal").style.display = "none";
  }
});

document.getElementById("confirmImport").addEventListener("click", () => {
  const fileInput = document.getElementById("importExcel");
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select an Excel file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    const normalizedData = jsonData.map(normalizeCandidateRow);

    fetch("/importCandidates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      body: JSON.stringify({ candidates: normalizedData }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        location.reload();
        document.getElementById("importModal").style.display = "none";
      })
      .catch((err) => {
        console.error("Error uploading:", err);
        alert("Failed to import data.");
      });
  };
  reader.readAsArrayBuffer(file);
});

  // Export filtered data to Excel
  document.getElementById("exportButton").addEventListener("click", function () {
    exportToExcel(filteredCandidates);
  });
});

// Function to export filtered candidates to Excel
function exportToExcel(filteredData) {
  const headers = [
    "Profile Owner", "Applicant Name", "Phone", "Email", "Current Company", "Work Location",
    "Native Location", "Qualification", "Experience", "Skills", "Notice Period",
    "Current CTC", "Expected CTC", "Band", "Date Applied", "Position Title", "Position ID",
    "Status", "Stage", "Interviewer", "Interview Date", "Date of Offer", "Reason Not Extending", "Notes"
  ];

  const rows = filteredData.map(candidate => [
    candidate.profileOwner, candidate.applicantName, candidate.applicantPhone,
    candidate.applicantEmail, candidate.currentCompany, candidate.candidateWorkLocation,
    candidate.nativeLocation, candidate.qualification, candidate.experience, candidate.skills,
    candidate.noticePeriod, candidate.currentctc, candidate.expectedctc, candidate.band,
    candidate.dateApplied, candidate.positionTitle, candidate.positionId, candidate.status,
    candidate.stage, candidate.interviewer, candidate.interviewDate || "",
    candidate.dateOfOffer || "", candidate.reasonNotExtending || "", candidate.notes || ""
  ]);

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  XLSX.utils.book_append_sheet(wb, ws, "Master_Candidates_Data");
  XLSX.writeFile(wb, "Master_Candidates_Data.xlsx");
}

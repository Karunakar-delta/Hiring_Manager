
USE ApplicantTracking;
CREATE TABLE IF NOT EXISTS ApplicantTracking (
    applicantId INT AUTO_INCREMENT PRIMARY KEY,
    profileOwner VARCHAR(255) NOT NULL,
    applicantName VARCHAR(255) NOT NULL,
    applicantPhone VARCHAR(20) NOT NULL,
    applicantEmail VARCHAR(255) NOT NULL,
    currentCompany VARCHAR(255) NOT NULL,
    candidateWorkLocation VARCHAR(255) NOT NULL,
    nativeLocation VARCHAR(255) NOT NULL,
    qualification VARCHAR(255) NOT NULL,
    experience VARCHAR(255) NOT NULL,
    skills VARCHAR(255) NOT NULL,
    noticePeriod VARCHAR(50) NOT NULL,
    currentctc float not null,
    expectedctc float not null,
    band VARCHAR(50) NOT NULL,
    applicantResume LONGBLOB NULL,
    dateApplied DATE NOT NULL,
    positionTitle VARCHAR(255) NOT NULL,
    positionId VARCHAR(50) NOT NULL,
    status ENUM('OPEN', 'CLOSED') NOT NULL,
    stage ENUM('App. Recd.', 'Not Answering', 'Joined', 'About To Join', 'Phone Screen', 'L1', 'L2_Internal','Yet to share','Shared with client', 'L1_Client','L2_Client','Exceeding Limit','Final Discussion', 'HOLD', 'Buffer List', 'Rejected','Declined'),
    interviewer VARCHAR(255),
    dateOfPhoneScreen DATE,
    interviewDate DATE,
    dateOfOffer DATE,
    reasonNotExtending ENUM('','Salary Negotiation', 'Relocation Issues'),
    notes TEXT
);


CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL,
    loggedInTime TIMESTAMP NULL,
    loggedOutTime TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS OpenPositions (
    positionId VARCHAR(255) PRIMARY KEY,
    positionTitle VARCHAR(255) NOT NULL,
    manager VARCHAR(255) NOT NULL,
    openPositions INT NOT NULL,
    experienceRequired VARCHAR(255),
    jobdescription  TEXT NOT NULL,
    status ENUM('active', 'closed', 'hold') NOT NULL,
    created_at DATETIME DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS AssignedApplicants (
    assignmentId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    applicantId INT NOT NULL,
    assignedBy INT NOT NULL,
    -- assignedOn DATE NOT NULL DEFAULT CURRENT_DATE,
    applicantName VARCHAR(255) NOT NULL,
    applicantEmail VARCHAR(255) NOT NULL,
    applicantPhone VARCHAR(20) NOT NULL,
    applicantResume LONGBLOB NULL,
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (applicantId) REFERENCES ApplicantTracking(applicantId),
    FOREIGN KEY (assignedBy) REFERENCES users(userId)
);


-- Insert into users
INSERT INTO users (username, password, role) VALUES
('recruiter1', 'recruiter123', 'user'),
('recruiter2', 'recruiter456', 'user');

-- Insert into OpenPositions
INSERT INTO OpenPositions (positionId, positionTitle, manager, openPositions, experienceRequired, jobdescription, status) VALUES
('POS101', 'Software Engineer', 'Alice', 3, '2-4 years', 'Responsible for building REST APIs', 'active'),
('POS102', 'UI/UX Designer', 'Bob', 2, '1-3 years', 'Design user interfaces and experiences', 'active'),
('POS103', 'DevOps Engineer', 'Charlie', 1, '3-5 years', 'Manage CI/CD pipelines and infrastructure', 'hold');

-- Insert into ApplicantTracking
INSERT INTO ApplicantTracking (
    profileOwner, applicantName, applicantPhone, applicantEmail, currentCompany,
    candidateWorkLocation, nativeLocation, qualification, experience, skills,
    noticePeriod, currentctc, expectedctc, band, applicantResume, dateApplied,
    positionTitle, positionId, status, stage, interviewer, dateOfPhoneScreen,
    interviewDate, dateOfOffer, reasonNotExtending, notes
) VALUES
('recruiter1', 'John Doe', '9876543210', 'john@example.com', 'TCS', 'Bangalore', 'Hyderabad',
 'B.Tech', '2 years', 'Java, Spring Boot', '30 days', 4.5, 6.0, 'B2', NULL, CURDATE(),
 'Software Engineer', 'POS101', 'OPEN', 'App. Recd.', 'Alice', CURDATE(), NULL, NULL, '', 'Strong backend profile'),
('recruiter2', 'Jane Smith', '9123456780', 'jane@example.com', 'Infosys', 'Chennai', 'Delhi',
 'MCA', '3 years', 'React, Node.js', '15 days', 5.0, 7.0, 'B3', NULL, CURDATE(),
 'UI/UX Designer', 'POS102', 'OPEN', 'Phone Screen', 'Bob', CURDATE(), NULL, NULL, '', 'Good design skills');

-- Insert into AssignedApplicants
INSERT INTO AssignedApplicants (
    userId, applicantId, assignedBy, applicantName, applicantEmail, applicantPhone, applicantResume
) VALUES
(2, 1, 1, 'John Doe', 'john@example.com', '9876543210', NULL),
(3, 2, 1, 'Jane Smith', 'jane@example.com', '9123456780', NULL);

// src/ResumeTemplate.js
import React from 'react';

const ResumeTemplate = ({ resume }) => {
  return (
    <div className="resume-template">
      <h1>{resume.name}</h1>
      <p>{resume.email}</p>
      <p>{resume.phone}</p>
      <p>{resume.address}</p>
      <h2>Summary</h2>
      <p>{resume.summary}</p>

      <h2>Education</h2>
      {resume.education.map((edu, index) => (
        <div key={index}>
          <h3>{edu.school}</h3>
          <p>{edu.degree}</p>
          <p>{edu.startYear} - {edu.endYear}</p>
        </div>
      ))}

      <h2>Experience</h2>
      {resume.experience.map((exp, index) => (
        <div key={index}>
          <h3>{exp.company}</h3>
          <p>{exp.position}</p>
          <p>{exp.startYear} - {exp.endYear}</p>
          <p>{exp.description}</p>
        </div>
      ))}

      <h2>Skills</h2>
      <ul>
        {resume.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h2>Projects</h2>
      {resume.projects.map((project, index) => (
        <div key={index}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      ))}

      <h2>Academic Achievements</h2>
      <ul>
        {resume.achievements.map((achievement, index) => (
          <li key={index}>{achievement}</li>
        ))}
      </ul>

      <h2>Positions of Responsibility</h2>
      {resume.positions.map((position, index) => (
        <div key={index}>
          <h3>{position.position}</h3>
          <p>{position.organization}</p>
          <p>{position.startYear} - {position.endYear}</p>
        </div>
      ))}

      <h2>Extracurricular Activities</h2>
      <ul>
        {resume.extracurriculars.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeTemplate;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResumeForm.css';
import defaultImg from './img.jpg';

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    designation: '',
    email: '',
    phone: '',
    location: '',
    education: [{ degree: '', institution: '', duration: '' }],
    skills: [''],
    summary: '',
    workExperience: [{ title: '', company: '', duration: '', description: '' }],
    projects: [{ title: '', description: '' }],
    achievements: [''],
    responsibilities: [''],
    extracurriculars: [''],
    references: [''],
    profilePic: defaultImg,
  });

  const [visibleSections] = useState({
    workExperience: true,
    responsibilities: true,
    extracurriculars: true,
    references: true,
  });

  const navigate = useNavigate();

  const handleChange = (e, section, index) => {
    const { name, value } = e.target;
    const newFormData = { ...formData };

    if (section === 'contactDetails') {
      newFormData[name] = value;
    } else if (['education', 'workExperience', 'projects'].includes(section)) {
      newFormData[section][index][name] = value;
    } else {
      newFormData[section][index] = value;
    }

    setFormData(newFormData);
  };

  const handleAddField = (section) => {
    const newFormData = { ...formData };
    const newField = ['education', 'workExperience', 'projects'].includes(section)
      ? { title: '', company: '', duration: '', description: '' }
      : '';
    if (section === 'education') {
      newFormData[section].push({ degree: '', institution: '', duration: '' });
    } else if (section === 'skills' || section === 'achievements' || section === 'responsibilities' || section === 'extracurriculars' || section === 'references') {
      newFormData[section].push('');
    } else {
      newFormData[section].push(newField);
    }
    setFormData(newFormData);
  };

  const handleRemoveField = (section, index) => {
    const newFormData = { ...formData };
    newFormData[section].splice(index, 1);
    setFormData(newFormData);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredSections = ['name', 'designation', 'email', 'phone', 'location', 'summary'];
    for (let section of requiredSections) {
      if (!formData[section]) {
        alert('Please fill in all required fields.');
        return;
      }
    }
    navigate('/resume', { state: { formData } });
  };

  return (
    <div className="resume-form-container">
      <form onSubmit={handleSubmit} className="resume-form">
        <div className="left-section">
          <div className='pic'>
            <div className="profile-pic">
              <img src={formData.profilePic} alt="Profile" />
            </div>
            <div>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} />
            </div>
          </div>
          
          <div className="name">
            <input
              type="text" 
              name="name" 
              placeholder="Name" 
              className='name-box'
              value={formData.name} 
              onChange={(e) => handleChange(e, 'contactDetails')} 
              required 
            />
            <input
              type="text" 
              name="designation" 
              placeholder="Designation" 
              className='designation'
              value={formData.designation} 
              onChange={(e) => handleChange(e, 'contactDetails')} 
              required 
            />
          </div>
          
          <div className="section-content">
            <input 
              type="text" 
              name="email" 
              placeholder="Email" 
              value={formData.email} 
              onChange={(e) => handleChange(e, 'contactDetails')} 
              required 
            />
            <input 
              type="text" 
              name="phone" 
              placeholder="Phone" 
              value={formData.phone} 
              onChange={(e) => handleChange(e, 'contactDetails')} 
              required 
            />
            <input 
              type="text" 
              name="location" 
              placeholder="Location" 
              value={formData.location} 
              onChange={(e) => handleChange(e, 'contactDetails')} 
              required 
            />
          </div>

          <div className="section">
            <div className="section-title">Education</div>
            <div className="section-content">
              {formData.education.map((edu, index) => (
                <div key={index} className="education">
                  <input 
                    type="text" 
                    name="degree" 
                    placeholder="Degree" 
                    value={edu.degree} 
                    onChange={(e) => handleChange(e, 'education', index)} 
                    required 
                  />
                  <input 
                    type="text" 
                    name="duration" 
                    placeholder="Duration" 
                    value={edu.duration} 
                    onChange={(e) => handleChange(e, 'education', index)} 
                    required 
                  />
                  <div className="duration-box">
                    <input 
                      type="text" 
                      name="institution" 
                      placeholder="Institution" 
                      value={edu.institution} 
                      onChange={(e) => handleChange(e, 'education', index)} 
                      required 
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveField('education', index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => handleAddField('education')}
              >
                Add Education
              </button>
            </div>
          </div>

          <div className="section">
            <div className="section-title">Skills</div>
            <div className="section-content">
              {formData.skills.map((skill, index) => (
                <div key={index} className="skills">
                  <input 
                    type="text" 
                    placeholder="Skill" 
                    value={skill} 
                    onChange={(e) => handleChange(e, 'skills', index)} 
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => handleRemoveField('skills', index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => handleAddField('skills')}
              >
                Add Skill
              </button>
            </div>
          </div>

          <div className="section">
            <div className="section-title">Achievements</div>
            <div className="section-content">
              {formData.achievements.map((achievement, index) => (
                <div key={index} className="achievements">
                  <input 
                    type="text" 
                    placeholder="Achievement" 
                    value={achievement} 
                    onChange={(e) => handleChange(e, 'achievements', index)} 
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => handleRemoveField('achievements', index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => handleAddField('achievements')}
              >
                Add Achievement
              </button>
            </div>
          </div>
        </div>

        <div className="right-section">
          <div className="section">
            <div className="section-title">Summary</div>
            <div className="section-content">
              <textarea 
                name="summary" 
                placeholder="Summary" 
                value={formData.summary} 
                onChange={(e) => handleChange(e, 'contactDetails')} 
                required 
              />
            </div>
          </div>

          <div className="section">
            <div className="section-title">Projects</div>
            <div className="section-content">
              {formData.projects.map((project, index) => (
                <div key={index} className="projects">
                  <input 
                    type="text" 
                    name="title" 
                    placeholder="Project Title" 
                    value={project.title} 
                    onChange={(e) => handleChange(e, 'projects', index)} 
                    required 
                  />
                  <textarea 
                    name="description" 
                    placeholder="Project Description" 
                    value={project.description} 
                    onChange={(e) => handleChange(e, 'projects', index)} 
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => handleRemoveField('projects', index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => handleAddField('projects')}
              >
                Add Project
              </button>
            </div>
          </div>

          {visibleSections.workExperience && (
            <div className="section">
              <div className="section-title">Work Experience</div>
              <div className="section-content">
                {formData.workExperience.map((exp, index) => (
                  <div key={index} className="work-experience">
                    <input 
                      type="text" 
                      name="title" 
                      placeholder="Title" 
                      value={exp.title} 
                      onChange={(e) => handleChange(e, 'workExperience', index)} 
                      required 
                    />
                    <input 
                      type="text" 
                      name="company" 
                      placeholder="Company" 
                      value={exp.company} 
                      onChange={(e) => handleChange(e, 'workExperience', index)} 
                      required 
                    />
                    <input 
                      type="text" 
                      name="duration" 
                      placeholder="Duration" 
                      value={exp.duration} 
                      onChange={(e) => handleChange(e, 'workExperience', index)} 
                      required 
                    />
                    <textarea 
                      name="description" 
                      placeholder="Description" 
                      value={exp.description} 
                      onChange={(e) => handleChange(e, 'workExperience', index)} 
                      required 
                    />
                    <button 
                      type="button" 
                      onClick={() => handleRemoveField('workExperience', index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => handleAddField('workExperience')}
                >
                  Add Work Experience
                </button>
              </div>
            </div>
          )}

          <div className="section">
            <div className="section-title">Responsibilities</div>
            <div className="section-content">
              {formData.responsibilities.map((responsibility, index) => (
                <div key={index} className="responsibilities">
                  <input 
                    type="text" 
                    placeholder="Responsibility" 
                    value={responsibility} 
                    onChange={(e) => handleChange(e, 'responsibilities', index)} 
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => handleRemoveField('responsibilities', index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => handleAddField('responsibilities')}
              >
                Add Responsibility
              </button>
            </div>
          </div>

          <div className="section">
            <div className="section-title">Extracurriculars</div>
            <div className="section-content">
              {formData.extracurriculars.map((extracurricular, index) => (
                <div key={index} className="extracurriculars">
                  <input 
                    type="text" 
                    placeholder="Extracurricular Activity" 
                    value={extracurricular} 
                    onChange={(e) => handleChange(e, 'extracurriculars', index)} 
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => handleRemoveField('extracurriculars', index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => handleAddField('extracurriculars')}
              >
                Add Extracurricular Activity
              </button>
            </div>
          </div>

          <div className="section">
            <div className="section-title">References</div>
            <div className="section-content">
              {formData.references.map((reference, index) => (
                <div key={index} className="references">
                  <input 
                    type="text" 
                    placeholder="Reference" 
                    value={reference} 
                    onChange={(e) => handleChange(e, 'references', index)} 
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => handleRemoveField('references', index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => handleAddField('references')}
              >
                Add Reference
              </button>
            </div>
          </div>

          <div className="submit-button">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;

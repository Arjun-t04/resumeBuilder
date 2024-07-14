// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './fireBase';
import ResumeForm from './ResumeForm';
import ResumeTemplate from './ResumeTemplate';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);

  const fetchResumes = async () => {
    try {
      const q = query(collection(db, 'resumes'), where('email', '==', currentUser.email));
      const querySnapshot = await getDocs(q);
      const resumeList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setResumes(resumeList);
    } catch (error) {
      console.error('Error fetching resumes: ', error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [currentUser]);

  const handleSave = () => {
    setSelectedResume(null);
    fetchResumes();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => setSelectedResume({})}>Create New Resume</button>
      <button onClick={logout}>Logout</button>
      {resumes.map(resume => (
        <div key={resume.id}>
          <h2>{resume.name}</h2>
          <button onClick={() => setSelectedResume(resume)}>Edit</button>
        </div>
      ))}
      {selectedResume ? (
        <ResumeForm resume={selectedResume} onSave={handleSave} />
      ) : (
        resumes.length > 0 && <ResumeTemplate resume={resumes[0]} />
      )}
    </div>
  );
};

export default Dashboard;

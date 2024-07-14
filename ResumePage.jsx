import React from 'react';
import { useLocation } from 'react-router-dom';
import { PDFViewer } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import './PDFDocument.css'; // Import the CSS file

const ResumePage = () => {
  const location = useLocation();
  const { formData } = location.state;

  return (
    <div className="resume-page">
      <PDFViewer className="pdf-viewer">
        <PDFDocument formData={formData} />
      </PDFViewer>
    </div>
  );
};

export default ResumePage;

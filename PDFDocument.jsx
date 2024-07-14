import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Helvetica',
  },
  leftSection: {
    width: '35%',
    paddingRight: 10,
    paddingLeft: 20,
    backgroundColor: '#f4e1d2',
    paddingTop: 20,
    paddingBottom: 20,
  },
  rightSection: {
    width: '65%',
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  designation: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 4,
  },
  text: {
    fontSize: 12,
    marginBottom: 4,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 50,
  },
});

const PDFDocument = ({ formData }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.leftSection}>
        <Image style={styles.image} src={formData.profilePic} />
        <Text style={styles.name}>{formData.name}</Text>
        <Text style={styles.designation}>{formData.designation}</Text>
        <Text style={styles.text}>{formData.email}</Text>
        <Text style={styles.text}>{formData.phone}</Text>
        <Text style={styles.text}>{formData.location}</Text>

        {formData.education.length > 0 && (
          <>
            <Text style={styles.title}>Education</Text>
            {formData.education.map((edu, index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.text}>{edu.degree} - {edu.institution}</Text>
                <Text style={styles.text}>{edu.duration}</Text>
              </View>
            ))}
          </>
        )}

        {formData.skills.length > 0 && (
          <>
            <Text style={styles.title}>Skills</Text>
            {formData.skills.map((skill, index) => (
              <Text key={index} style={styles.text}>{skill}</Text>
            ))}
          </>
        )}

        {formData.achievements.length > 0 && (
          <>
            <Text style={styles.title}>Achievements</Text>
            {formData.achievements.map((achievement, index) => (
              <Text key={index} style={styles.text}>{achievement}</Text>
            ))}
          </>
        )}
      </View>

      <View style={styles.rightSection}>
        {formData.summary && (
          <>
            <Text style={styles.title}>Summary</Text>
            <Text style={styles.text}>{formData.summary}</Text>
          </>
        )}

        {formData.projects.length > 0 && (
          <>
            <Text style={styles.title}>Projects</Text>
            {formData.projects.map((project, index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.text}>{project.title}</Text>
                <Text style={styles.text}>{project.description}</Text>
              </View>
            ))}
          </>
        )}

        {formData.workExperience.length > 0 && (
          <>
            <Text style={styles.title}>Work Experience</Text>
            {formData.workExperience.map((exp, index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.text}>{exp.title} - {exp.company}</Text>
                <Text style={styles.text}>{exp.duration}</Text>
                <Text style={styles.text}>{exp.description}</Text>
              </View>
            ))}
          </>
        )}

        {formData.responsibilities.length > 0 && (
          <>
            <Text style={styles.title}>Responsibilities</Text>
            {formData.responsibilities.map((responsibility, index) => (
              <Text key={index} style={styles.text}>{responsibility}</Text>
            ))}
          </>
        )}

        {formData.extracurriculars.length > 0 && (
          <>
            <Text style={styles.title}>Extracurriculars</Text>
            {formData.extracurriculars.map((activity, index) => (
              <Text key={index} style={styles.text}>{activity}</Text>
            ))}
          </>
        )}

        {formData.references.length > 0 && (
          <>
            <Text style={styles.title}>References</Text>
            {formData.references.map((reference, index) => (
              <Text key={index} style={styles.text}>{reference}</Text>
            ))}
          </>
        )}
      </View>
    </Page>
  </Document>
);

export default PDFDocument;

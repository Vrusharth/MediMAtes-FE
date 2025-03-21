import { ScrollView, StyleSheet, Text, View, Linking } from 'react-native';
import React, { useState } from 'react';
import Status from '../../../../components/Status';
import Header from '../../../../components/Header';
import { colorTheme, common_styles } from '../../../../constant';
import NormalTextInputWithIcon from '../../../../components/Inputs/NormalTextInputWithIcon';
import BigButton from '../../../../components/Buttons/BigButton';
import DocumentPicker from 'react-native-document-picker';
import { validateEmtyInput } from '../../../../utils/validateRegex';
import IconButton from '../../../../components/Buttons/IconButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { usePatientHealthReport } from '../../../../Hooks/auth';

export default function PatientHealthReport() {
    const [formValues, setFormValues] = useState([
        {
            title: "",
            description: "",
            files: null
        }
    ]);

    const { mutate, isPending, isError, error } = usePatientHealthReport();

    function handleSubmit(index) {
        if (formValues.length < index) {
            return;
        }
        
        const formData = new FormData();

        formData.append('title', formValues[index].title);
        formData.append('description', formValues[index].description);
        // Append profile picture with proper file structure
        if (formValues[index].files) {
            formData.append('files', {
                uri: formValues[index].files.uri,
                name: formValues[index].files.name || 'report.pdf', // Fallback name
                type: formValues[index].files.type || 'application/pdf', // Fallback type
            });
        } else {
            console.error('Report is required!');
            return; // Stop submission if profile picture is missing
        }
        mutate({ form: formData });
    }

    // Function to handle adding a new report
    const addReport = () => {
        setFormValues(prevValues => [
            ...prevValues,
            { title: "", description: "", files: null }
        ]);
    };

    // Function to handle removing a report
    const removeReport = (index) => {
        setFormValues(prevValues => prevValues.filter((_, i) => i !== index));
    };

    // Function to handle updating a report field
    const updateReport = (index, field, value) => {
        setFormValues(prevValues => {
            const updatedReports = [...prevValues];
            updatedReports[index][field] = value;
            return updatedReports;
        });
    };

    // Function to handle file selection for a specific report
    const pickDocument = async (index) => {
        try {
            const result = await DocumentPicker.pickSingle();
            updateReport(index, 'files', result);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("User cancelled file picker");
            } else {
                console.error("Error picking file:", err);
            }
        }
    };

    // Function to validate a single report
    function isReportValid(report) {
        const isTitleValid = report.title.trim() !== "";
        const isDescriptionValid = report.description.trim() !== "";
        const isFileValid = report.files !== null;

        return isTitleValid && isDescriptionValid && isFileValid;
    }

    // Function to handle redirecting to view a PDF
    const handleRedirect = (fileUri) => {
        if (fileUri) {
            Linking.openURL("https://www.newcastle.edu.au/__data/assets/pdf_file/0008/333773/LD-Report-Writing-LH.pdf");
        }
    };

    return (
        <View style={styles.container}>
            <Status />
            <Header />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.subContainer, { paddingBlock: 10 }]}>
                <Text style={[common_styles.extra_large_text_large_weight, { fontSize: 25, marginBottom: 10 }]}>User's Medical Reports</Text>

                {formValues.map((report, index) => (
                    <View key={index} style={{}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text key={index} style={[common_styles.medium_text_normal_weight, { marginBottom: 3 }]}>Report {index + 1}</Text>
                            {/* Remove Report Button */}
                            {formValues.length > 1 && (
                                <IconButton
                                    IconCategory={MaterialCommunityIcons}
                                    iconName={"delete"}
                                    color={colorTheme.primaryColor}
                                    size={20}
                                    onPress={() => removeReport(index)}
                                    style={{ alignSelf: 'flex-end', marginTop: 5 }}
                                />
                            )}
                        </View>
                        {/* Report Title */}
                        <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3 }]}>Report Title</Text>
                        <NormalTextInputWithIcon
                            placeholder="Title"
                            value={report.title}
                            onChangeFunc={(text) => updateReport(index, 'title', text)}
                            style={{ marginBlock: 5 }}
                        />

                        {/* Report Description */}
                        <Text style={[common_styles.medium_text_normal_weight, { marginBottom: 3 }]}>Report Description</Text>
                        <NormalTextInputWithIcon
                            placeholder="Description"
                            value={report.description}
                            onChangeFunc={(text) => updateReport(index, 'description', text)}
                            style={{ marginBlock: 5 }}
                        />

                        {/* File Selection */}
                        {report.files && (
                            <Text
                                onPress={() => handleRedirect(report.files.uri)}
                                style={[common_styles.medium_text_normal_weight, { color: colorTheme.primaryColor, marginBottom: 5 }]}
                            >
                                {report.files.name}
                            </Text>
                        )}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBlock: 10 }}>
                            <BigButton
                                label={"Select Report"}
                                onPress={() => pickDocument(index)}
                                labelStyle={{ color: colorTheme.primaryColor }}
                                style={{ borderWidth: 1, borderColor: colorTheme.primaryColor, width: '45%' }}
                            />
                            <BigButton
                                onPress={() => handleSubmit(index)}
                                label={"Upload Report"}
                                labelStyle={{ color: "white" }}
                                disabled={!isReportValid(report)}
                                isPending={isPending}
                                style={{ backgroundColor: colorTheme.primaryColor, width: '45%' }}
                            />
                        </View>
                    </View>
                ))}

                {/* Add Report Button */}
                <BigButton
                    label={"Add Report"}
                    IconCategory={MaterialCommunityIcons}
                    iconName={"plus"}
                    iconColor={colorTheme.primaryColor}
                    iconSize={25}
                    labelStyle={{ color: colorTheme.primaryColor }}
                    onPress={addReport}
                    style={{ borderWidth: 1, borderColor: colorTheme.primaryColor, }}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBlock: 5,
        backgroundColor: colorTheme.lightappBackGroundColor,
    },
    subContainer: {
        width: '90%',
        alignSelf: 'center',
    },
});
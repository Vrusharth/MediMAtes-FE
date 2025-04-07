import { useMutation } from "@tanstack/react-query";
import { create_doctor, create_user, doctor_account_settings, doctor_additional_info, login, patient_additional_info, patient_health_report, patient_medical_history, verify_doctor_otp, verify_user_otp } from "../services/auth";
import { useUser } from "../Context/UserContext";
import { getItem, setItem } from "../utils/asyncstorage";
import { navigate } from "../utils/navRef";

export const useSignUp = (navigateTo, propsToScreen, isDoctor) => {
    return useMutation({
        mutationFn: ({ email, password }) => {
            return isDoctor ? create_doctor(email, password) : create_user(email, password)
        },
        onSuccess: async (res) => {
            if (!propsToScreen) {
                navigate(navigateTo);  // Pass only navigateTo if propsToNavigation is not provided
            } else {
                navigate(navigateTo, propsToScreen);
            }
        }
    })
}


export const useLogin = () => {
    const { setUser } = useUser();
    return useMutation({
        mutationFn: ({ email, password }) => {
            return login(email, password)
        },
        onSuccess: async (res) => {
            const token = res.data.jwtData;
            const role = res.data.role;
            setUser(token);
            await setItem("user", token);
            await setItem("role", role);
            
            navigate("Success", { role: role })
        },
    })
}

export const useVerifyOtp = (isDoctor) => {
    const { setUser } = useUser();
    return useMutation({
        mutationFn: ({ email, password, otp }) => {
            return isDoctor ? verify_doctor_otp(email, password, otp) : verify_user_otp(email, password, otp)
        },
        onSuccess: async (res) => {
            setUser(res.data.jwtdata);
            await setItem("user", res.data.jwtdata);
            await setItem("role", res.data.role);
            res.data.role === 'patient' ? navigate('CompletePatientProfile') : navigate('CompleteDoctorProfile');
        },
        onError: async (err) => {
            console.log("Error: ", err.response.data);
        }
    })
}

export const useDoctorAdditionalInfo = () => {
    return useMutation({
        mutationFn: async ({ form }) => {
            const token = await getItem("user");
            return doctor_additional_info(form, token);
        },
        onSuccess: async (res) => {
            navigate("DoctorAccountSetting")
        },
        onError: async (err) => {
            console.log("Error: ", err.response.data);
        }
    })
}

export const useDoctorAccountSettings = () => {
    return useMutation({
        mutationFn: async ({ body }) => {
            const token = await getItem("user");
            return doctor_account_settings(body, token);
        },
        onSuccess: async (res) => {
            const role = await getItem("role");
            navigate("Success", { role: role })
        },
        onError: async (err) => {
            console.log("Error: ", err.response.data);
        }
    })
}

export const usePatientAdditionalInfo = () => {
    return useMutation({
        mutationFn: async ({ form }) => {
            const token = await getItem("user");

            return patient_additional_info(form, token);
        },
        onSuccess: async (res) => {
            navigate("PatientPastMedicalHistory")
        },
        onError: async (err) => {
            console.log("Error: ", err.response.data);
        }
    })
}

export const usePatientMedicalHistory = () => {
    return useMutation({
        mutationFn: async ({ body }) => {
            const token = await getItem("user");
            return patient_medical_history(body, token);
        },
        onSuccess: async (res) => {
            navigate("PatientHealthReport")
        },
        onError: async (err) => {
            console.log("Error: ", err.response.data);
        }
    })
}

export const usePatientHealthReport = () => {
    return useMutation({
        mutationFn: async ({ form }) => {
            const token = await getItem("user");
            return patient_health_report(form, token);
        },
        onSuccess: async (res) => {
            const role = await getItem("role");
            navigate("Success", { role: role })
        },
        onError: async (err) => {
            console.log("Error: ", err.response.data);
        }
    })
}
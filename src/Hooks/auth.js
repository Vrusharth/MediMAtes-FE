import { useMutation } from "@tanstack/react-query";
import { create_doctor, create_user, login, verify_doctor_otp, verify_user_otp } from "../services/auth";
import { useUser } from "../Context/UserContext";
import { setItem } from "../utils/asyncstorage";
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
            setUser(res.data.jwtdata);
            await setItem("user", res.data.jwtdata);
            navigate('Success');
        },
    })
}

export const useVerifyOtp = (isDoctor ) => {
    const { setUser } = useUser();
    return useMutation({
        mutationFn: ({ email, password, otp }) => {
            return isDoctor ? verify_doctor_otp(email, password, otp) : verify_user_otp(email, password, otp)
        },
        onSuccess: async (res) => {
            setUser(res.data.jwtdata);
            await setItem("user", res.data.jwtdata);
            navigate('Success');
        }
    })
}